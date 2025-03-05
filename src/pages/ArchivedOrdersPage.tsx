import { useGetArchivedOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const ArchivedOrdersPage = () => {
  const { orders, isLoading } = useGetArchivedOrders();

  if (isLoading) return <p>Loading...</p>;

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500">No Orders Archived</p>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
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
        </div>
      ))}
    </div>
  );
};

export default ArchivedOrdersPage;
