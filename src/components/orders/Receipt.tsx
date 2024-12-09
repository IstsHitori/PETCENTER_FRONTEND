import { ReceiptHeader } from "./ReceiptHeader";
import { ReceiptDetails } from "./ReceiptDetails";
import { ReceiptItems } from "./ReceiptItems";
import { ReceiptFooter } from "./ReceiptFooter";
import { Order } from "@/types/OrderTypes";

export const Receipt = ({order}:{order:Order}) => {
  return (
    <div className="min-h-screen items-start flex  justify-center p-4 ">
      <div className="relative w-full max-w-sm">
        <div className="bg-white relative top-0 p-8 shadow-2xl shadow-blue-100 rounded-t-lg">
          <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500 rounded-t-lg"></div>
          <ReceiptHeader />
          <div className="my-6 border-b-2 border-dashed border-gray-200"></div>
          <ReceiptDetails order={order}  />
          <div className="my-6 border-b-2 border-dashed border-gray-200"></div>
          <ReceiptItems items={order.items} total={order.total_amount} />
          <div className="my-6 border-b-2 border-dashed border-gray-200"></div>
          <ReceiptFooter />
        </div>
        {/* Enhanced pointy bottom design */}
        <div className="absolute -bottom-6 left-0 right-0 h-6 overflow-hidden">
          <div className="absolute inset-0 flex">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                }}
              >
                <div className="h-6 bg-white shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
