import { Card, CardContent } from "@/components/ui/card";
import { CreateBase, Form, useGetIdentity } from "ra-core";
import { FormToolbar } from "@/components/admin";
import type { Equipment } from "../types";
import { EquipmentInputs } from "./EquipmentInputs";

export const EquipmentCreate = () => {
  const { identity } = useGetIdentity();

  return (
    <CreateBase
      redirect="list"
      transform={(data: Equipment) => ({
        ...data,
        sales_id: identity?.id,
        status: data.status || "available",
        quantity: data.quantity || 1,
        listing_type: data.listing_type || "Regular",
        featured: false,
      })}
    >
      <div className="mt-2 flex lg:mr-72">
        <div className="flex-1">
          <Form>
            <Card>
              <CardContent>
                <EquipmentInputs />
                <FormToolbar />
              </CardContent>
            </Card>
          </Form>
        </div>
      </div>
    </CreateBase>
  );
};
