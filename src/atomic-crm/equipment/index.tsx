import type { Equipment } from "../types";
import { EquipmentCreate } from "./EquipmentCreate";
import { EquipmentEdit } from "./EquipmentEdit";
import { EquipmentList } from "./EquipmentList";

export default {
  list: EquipmentList,
  edit: EquipmentEdit,
  create: EquipmentCreate,
  recordRepresentation: (record: Equipment) =>
    `${record?.year || ""} ${record?.manufacturer || ""} ${record?.model || ""}`.trim() ||
    record?.stock_number ||
    `Equipment #${record?.id}`,
};
