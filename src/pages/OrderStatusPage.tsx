import { useEffect, useState } from "react";
import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Order } from "@/types"; // Import Order type

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  const [visibleOrders, setVisibleOrders] = useState<Order[]>([]); // ✅ Explicitly type the state

  useEffect(() => {
    if (!orders) return;

    setVisibleOrders(orders);

    const timer = setTimeout(() => {
      setVisibleOrders((currentOrders) =>
        currentOrders.filter((order) => order.status !== "delivered")
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [orders]);

  if (isLoading) {
    return "Loading...";
  }

  if (!visibleOrders || visibleOrders.length === 0) {
    return "No active orders";
  }

  return (
    <div className="space-y-10">
      {visibleOrders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
                alt=""
              />
            </AspectRatio>
          </div>
          {order.status === "delivered" && (
            <p className="text-green-500 font-bold text-center">Delivered</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
