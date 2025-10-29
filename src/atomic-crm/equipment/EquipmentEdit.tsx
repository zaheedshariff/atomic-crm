import { Card, CardContent } from "@/components/ui/card";
import { EditBase, Form } from "ra-core";
import { FormToolbar } from "@/components/admin";
import { EquipmentInputs } from "./EquipmentInputs";

export const EquipmentEdit = () => {
  return (
    <EditBase redirect="list" mutationMode="pessimistic">
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
    </EditBase>
  );
};
