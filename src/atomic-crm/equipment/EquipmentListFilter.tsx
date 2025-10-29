import { DollarSign, Package, Settings, Truck, Users } from "lucide-react";
import { FilterLiveForm, useGetIdentity } from "ra-core";

import { ToggleFilterButton, SearchInput } from "@/components/admin";
import { FilterCategory } from "../filters/FilterCategory";

export const EquipmentListFilter = () => {
  const { identity } = useGetIdentity();

  const statuses = [
    { id: "available", name: "Available" },
    { id: "pending", name: "Pending" },
    { id: "sold", name: "Sold" },
  ];

  const conditions = [
    { id: "New", name: "New" },
    { id: "Used", name: "Used" },
    { id: "Refurbished", name: "Refurbished" },
  ];

  const listingTypes = [
    { id: "Regular", name: "Regular" },
    { id: "Featured", name: "Featured" },
  ];

  return (
    <div className="w-52 min-w-52 order-first pt-0.75 flex flex-col gap-4">
      <FilterLiveForm>
        <SearchInput 
          source="q" 
          placeholder="Search equipment..." 
        />
      </FilterLiveForm>

      <FilterCategory label="Status" icon={<Package />}>
        {statuses.map((status) => (
          <ToggleFilterButton
            key={status.id}
            className="w-full justify-between"
            label={status.name}
            value={{ status: status.id }}
          />
        ))}
      </FilterCategory>

      <FilterCategory label="Condition" icon={<Settings />}>
        {conditions.map((condition) => (
          <ToggleFilterButton
            key={condition.id}
            className="w-full justify-between"
            label={condition.name}
            value={{ condition: condition.id }}
          />
        ))}
      </FilterCategory>

      <FilterCategory label="Listing Type" icon={<Truck />}>
        {listingTypes.map((type) => (
          <ToggleFilterButton
            key={type.id}
            className="w-full justify-between"
            label={type.name}
            value={{ listing_type: type.id }}
          />
        ))}
      </FilterCategory>

      <FilterCategory label="Price Range" icon={<DollarSign />}>
        <ToggleFilterButton
          className="w-full justify-between"
          label="Under $10,000"
          value={{ "price@lt": 10000 }}
        />
        <ToggleFilterButton
          className="w-full justify-between"
          label="$10,000 - $50,000"
          value={{ "price@gte": 10000, "price@lt": 50000 }}
        />
        <ToggleFilterButton
          className="w-full justify-between"
          label="$50,000 - $100,000"
          value={{ "price@gte": 50000, "price@lt": 100000 }}
        />
        <ToggleFilterButton
          className="w-full justify-between"
          label="Over $100,000"
          value={{ "price@gte": 100000 }}
        />
      </FilterCategory>

      <FilterCategory icon={<Users />} label="Assigned Rep">
        <ToggleFilterButton
          className="w-full justify-between"
          label="My Equipment"
          value={{ sales_id: identity?.id }}
        />
      </FilterCategory>
    </div>
  );
};
