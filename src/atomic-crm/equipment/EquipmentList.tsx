import { CreateButton, List } from "@/components/admin";
import { Card } from "@/components/ui/card";
import { TopToolbar } from "../layout/TopToolbar";
import { EquipmentListContent } from "./EquipmentListContent";

export const EquipmentList = () => {
  return (
    <List
      title="Equipment Inventory"
      actions={<EquipmentListActions />}
      perPage={25}
      sort={{ field: "created_at", order: "DESC" }}
    >
      <div className="w-full flex flex-col gap-4">
        <Card className="py-0">
          <EquipmentListContent />
        </Card>
      </div>
    </List>
  );
};

const EquipmentListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
