import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { required } from "ra-core";
import { FileField, FileInput, NumberInput, SelectInput, TextInput } from "@/components/admin";

export const EquipmentInputs = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-2 p-1">
      <div className={`flex gap-6 ${isMobile ? "flex-col" : "flex-row"}`}>
        <div className="flex flex-col gap-10 flex-1">
          <BasicInfoInputs />
          <PricingInputs />
        </div>
        <Separator
          orientation={isMobile ? "horizontal" : "vertical"}
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-10 flex-1">
          <ImagesInputs />
          <DetailsInputs />
          <NotesInputs />
        </div>
      </div>
    </div>
  );
};

const BasicInfoInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Basic Information</h6>
      <TextInput
        source="manufacturer"
        validate={required()}
        helperText={false}
      />
      <TextInput source="model" validate={required()} helperText={false} />
      <NumberInput source="year" helperText={false} />
      <SelectInput
        source="condition"
        choices={[
          { id: "New", name: "New" },
          { id: "Used", name: "Used" },
          { id: "Refurbished", name: "Refurbished" },
        ]}
        helperText={false}
      />
      <TextInput source="serial_number" helperText={false} />
      <NumberInput source="hours" helperText={false} />
    </div>
  );
};

const PricingInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Pricing & Availability</h6>
      <NumberInput source="price" helperText={false} />
      <NumberInput source="quantity" helperText={false} defaultValue={1} />
      <TextInput source="location" helperText={false} />
      <SelectInput
        source="status"
        choices={[
          { id: "available", name: "Available" },
          { id: "pending", name: "Pending" },
          { id: "sold", name: "Sold" },
        ]}
        helperText={false}
        defaultValue="available"
      />
    </div>
  );
};

const DetailsInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Details</h6>
      <TextInput source="category" helperText={false} />
      <SelectInput
        source="listing_type"
        choices={[
          { id: "Regular", name: "Regular" },
          { id: "Featured", name: "Featured" },
        ]}
        helperText={false}
        defaultValue="Regular"
      />
      <TextInput
        source="description"
        multiline
        rows={4}
        helperText={false}
      />
    </div>
  );
};

const ImagesInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Images</h6>
      <FileInput
        source="images"
        multiple
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
        maxSize={10000000}
        helperText="Upload equipment photos (max 10MB per image)"
      >
        <FileField source="src" title="title" />
      </FileInput>
    </div>
  );
};

const NotesInputs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Notes</h6>
      <TextInput
        source="private_notes"
        multiline
        rows={3}
        helperText={false}
      />
      <TextInput
        source="import_notes"
        multiline
        rows={2}
        helperText={false}
      />
    </div>
  );
};
