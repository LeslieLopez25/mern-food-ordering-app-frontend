import { useEffect, useState } from "react";
import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "./config/order-status-config";
import {
  useUpdateMyRestaurantOrder,
  useDeleteOrder,
} from "@/api/MyRestaurantApi";
import { toast } from "sonner";

type Props = {
  order: Order;
  isArchived?: boolean;
  onRemove?: () => void;
};

const OrderItemCard = ({ order, isArchived = false, onRemove }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const { deleteOrder } = useDeleteOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Show remove button after 7 seconds if order is "delivered"
  useEffect(() => {
    if (status === "delivered") {
      const timer = setTimeout(() => {
        setShowRemoveButton(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handle status update and trigger API call
  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (newStatus !== status)
      try {
        await updateRestaurantStatus({
          orderId: order._id as string,
          status: newStatus,
        });

        setStatus(newStatus);
        toast.success("Order updated");
      } catch (error) {
        console.error("Error updating order:", error);
        toast.error("Failed to update order");
      }
    if (newStatus === "delivered") {
      setTimeout(() => {
        setShowRemoveButton(true);
      }, 7000);
    }
  };

  // Remove order from system
  const handleRemoveOrder = async () => {
    await deleteOrder(order._id as string);
    setIsVisible(false);
    if (onRemove) onRemove();
  };

  // Format order time
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  if (!isVisible) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        {!isArchived && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">What is the status of this order?</Label>
            <Select
              value={status}
              disabled={isLoading}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {status === "delivered" && showRemoveButton && (
          <button
            onClick={handleRemoveOrder}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            X
          </button>
        )}
        {status === "delivered" && !showRemoveButton && (
          <span className="text-sm text-gray-500">Removing soon...</span>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
