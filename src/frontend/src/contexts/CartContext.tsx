import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActor } from "../hooks/useActor";
import type { CartItem, Product } from "../types";

interface CartContextType {
  items: CartItem[];
  products: Map<bigint, Product>;
  isLoading: boolean;
  totalItems: number;
  totalPrice: bigint;
  addItem: (productId: bigint, quantity: bigint) => Promise<void>;
  removeItem: (productId: bigint) => Promise<void>;
  updateItem: (productId: bigint, quantity: bigint) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<bigint, Product>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      setIsLoading(true);
      const cartItems = await actor.getCart();
      setItems(cartItems);

      // Fetch product details for each cart item
      const productMap = new Map<bigint, Product>();
      await Promise.all(
        cartItems.map(async (item) => {
          const product = await actor.getProduct(item.productId);
          if (product) productMap.set(item.productId, product);
        }),
      );
      setProducts(productMap);
    } catch {
      // silently handle - user may not be authenticated
    } finally {
      setIsLoading(false);
    }
  }, [actor, isFetching]);

  useEffect(() => {
    if (actor && !isFetching) {
      refreshCart();
    }
  }, [actor, isFetching, refreshCart]);

  const addItem = useCallback(
    async (productId: bigint, quantity: bigint) => {
      if (!actor) return;
      // Optimistic update
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { productId, quantity }];
      });
      await actor.addToCart(productId, quantity);
      await refreshCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    [actor, refreshCart, queryClient],
  );

  const removeItem = useCallback(
    async (productId: bigint) => {
      if (!actor) return;
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      await actor.removeFromCart(productId);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    [actor, queryClient],
  );

  const updateItem = useCallback(
    async (productId: bigint, quantity: bigint) => {
      if (!actor) return;
      if (quantity <= 0n) {
        await removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      );
      await actor.updateCartItem(productId, quantity);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    [actor, removeItem, queryClient],
  );

  const clearCart = useCallback(async () => {
    if (!actor) return;
    setItems([]);
    await actor.clearCart();
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [actor, queryClient]);

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const totalPrice = items.reduce((sum, item) => {
    const product = products.get(item.productId);
    return sum + (product ? product.price * item.quantity : 0n);
  }, 0n);

  return (
    <CartContext.Provider
      value={{
        items,
        products,
        isLoading,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
