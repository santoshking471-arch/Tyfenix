import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle, ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import GradientText from "../../components/GradientText";
import SlimeCard from "../../components/SlimeCard";
import { useAuth } from "../../contexts/AuthContext";
import { useAllOrders, useUpdateOrderStatus } from "../../hooks/useBackend";
import { OrderStatus } from "../../types";

const STATUS_OPTIONS = Object.values(OrderStatus);

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "rgba(255,200,0,0.15)",
  [OrderStatus.Confirmed]: "rgba(0,255,136,0.15)",
  [OrderStatus.Shipped]: "rgba(0,136,255,0.15)",
  [OrderStatus.Delivered]: "rgba(0,255,136,0.2)",
  [OrderStatus.Cancelled]: "rgba(255,50,50,0.15)",
};

const STATUS_TEXT: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "oklch(0.75 0.18 80)",
  [OrderStatus.Confirmed]: "oklch(0.68 0.25 150)",
  [OrderStatus.Shipped]: "oklch(0.62 0.2 230)",
  [OrderStatus.Delivered]: "oklch(0.68 0.25 150)",
  [OrderStatus.Cancelled]: "oklch(0.65 0.22 25)",
};

export default function AdminOrders() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: orders = [], isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      toast.success(`Order status updated to ${status}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update status",
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <SlimeCard
            className="p-12 text-center max-w-md"
            data-ocid="admin.auth_required"
          >
            <AlertCircle
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to access the admin panel.
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
              data-ocid="admin.login_button"
            >
              Sign In
            </button>
          </SlimeCard>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <SlimeCard
            className="p-12 text-center max-w-md"
            data-ocid="admin.access_denied"
          >
            <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have admin permissions.
            </p>
          </SlimeCard>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between float-entrance">
          <div>
            <GradientText className="text-2xl font-bold font-display" as="h1">
              Orders
            </GradientText>
            <p className="text-muted-foreground text-sm mt-1">
              {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", ...STATUS_OPTIONS].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setFilterStatus(s as OrderStatus | "all")}
                data-ocid={`admin.orders.filter_${s}_tab`}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-smooth ${
                  filterStatus === s
                    ? "text-background"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
                style={
                  filterStatus === s
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                      }
                    : {}
                }
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card h-24 animate-pulse rounded-3xl bg-white/5"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <SlimeCard
            className="p-16 text-center"
            data-ocid="admin.orders_empty_state"
          >
            <ShoppingCart
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <p className="text-muted-foreground">No orders found.</p>
          </SlimeCard>
        ) : (
          <div className="space-y-3">
            {filtered.map((order, idx) => (
              <SlimeCard
                key={order.id.toString()}
                className="p-5"
                data-ocid={`admin.order.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm">
                        Order #{order.id.toString()}
                      </span>
                      <Badge
                        className="rounded-xl text-xs"
                        style={{
                          background: STATUS_COLORS[order.status],
                          color: STATUS_TEXT[order.status],
                        }}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""} •{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientText className="font-bold">
                      ${(Number(order.totalAmount) / 100).toFixed(2)}
                    </GradientText>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs rounded-xl glass-card"
                          data-ocid={`admin.order_status_dropdown.${idx + 1}`}
                        >
                          Update Status
                          <ChevronDown size={12} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="border border-white/10 rounded-2xl"
                        style={{
                          background: "rgba(10,14,39,0.97)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <DropdownMenuItem
                            key={s}
                            onClick={() => handleStatusChange(order.id, s)}
                            className="rounded-xl cursor-pointer text-muted-foreground focus:text-foreground focus:bg-white/10"
                            disabled={s === order.status}
                            data-ocid={`admin.order_status_${s.toLowerCase()}.${idx + 1}`}
                          >
                            {s}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SlimeCard>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
