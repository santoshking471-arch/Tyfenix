import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Trophy,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import GradientText from "../../components/GradientText";
import SlimeCard from "../../components/SlimeCard";
import { useAuth } from "../../contexts/AuthContext";
import { useAnalytics } from "../../hooks/useBackend";

export default function AdminAnalytics() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: analytics, isLoading } = useAnalytics();

  const metrics = analytics
    ? [
        {
          label: "Total Revenue",
          value: `$${(Number(analytics.totalRevenue) / 100).toFixed(2)}`,
          icon: DollarSign,
          color: "rgba(0,255,136,0.15)",
          iconColor: "oklch(0.68 0.25 150)",
        },
        {
          label: "Total Orders",
          value: analytics.orderCount.toString(),
          icon: ShoppingCart,
          color: "rgba(183,0,255,0.15)",
          iconColor: "oklch(0.62 0.28 270)",
        },
        {
          label: "Top Products",
          value: analytics.topProducts.length.toString(),
          icon: Package,
          color: "rgba(0,136,255,0.15)",
          iconColor: "oklch(0.62 0.2 230)",
        },
        {
          label: "Avg Order Value",
          value:
            analytics.orderCount > 0n
              ? `$${(
                  Number(analytics.totalRevenue) /
                    Number(analytics.orderCount) /
                    100
                ).toFixed(2)}`
              : "$0.00",
          icon: TrendingUp,
          color: "rgba(255,200,0,0.15)",
          iconColor: "oklch(0.75 0.18 80)",
        },
      ]
    : [];

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
      <div className="space-y-8">
        <div className="float-entrance">
          <GradientText className="text-2xl font-bold font-display" as="h1">
            Analytics
          </GradientText>
          <p className="text-muted-foreground text-sm mt-1">
            Store performance overview
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-3xl bg-white/5" />
            ))}
          </div>
        ) : (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map(
                ({ label, value, icon: Icon, color, iconColor }, idx) => (
                  <SlimeCard
                    key={label}
                    className="p-5"
                    glowing
                    data-ocid={`admin.analytics_metric.${idx + 1}`}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: color }}
                    >
                      <Icon size={18} style={{ color: iconColor }} />
                    </div>
                    <GradientText className="text-2xl font-bold block" as="div">
                      {value}
                    </GradientText>
                    <p className="text-xs text-muted-foreground mt-1">
                      {label}
                    </p>
                  </SlimeCard>
                ),
              )}
            </div>

            {/* Top Products */}
            {analytics && analytics.topProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-primary" />
                  <h2 className="text-lg font-semibold">
                    Top Performing Products
                  </h2>
                </div>
                <div className="space-y-3">
                  {analytics.topProducts.map((product, idx) => {
                    const maxRevenue = Math.max(
                      ...analytics.topProducts.map((p) => Number(p.revenue)),
                    );
                    const pct =
                      maxRevenue > 0
                        ? Math.round(
                            (Number(product.revenue) / maxRevenue) * 100,
                          )
                        : 0;
                    return (
                      <SlimeCard
                        key={product.productId.toString()}
                        className="p-4"
                        data-ocid={`admin.top_product.${idx + 1}`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                                color: "#0a0e27",
                              }}
                            >
                              {idx + 1}
                            </span>
                            <p className="font-semibold text-sm truncate">
                              {product.name}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <GradientText className="font-bold text-sm">
                              ${(Number(product.revenue) / 100).toFixed(2)}
                            </GradientText>
                            <p className="text-xs text-muted-foreground">
                              {Number(product.totalSold)} units
                            </p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-smooth"
                            style={{
                              width: `${pct}%`,
                              background:
                                "linear-gradient(90deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                            }}
                          />
                        </div>
                      </SlimeCard>
                    );
                  })}
                </div>
              </div>
            )}

            {analytics && analytics.topProducts.length === 0 && (
              <SlimeCard
                className="p-16 text-center"
                data-ocid="admin.analytics_empty_state"
              >
                <TrendingUp
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <p className="text-muted-foreground">
                  No sales data yet. Start selling to see analytics.
                </p>
              </SlimeCard>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
