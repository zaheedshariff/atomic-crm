-- Drop existing policies to recreate with tighter constraints
drop policy if exists "Sales reps can update own equipment" on "public"."equipment";
drop policy if exists "Sales reps can link contacts to their equipment" on "public"."equipment_contacts";
drop policy if exists "Sales reps can update their equipment contacts" on "public"."equipment_contacts";
drop policy if exists "Sales reps can delete their equipment contacts" on "public"."equipment_contacts";

-- Equipment UPDATE policy: prevent non-admins from clearing ownership
create policy "Sales reps can update own equipment"
    on "public"."equipment" for update
    to authenticated
    using (
        exists (
            select 1 from sales 
            where sales.user_id = auth.uid()
            and sales.disabled = false
            and (
                sales.administrator = true
                or sales.id = equipment.sales_id 
                or sales.id = equipment.default_sales_rep_id
            )
        )
    )
    with check (
        exists (
            select 1 from sales 
            where sales.user_id = auth.uid()
            and sales.disabled = false
            and (
                -- Admins can do anything
                sales.administrator = true
                -- Non-admins must keep ownership assigned (cannot null it out)
                or (
                    (sales.id = equipment.sales_id or sales.id = equipment.default_sales_rep_id)
                    and (equipment.sales_id is not null or equipment.default_sales_rep_id is not null)
                )
            )
        )
    );

-- Equipment_contacts INSERT: require equipment to have owner, or caller is admin
create policy "Sales reps can link contacts to their equipment"
    on "public"."equipment_contacts" for insert
    to authenticated
    with check (
        exists (
            select 1 from equipment e
            join sales s on s.user_id = auth.uid()
            where e.id = equipment_id
            and s.disabled = false
            and (
                -- Admin can link to any equipment
                s.administrator = true
                -- Non-admin must own equipment AND equipment must have owner
                or (
                    (s.id = e.sales_id or s.id = e.default_sales_rep_id)
                    and (e.sales_id is not null or e.default_sales_rep_id is not null)
                )
            )
        )
    );

-- Equipment_contacts UPDATE
create policy "Sales reps can update their equipment contacts"
    on "public"."equipment_contacts" for update
    to authenticated
    using (
        exists (
            select 1 from equipment e
            join sales s on s.user_id = auth.uid()
            where e.id = equipment_id
            and s.disabled = false
            and (
                s.administrator = true
                or (
                    (s.id = e.sales_id or s.id = e.default_sales_rep_id)
                    and (e.sales_id is not null or e.default_sales_rep_id is not null)
                )
            )
        )
    )
    with check (
        exists (
            select 1 from equipment e
            join sales s on s.user_id = auth.uid()
            where e.id = equipment_id
            and s.disabled = false
            and (
                s.administrator = true
                or (
                    (s.id = e.sales_id or s.id = e.default_sales_rep_id)
                    and (e.sales_id is not null or e.default_sales_rep_id is not null)
                )
            )
        )
    );

-- Equipment_contacts DELETE
create policy "Sales reps can delete their equipment contacts"
    on "public"."equipment_contacts" for delete
    to authenticated
    using (
        exists (
            select 1 from equipment e
            join sales s on s.user_id = auth.uid()
            where e.id = equipment_id
            and s.disabled = false
            and (
                s.administrator = true
                or (
                    (s.id = e.sales_id or s.id = e.default_sales_rep_id)
                    and (e.sales_id is not null or e.default_sales_rep_id is not null)
                )
            )
        )
    );
