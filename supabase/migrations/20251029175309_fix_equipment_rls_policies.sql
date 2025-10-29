-- Drop the overly permissive equipment_contacts policy
drop policy if exists "Sales reps can manage equipment contacts" on "public"."equipment_contacts";

-- Drop the equipment update policy without WITH CHECK
drop policy if exists "Sales reps can update own equipment" on "public"."equipment";

-- Create separate, properly scoped policies for equipment_contacts

-- SELECT: Anyone authenticated can view equipment-contact relationships
-- (already exists as "Equipment contacts visible to authenticated users")

-- INSERT: Only reps who own/manage the equipment can create relationships
create policy "Sales reps can link contacts to their equipment"
    on "public"."equipment_contacts" for insert
    to authenticated
    with check (
        exists (
            select 1 from equipment e
            join sales s on (s.id = e.sales_id or s.id = e.default_sales_rep_id or s.administrator = true)
            where e.id = equipment_id
            and s.user_id = auth.uid()
            and s.disabled = false
        )
    );

-- UPDATE: Only reps who own/manage the equipment can update relationships
create policy "Sales reps can update their equipment contacts"
    on "public"."equipment_contacts" for update
    to authenticated
    using (
        exists (
            select 1 from equipment e
            join sales s on (s.id = e.sales_id or s.id = e.default_sales_rep_id or s.administrator = true)
            where e.id = equipment_id
            and s.user_id = auth.uid()
            and s.disabled = false
        )
    )
    with check (
        exists (
            select 1 from equipment e
            join sales s on (s.id = e.sales_id or s.id = e.default_sales_rep_id or s.administrator = true)
            where e.id = equipment_id
            and s.user_id = auth.uid()
            and s.disabled = false
        )
    );

-- DELETE: Only reps who own/manage the equipment can delete relationships
create policy "Sales reps can delete their equipment contacts"
    on "public"."equipment_contacts" for delete
    to authenticated
    using (
        exists (
            select 1 from equipment e
            join sales s on (s.id = e.sales_id or s.id = e.default_sales_rep_id or s.administrator = true)
            where e.id = equipment_id
            and s.user_id = auth.uid()
            and s.disabled = false
        )
    );

-- Fix equipment update policy with WITH CHECK clause
create policy "Sales reps can update own equipment"
    on "public"."equipment" for update
    to authenticated
    using (
        exists (
            select 1 from sales 
            where sales.user_id = auth.uid()
            and (
                sales.id = equipment.sales_id 
                or sales.id = equipment.default_sales_rep_id
                or sales.administrator = true
            )
        )
    )
    with check (
        exists (
            select 1 from sales 
            where sales.user_id = auth.uid()
            and (
                sales.id = equipment.sales_id 
                or sales.id = equipment.default_sales_rep_id
                or sales.administrator = true
            )
        )
    );
