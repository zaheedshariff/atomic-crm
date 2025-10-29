import { Skeleton } from "@/components/ui/skeleton";
import { formatRelative } from "date-fns";
import { RecordContextProvider, useListContext } from "ra-core";
import { Link } from "react-router";
import type { Equipment } from "../types";

export const EquipmentListContent = () => {
  const { data: equipment, error, isPending } = useListContext<Equipment>();

  if (isPending) {
    return <Skeleton className="w-full h-9" />;
  }

  if (error) {
    return null;
  }

  const now = Date.now();

  return (
    <div className="divide-y">
      {equipment?.map((item) => (
        <RecordContextProvider key={item.id} value={item}>
          <Link
            to={`/equipment/${item.id}/edit`}
            className="flex flex-row gap-4 items-center px-4 py-3 hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl"
          >
            {/* Equipment Image Placeholder */}
            <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center shrink-0">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0].src}
                  alt={`${item.manufacturer} ${item.model}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-xs text-muted-foreground">No image</span>
              )}
            </div>

            {/* Equipment Details */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base">
                {item.year && `${item.year} `}
                {item.manufacturer} {item.model}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {item.description && item.description.length > 0
                  ? item.description.substring(0, 120) +
                    (item.description.length > 120 ? "..." : "")
                  : "No description"}
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                {item.stock_number && (
                  <span>Stock: {item.stock_number}</span>
                )}
                {item.category && <span>{item.category}</span>}
                {item.location && <span>{item.location}</span>}
                {item.hours !== null && item.hours !== undefined && (
                  <span>{item.hours.toLocaleString()} hrs</span>
                )}
              </div>
            </div>

            {/* Price and Date */}
            <div className="text-right ml-4 flex flex-col gap-1">
              {item.price && (
                <div className="font-semibold text-lg">
                  ${item.price.toLocaleString()}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                {formatRelative(item.updated_at, now)}
              </div>
              {item.status && (
                <div className="text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      item.status === "available"
                        ? "bg-green-100 text-green-700"
                        : item.status === "sold"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </RecordContextProvider>
      ))}

      {equipment?.length === 0 && (
        <div className="p-4">
          <div className="text-muted-foreground">No equipment found</div>
        </div>
      )}
    </div>
  );
};
