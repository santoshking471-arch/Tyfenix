import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Analytics,
  CartItem,
  Customer,
  Order,
  Product,
  ShippingAddress,
} from "../types";
import type { OrderStatus, ProductCategory, UserRole } from "../types";
import { useActor } from "./useActor";

// ─── Products ──────────────────────────────────────────────────────────────

export function useProducts(category?: ProductCategory | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useProduct(id: bigint | null | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id == null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id != null,
    staleTime: 30_000,
  });
}

export function useSearchProducts(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
    staleTime: 10_000,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      price: bigint;
      imageUrl: string;
      category: ProductCategory;
      stock: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.createProduct(
        data.name,
        data.description,
        data.price,
        data.imageUrl,
        data.category,
        data.stock,
      );
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name?: string | null;
      description?: string | null;
      price?: bigint | null;
      imageUrl?: string | null;
      category?: ProductCategory | null;
      stock?: bigint | null;
      isActive?: boolean | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateProduct(
        data.id,
        data.name ?? null,
        data.description ?? null,
        data.price ?? null,
        data.imageUrl ?? null,
        data.category ?? null,
        data.stock ?? null,
        data.isActive ?? null,
      );
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", vars.id.toString()],
      });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.deleteProduct(id);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ─── Cart ───────────────────────────────────────────────────────────────────

export function useCartQuery() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(id: bigint | null | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Order | null>({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id == null) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id != null,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (shippingAddress: ShippingAddress) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.placeOrder(shippingAddress);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateOrderStatus(id, status);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export function useMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Customer | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
    }: { name?: string | null; email?: string | null }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateProfile(name ?? null, email ?? null);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myProfile"] }),
  });
}

export function useAddAddress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (address: ShippingAddress) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.addAddress(address);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myProfile"] }),
  });
}

// ─── Customers ───────────────────────────────────────────────────────────────

export function useCustomers() {
  const { actor, isFetching } = useActor();
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCustomers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetCustomerRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerId,
      role,
    }: { customerId: import("../types").UserId; role: UserRole }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.setCustomerRole(customerId, role);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0] as string);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export function useAnalytics() {
  const { actor, isFetching } = useActor();
  return useQuery<Analytics | null>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
