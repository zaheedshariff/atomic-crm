-- Function to check if any sales records exist (bypasses RLS for OAuth first-user detection)
CREATE OR REPLACE FUNCTION public.check_has_sales()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER  -- Runs with definer privileges, bypassing RLS
AS $$
DECLARE
  sales_count integer;
BEGIN
  SELECT COUNT(*) INTO sales_count FROM public.sales;
  RETURN sales_count > 0;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_has_sales() TO authenticated;
