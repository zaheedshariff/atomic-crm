/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-namespace */
import type { AuthProvider } from "ra-core";
import { supabaseAuthProvider } from "ra-supabase-core";
import { canAccess } from "../commons/canAccess";
import { supabase } from "./supabase";
import { ensureSalesRecordForOAuthUser } from "./oauthUserHandler";

const baseAuthProvider = supabaseAuthProvider(supabase, {
  getIdentity: async () => {
    const sale = await getSaleFromCache();

    if (sale == null) {
      throw new Error();
    }

    return {
      id: sale.id,
      fullName: `${sale.first_name} ${sale.last_name}`,
      avatar: sale.avatar?.src,
    };
  },
});

export async function getIsInitialized() {
  if (getIsInitialized._is_initialized_cache == null) {
    const { data } = await supabase.from("init_state").select("is_initialized");

    getIsInitialized._is_initialized_cache = data?.at(0)?.is_initialized > 0;
  }

  return getIsInitialized._is_initialized_cache;
}

export namespace getIsInitialized {
  export var _is_initialized_cache: boolean | null = null;
}

export const authProvider: AuthProvider = {
  ...baseAuthProvider,
  login: async (params) => {
    const result = await baseAuthProvider.login(params);
    // clear cached sale
    cachedSale = undefined;
    return result;
  },
  checkAuth: async (params) => {
    // Users are on the set-password page, nothing to do
    if (
      window.location.pathname === "/set-password" ||
      window.location.hash.includes("#/set-password")
    ) {
      return;
    }
    // Users are on the forgot-password page, nothing to do
    if (
      window.location.pathname === "/forgot-password" ||
      window.location.hash.includes("#/forgot-password")
    ) {
      return;
    }
    // Users are on the sign-up page, nothing to do
    if (
      window.location.pathname === "/sign-up" ||
      window.location.hash.includes("#/sign-up")
    ) {
      return;
    }

    // Get current user session
    const { data: session } = await supabase.auth.getSession();
    
    // For authenticated users, ensure they have a sales record (handles OAuth users)
    // This must run BEFORE initialization check to allow first OAuth user through
    if (session?.session?.user) {
      const wasFirstUser = await ensureSalesRecordForOAuthUser(session.session.user);
      
      if (wasFirstUser) {
        // First user created via OAuth - update cache and proceed
        getIsInitialized._is_initialized_cache = true;
        return baseAuthProvider.checkAuth(params);
      }
    }

    const isInitialized = await getIsInitialized();

    if (!isInitialized) {
      await supabase.auth.signOut();
      throw {
        redirectTo: "/sign-up",
        message: false,
      };
    }

    return baseAuthProvider.checkAuth(params);
  },
  canAccess: async (params) => {
    const isInitialized = await getIsInitialized();
    if (!isInitialized) return false;

    // Get the current user
    const sale = await getSaleFromCache();
    if (sale == null) return false;

    // Compute access rights from the sale role
    const role = sale.administrator ? "admin" : "user";
    return canAccess(role, params);
  },
};

let cachedSale: any;
const getSaleFromCache = async () => {
  if (cachedSale != null) return cachedSale;

  const { data: dataSession, error: errorSession } =
    await supabase.auth.getSession();

  // Shouldn't happen after login but just in case
  if (dataSession?.session?.user == null || errorSession) {
    return undefined;
  }

  const { data: dataSale, error: errorSale } = await supabase
    .from("sales")
    .select("id, first_name, last_name, avatar, administrator")
    .match({ user_id: dataSession?.session?.user.id })
    .single();

  // If no sales record exists, this might be an OAuth user - create one
  if (dataSale == null || errorSale) {
    try {
      await ensureSalesRecordForOAuthUser(dataSession.session.user);
      
      // Try fetching the sales record again
      const { data: newSale } = await supabase
        .from("sales")
        .select("id, first_name, last_name, avatar, administrator")
        .match({ user_id: dataSession.session.user.id })
        .single();
      
      if (newSale) {
        cachedSale = newSale;
        return newSale;
      }
    } catch (error) {
      console.error("Failed to ensure sales record for user:", error);
    }
    
    return undefined;
  }

  cachedSale = dataSale;
  return dataSale;
};
