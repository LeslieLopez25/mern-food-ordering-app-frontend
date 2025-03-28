import { OrderStatus } from "@/types";

// Defines all possible order statues with labels and progress value
type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

// Order status steps with progress tracking
export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
