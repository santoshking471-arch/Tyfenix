import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const {
    items,
    products,
    isLoading,
    totalItems,
    totalPrice,
    updateItem,
    removeItem,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card h-24 animate-pulse rounded-3xl bg-white/5"
            />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-display mb-8 float-entrance">
          <GradientText as="span">Shopping Cart</GradientText>
          {totalItems > 0 && (
            <span className="ml-3 text-lg text-muted-foreground font-normal">
              ({totalItems} item{totalItems !== 1 ? "s" : ""})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <SlimeCard className="p-16 text-center" data-ocid="cart.empty_state">
            <ShoppingBag
              size={64}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover amazing products and add them to your cart.
            </p>
            <Link to="/">
              <Button
                className="rounded-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="cart.continue_shopping_button"
              >
                Continue Shopping
              </Button>
            </Link>
          </SlimeCard>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            {items.map((item, idx) => {
              const product = products.get(item.productId);
              return (
                <SlimeCard
                  key={item.productId.toString()}
                  className="p-4"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to="/product/$id"
                      params={{ id: item.productId.toString() }}
                      className="shrink-0"
                    >
                      <img
                        src={
                          product?.imageUrl || "/assets/images/placeholder.svg"
                        }
                        alt={product?.name ?? "Product"}
                        className="w-16 h-16 object-cover rounded-2xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to="/product/$id"
                        params={{ id: item.productId.toString() }}
                        className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {product?.name ?? "Loading..."}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        $
                        {product
                          ? (Number(product.price) / 100).toFixed(2)
                          : "—"}{" "}
                        each
                      </p>
                    </div>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 glass-card rounded-2xl px-2 py-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateItem(item.productId, item.quantity - 1n)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Decrease quantity"
                        data-ocid={`cart.decrease.${idx + 1}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {Number(item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateItem(item.productId, item.quantity + 1n)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Increase quantity"
                        data-ocid={`cart.increase.${idx + 1}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {/* Item total */}
                    <GradientText className="text-base font-bold shrink-0">
                      $
                      {product
                        ? (
                            (Number(product.price) * Number(item.quantity)) /
                            100
                          ).toFixed(2)
                        : "—"}
                    </GradientText>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      aria-label="Remove item"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </SlimeCard>
              );
            })}

            {/* Summary */}
            <SlimeCard className="p-6 mt-6" glowing>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <GradientText className="text-2xl font-bold">
                  ${(Number(totalPrice) / 100).toFixed(2)}
                </GradientText>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive rounded-2xl"
                  data-ocid="cart.clear_button"
                >
                  Clear Cart
                </Button>
                <Button
                  className="flex-1 rounded-2xl font-semibold gap-2 pulsing-glow"
                  onClick={() => navigate({ to: "/checkout" })}
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                    color: "#0a0e27",
                  }}
                  data-ocid="cart.checkout_button"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Button>
              </div>
            </SlimeCard>
          </div>
        )}
      </div>
    </Layout>
  );
}
