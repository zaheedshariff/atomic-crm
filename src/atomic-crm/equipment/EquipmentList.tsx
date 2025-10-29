import { CreateButton, List, SortButton } from "@/components/admin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListContext } from "ra-core";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";
import { TopToolbar } from "../layout/TopToolbar";
import { EquipmentListContent } from "./EquipmentListContent";
import { EquipmentGrid } from "./EquipmentGrid";
import { EquipmentListFilter } from "./EquipmentListFilter";

export const EquipmentList = () => {
  return (
    <List
      title="Equipment Inventory"
      actions={<EquipmentListActions />}
      perPage={25}
      sort={{ field: "created_at", order: "DESC" }}
    >
      <EquipmentListLayout />
    </List>
  );
};

const EquipmentListLayout = () => {
  const { data, isPending, filterValues } = useListContext();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const hasFilters = filterValues && Object.keys(filterValues).length > 0;

  if (isPending) return null;

  if (!data?.length && !hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-muted-foreground">No equipment listed yet</p>
        <CreateButton />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8">
      <EquipmentListFilter />
      <div className="w-full flex flex-col gap-4">
        {/* View Toggle */}
        <div className="flex justify-end gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid
          </Button>
        </div>

        {/* Content */}
        {viewMode === "list" ? (
          <Card className="py-0">
            <EquipmentListContent />
          </Card>
        ) : (
          <EquipmentGrid />
        )}
      </div>
    </div>
  );
};

const EquipmentListActions = () => (
  <TopToolbar>
    <SortButton fields={["manufacturer", "model", "price", "year", "created_at"]} />
    <CreateButton />
  </TopToolbar>
);
