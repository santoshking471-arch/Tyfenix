import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Package,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useCart } from "../contexts/CartContext";
import { useProduct } from "../hooks/useBackend";

export default function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading } = useProduct(id ? BigInt(id) : null);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem(product.id, BigInt(quantity));
    toast.success(`${product.name} ×${quantity} added to cart!`, {
      icon: "🛒",
    });
  };

  const handleBuyNow = async () => {
    if (!product) return;
    await addItem(product.id, BigInt(quantity));
    navigate({ to: "/cart" });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-3xl bg-white/5" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 bg-white/5 rounded-2xl" />
            <Skeleton className="h-6 w-1/3 bg-white/5 rounded-2xl" />
            <Skeleton className="h-32 w-full bg-white/5 rounded-2xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div
          className="max-w-5xl mx-auto px-4 py-24 text-center"
          data-ocid="product.error_state"
        >
          <Package size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-6">
            This product doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button
              className="rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27",
              }}
            >
              Back to Store
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
          data-ocid="product.back_link"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>

        <div className="grid md:grid-cols-2 gap-12 float-entrance">
          {/* Product Image */}
          <SlimeCard className="aspect-square overflow-hidden p-0 rounded-3xl">
            <img
              src={product.imageUrl || "/assets/images/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </SlimeCard>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div>
              <Badge
                className="mb-3 rounded-xl"
                style={{
                  background: "rgba(0,255,136,0.15)",
                  color: "oklch(0.68 0.25 150)",
                }}
              >
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold font-display leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} rating
                </span>
              </div>
            </div>

            <GradientText className="text-4xl font-bold" as="div">
              ${(Number(product.price) / 100).toFixed(2)}
            </GradientText>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <Package size={14} className="text-primary" />
              <span
                className={
                  product.stock > 0n ? "text-primary" : "text-destructive"
                }
              >
                {product.stock > 0n
                  ? `${Number(product.stock)} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Quantity */}
            {product.stock > 0n && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-2 glass-card rounded-2xl px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center"
                    data-ocid="product.qty_decrease_button"
                  >
                    −
                  </button>
                  <span className="font-semibold w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(Math.min(Number(product.stock), quantity + 1))
                    }
                    className="text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center"
                    data-ocid="product.qty_increase_button"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0n || !product.isActive}
                size="lg"
                variant="outline"
                className="flex-1 rounded-2xl border-primary/30 hover:border-primary/60 gap-2"
                data-ocid="product.add_to_cart_button"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0n || !product.isActive}
                size="lg"
                className="flex-1 rounded-2xl font-semibold pulsing-glow"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="product.buy_now_button"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: Shield, label: "Secure Payment" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: Package, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass-card p-3 text-center rounded-2xl flex flex-col items-center gap-1"
                >
                  <Icon size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
