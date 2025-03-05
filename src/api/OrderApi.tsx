import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("fetchMyOrders", getMyOrdersRequest, {
    refetchInterval: 5000,
    staleTime: 0,
    cacheTime: 0,
  });

  return { orders, isLoading, refetch };
};

export const useArchiveOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const archiveOrderRequest = async (orderId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/${orderId}/archive`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to archive order");
    }

    return response.json();
  };

  const { mutate: archiveOrder, isLoading } = useMutation(archiveOrderRequest, {
    onSuccess: () => {
      toast.success("Order archived successfully");
      queryClient.invalidateQueries("fetchMyOrders");
      queryClient.invalidateQueries("fetchArchivedOrders");
    },
    onError: () => {
      toast.error("Failed to archive order");
    },
  });

  return { archiveOrder, isLoading };
};

export const useGetArchivedOrders = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const fetchArchivedOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order/archived`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get archived orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    ["fetchArchivedOrders", user?.sub],
    fetchArchivedOrders,
    {
      refetchInterval: 5000,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
