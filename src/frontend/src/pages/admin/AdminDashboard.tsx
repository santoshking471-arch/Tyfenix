import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowUpRight,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import GradientText from "../../components/GradientText";
import SlimeCard from "../../components/SlimeCard";
import { useAuth } from "../../contexts/AuthContext";
import {
  useAllOrders,
  useAnalytics,
  useCustomers,
  useProducts,
} from "../../hooks/useBackend";
import { OrderStatus } from "../../types";

export default function AdminDashboard() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: analytics } = useAnalytics();
  const { data: orders = [] } = useAllOrders();
  const { data: products = [] } = useProducts();
  const { data: customers = [] } = useCustomers();

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

  const pendingOrders = orders.filter(
    (o) => o.status === OrderStatus.Pending,
  ).length;
  const totalRevenue = analytics?.totalRevenue ?? 0n;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${(Number(totalRevenue) / 100).toFixed(2)}`,
      icon: TrendingUp,
      href: "/admin/analytics",
    },
    {
      label: "Total Products",
      value: products.length.toString(),
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Total Orders",
      value: (analytics?.orderCount ?? BigInt(orders.length)).toString(),
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Customers",
      value: customers.length.toString(),
      icon: Users,
      href: "/admin/customers",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="float-entrance">
          <GradientText
            className="text-3xl font-bold block font-display"
            as="h1"
          >
            Dashboard
          </GradientText>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back, here's your store overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, href }, idx) => (
            <Link to={href} key={label} data-ocid={`admin.stat.${idx + 1}`}>
              <SlimeCard className="p-5 hover-lift" glowing>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2 rounded-2xl"
                    style={{ background: "rgba(0,255,136,0.1)" }}
                  >
                    <Icon size={18} className="text-primary" />
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground" />
                </div>
                <GradientText className="text-2xl font-bold block" as="div">
                  {value}
                </GradientText>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </SlimeCard>
            </Link>
          ))}
        </div>

        {/* Pending Orders Alert */}
        {pendingOrders > 0 && (
          <SlimeCard
            className="p-4 border border-yellow-400/20"
            data-ocid="admin.pending_orders_alert"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl"
                  style={{ background: "rgba(255,200,0,0.15)" }}
                >
                  <ShoppingCart size={16} className="text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {pendingOrders} pending order
                    {pendingOrders !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Awaiting processing
                  </p>
                </div>
              </div>
              <Link to="/admin/orders">
                <button
                  type="button"
                  className="text-xs px-4 py-2 rounded-xl font-medium"
                  style={{
                    background: "rgba(255,200,0,0.15)",
                    color: "rgb(234,179,8)",
                  }}
                  data-ocid="admin.view_pending_button"
                >
                  View Orders
                </button>
              </Link>
            </div>
          </SlimeCard>
        )}

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-primary hover:underline"
              data-ocid="admin.all_orders_link"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order, idx) => (
              <SlimeCard
                key={order.id.toString()}
                className="p-4"
                data-ocid={`admin.recent_order.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">
                      Order #{order.id.toString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""} •{" "}
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <GradientText className="font-bold">
                      ${(Number(order.totalAmount) / 100).toFixed(2)}
                    </GradientText>
                    <p className="text-xs text-muted-foreground">
                      {order.status}
                    </p>
                  </div>
                </div>
              </SlimeCard>
            ))}
            {orders.length === 0 && (
              <SlimeCard
                className="p-8 text-center"
                data-ocid="admin.orders_empty_state"
              >
                <p className="text-muted-foreground text-sm">No orders yet.</p>
              </SlimeCard>
            )}
          </div>
        </div>

        {/* Top Products */}
        {analytics?.topProducts && analytics.topProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <div className="space-y-3">
              {analytics.topProducts.slice(0, 5).map((p, idx) => (
                <SlimeCard
                  key={p.productId.toString()}
                  className="p-4"
                  data-ocid={`admin.top_product.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Number(p.totalSold)} sold
                      </p>
                    </div>
                    <GradientText className="font-bold text-sm">
                      ${(Number(p.revenue) / 100).toFixed(2)}
                    </GradientText>
                  </div>
                </SlimeCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
