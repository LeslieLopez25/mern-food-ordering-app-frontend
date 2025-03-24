import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderStatusPage = () => {
  const { orders = [], isLoading, refetch } = useGetMyOrders();

  const [deliveredTimestamps, setDeliveredTimestamps] = useState<{
    [id: string]: number;
  }>({});
  const [removedOrderIds, setRemovedOrderIds] = useState<string[]>([]);
  const [toastedOrderIds, setToastedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    orders.forEach((order) => {
      if (order.status === "delivered" && !deliveredTimestamps[order._id]) {
        setDeliveredTimestamps((prev) => ({
          ...prev,
          [order._id]: Date.now(),
        }));
      }
    });
  }, [orders]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      orders.forEach((order) => {
        if (order.status === "delivered" && deliveredTimestamps[order._id]) {
          const elapsed = now - deliveredTimestamps[order._id];
          if (elapsed >= 3000 && !toastedOrderIds.includes(order._id)) {
            toast.success(
              `Thank you for ordering from ${order.restaurant.restaurantName}!`
            );
            setToastedOrderIds((prev) => [...prev, order._id]);
          }
          if (elapsed >= 7000 && !removedOrderIds.includes(order._id)) {
            setRemovedOrderIds((prev) => [...prev, order._id]);
            setTimeout(() => refetch(), 500);
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [orders, deliveredTimestamps, toastedOrderIds, removedOrderIds, refetch]);

  if (isLoading) return "Loading...";

  const visibleOrders = orders.filter(
    (order) => !removedOrderIds.includes(order._id)
  );

  if (visibleOrders.length === 0) return "No orders found";

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
                alt={order.restaurant.restaurantName}
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
