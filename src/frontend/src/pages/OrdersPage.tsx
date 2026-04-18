import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useAuth } from "../contexts/AuthContext";
import { useMyOrders } from "../hooks/useBackend";
import { OrderStatus } from "../types";

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
> = {
  [OrderStatus.Pending]: {
    label: "Pending",
    color: "rgba(255,200,0,0.15)",
    icon: Clock,
  },
  [OrderStatus.Confirmed]: {
    label: "Confirmed",
    color: "rgba(0,255,136,0.15)",
    icon: CheckCircle2,
  },
  [OrderStatus.Shipped]: {
    label: "Shipped",
    color: "rgba(0,136,255,0.15)",
    icon: Truck,
  },
  [OrderStatus.Delivered]: {
    label: "Delivered",
    color: "rgba(0,255,136,0.2)",
    icon: CheckCircle2,
  },
  [OrderStatus.Cancelled]: {
    label: "Cancelled",
    color: "rgba(255,50,50,0.15)",
    icon: XCircle,
  },
};

export default function OrdersPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: orders = [], isLoading } = useMyOrders();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <SlimeCard className="p-12" data-ocid="orders.auth_required">
            <Package size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign in to view orders</h2>
            <p className="text-muted-foreground mb-6">
              Track and manage your orders after signing in.
            </p>
            <button
              type="button"
              onClick={login}
              className="px-8 py-3 rounded-2xl font-semibold pulsing-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27",
              }}
              data-ocid="orders.login_button"
            >
              Sign In
            </button>
          </SlimeCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold font-display mb-8 float-entrance">
          <GradientText as="span">My Orders</GradientText>
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card h-28 animate-pulse rounded-3xl bg-white/5"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <SlimeCard
            className="p-16 text-center"
            data-ocid="orders.empty_state"
          >
            <ShoppingBag
              size={64}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here.
            </p>
            <Link to="/">
              <button
                type="button"
                className="px-8 py-3 rounded-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="orders.shop_now_button"
              >
                Shop Now
              </button>
            </Link>
          </SlimeCard>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => {
              const config = STATUS_CONFIG[order.status];
              const StatusIcon = config.icon;
              return (
                <SlimeCard
                  key={order.id.toString()}
                  className="p-5"
                  data-ocid={`orders.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          Order #{order.id.toString()}
                        </span>
                        <Badge
                          className="rounded-xl text-xs flex items-center gap-1"
                          style={{
                            background: config.color,
                            color:
                              order.status === OrderStatus.Cancelled
                                ? "oklch(0.65 0.22 25)"
                                : "oklch(0.68 0.25 150)",
                          }}
                        >
                          <StatusIcon size={10} />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <GradientText className="text-lg font-bold">
                        ${(Number(order.totalAmount) / 100).toFixed(2)}
                      </GradientText>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Ship to:{" "}
                    </span>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    , {order.shippingAddress.country}
                  </div>
                </SlimeCard>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
