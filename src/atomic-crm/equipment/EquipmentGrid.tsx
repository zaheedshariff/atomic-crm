import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { formatRelative } from "date-fns";
import { RecordContextProvider, useListContext } from "ra-core";
import { Link } from "react-router";
import type { Equipment } from "../types";

export const EquipmentGrid = () => {
  const { data: equipment, error, isPending } = useListContext<Equipment>();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return null;
  }

  const now = Date.now();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {equipment?.map((item) => (
        <RecordContextProvider key={item.id} value={item}>
          <Link to={`/equipment/${item.id}/edit`}>
            <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
              {/* Equipment Image */}
              <div className="w-full h-48 bg-muted flex items-center justify-center overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].src}
                    alt={`${item.manufacturer} ${item.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">No image</span>
                )}
              </div>

              {/* Equipment Details */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold text-base line-clamp-2 flex-1">
                    {item.year && `${item.year} `}
                    {item.manufacturer} {item.model}
                  </div>
                  {item.status && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                        item.status === "available"
                          ? "bg-green-100 text-green-700"
                          : item.status === "sold"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                </div>

                {item.price && (
                  <div className="font-bold text-xl text-primary">
                    ${item.price.toLocaleString()}
                  </div>
                )}

                <div className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {item.description || "No description"}
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
                  {item.stock_number && (
                    <span className="bg-muted px-2 py-1 rounded">
                      {item.stock_number}
                    </span>
                  )}
                  {item.hours !== null && item.hours !== undefined && (
                    <span className="bg-muted px-2 py-1 rounded">
                      {item.hours.toLocaleString()} hrs
                    </span>
                  )}
                  {item.location && (
                    <span className="bg-muted px-2 py-1 rounded">
                      {item.location}
                    </span>
                  )}
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  Updated {formatRelative(item.updated_at, now)}
                </div>
              </div>
            </Card>
          </Link>
        </RecordContextProvider>
      ))}

      {equipment?.length === 0 && (
        <div className="col-span-full text-center p-8">
          <div className="text-muted-foreground">No equipment found</div>
        </div>
      )}
    </div>
  );
};
