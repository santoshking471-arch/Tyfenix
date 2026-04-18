import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { usePlaceOrder } from "../hooks/useBackend";
import type { ShippingAddress } from "../types";

const emptyAddress: ShippingAddress = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export default function CheckoutPage() {
  const { items, products, totalPrice, clearCart } = useCart();
  const { isAuthenticated, customer } = useAuth();
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();
  const [address, setAddress] = useState<ShippingAddress>(
    customer?.addresses[0] ?? emptyAddress,
  );
  const [placed, setPlaced] = useState(false);

  const handleField =
    (field: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to place an order.");
      return;
    }
    try {
      await placeOrder.mutateAsync(address);
      await clearCart();
      setPlaced(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    }
  };

  if (placed) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-24 text-center float-entrance">
          <SlimeCard className="p-12" glowing>
            <CheckCircle2 size={64} className="mx-auto text-primary mb-4" />
            <GradientText className="text-3xl font-bold block mb-3" as="h2">
              Order Placed!
            </GradientText>
            <p className="text-muted-foreground mb-8">
              Your order has been confirmed and is being processed.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="rounded-2xl border-white/10"
                onClick={() => navigate({ to: "/orders" })}
                data-ocid="checkout.view_orders_button"
              >
                View Orders
              </Button>
              <Button
                className="rounded-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                onClick={() => navigate({ to: "/" })}
                data-ocid="checkout.continue_shopping_button"
              >
                Keep Shopping
              </Button>
            </div>
          </SlimeCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          type="button"
          onClick={() => navigate({ to: "/cart" })}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
          data-ocid="checkout.back_button"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold font-display mb-8 float-entrance">
          <GradientText as="span">Checkout</GradientText>
        </h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Shipping Form */}
          <div className="md:col-span-3">
            <SlimeCard className="p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Shipping Address
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-xs mb-1.5 block">
                    Street Address
                  </Label>
                  <Input
                    value={address.street}
                    onChange={handleField("street")}
                    placeholder="123 Main St"
                    required
                    className="bg-white/5 border-white/10 rounded-2xl"
                    data-ocid="checkout.street_input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs mb-1.5 block">
                      City
                    </Label>
                    <Input
                      value={address.city}
                      onChange={handleField("city")}
                      placeholder="New York"
                      required
                      className="bg-white/5 border-white/10 rounded-2xl"
                      data-ocid="checkout.city_input"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs mb-1.5 block">
                      State
                    </Label>
                    <Input
                      value={address.state}
                      onChange={handleField("state")}
                      placeholder="NY"
                      required
                      className="bg-white/5 border-white/10 rounded-2xl"
                      data-ocid="checkout.state_input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs mb-1.5 block">
                      Postal Code
                    </Label>
                    <Input
                      value={address.postalCode}
                      onChange={handleField("postalCode")}
                      placeholder="10001"
                      required
                      className="bg-white/5 border-white/10 rounded-2xl"
                      data-ocid="checkout.postal_code_input"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs mb-1.5 block">
                      Country
                    </Label>
                    <Input
                      value={address.country}
                      onChange={handleField("country")}
                      placeholder="United States"
                      required
                      className="bg-white/5 border-white/10 rounded-2xl"
                      data-ocid="checkout.country_input"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={placeOrder.isPending || items.length === 0}
                  className="w-full rounded-2xl font-semibold mt-2 pulsing-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                    color: "#0a0e27",
                  }}
                  data-ocid="checkout.place_order_button"
                >
                  {placeOrder.isPending ? "Placing Order…" : "Place Order"}
                </Button>
              </form>
            </SlimeCard>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <SlimeCard className="p-6" glowing>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const product = products.get(item.productId);
                  return (
                    <div
                      key={item.productId.toString()}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={
                          product?.imageUrl || "/assets/images/placeholder.svg"
                        }
                        alt={product?.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-foreground">
                          {product?.name ?? "…"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          ×{Number(item.quantity)}
                        </p>
                      </div>
                      <span className="text-foreground shrink-0">
                        $
                        {product
                          ? (
                              (Number(product.price) * Number(item.quantity)) /
                              100
                            ).toFixed(2)
                          : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-muted-foreground">Total</span>
                <GradientText className="text-xl font-bold">
                  ${(Number(totalPrice) / 100).toFixed(2)}
                </GradientText>
              </div>
            </SlimeCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
