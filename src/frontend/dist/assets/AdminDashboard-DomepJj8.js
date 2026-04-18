import { e as useAuth, j as jsxRuntimeExports, L as Link } from "./index-C-xUBXvy.js";
import { A as AdminLayout, C as CircleAlert, U as Users } from "./AdminLayout-BlEeEIeU.js";
import { c as createLucideIcon, S as SlimeCard, a as ShoppingCart, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { f as useAnalytics, g as useAllOrders, u as useProducts, h as useCustomers } from "./useBackend-kSR7reZp.js";
import { O as OrderStatus } from "./backend.d-WMp6k-0J.js";
import { T as TrendingUp } from "./trending-up-w_40gXhw.js";
import { P as Package } from "./package-DAmhj-Wa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
function AdminDashboard() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: analytics } = useAnalytics();
  const { data: orders = [] } = useAllOrders();
  const { data: products = [] } = useProducts();
  const { data: customers = [] } = useCustomers();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-12 text-center max-w-md",
        "data-ocid": "admin.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              size: 48,
              className: "mx-auto text-muted-foreground mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Authentication Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Sign in to access the admin panel." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: login,
              className: "px-8 py-3 rounded-2xl font-semibold pulsing-glow",
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              "data-ocid": "admin.login_button",
              children: "Sign In"
            }
          )
        ]
      }
    ) }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-12 text-center max-w-md",
        "data-ocid": "admin.access_denied",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 48, className: "mx-auto text-destructive mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You don't have admin permissions." })
        ]
      }
    ) }) });
  }
  const pendingOrders = orders.filter(
    (o) => o.status === OrderStatus.Pending
  ).length;
  const totalRevenue = (analytics == null ? void 0 : analytics.totalRevenue) ?? 0n;
  const stats = [
    {
      label: "Total Revenue",
      value: `$${(Number(totalRevenue) / 100).toFixed(2)}`,
      icon: TrendingUp,
      href: "/admin/analytics"
    },
    {
      label: "Total Products",
      value: products.length.toString(),
      icon: Package,
      href: "/admin/products"
    },
    {
      label: "Total Orders",
      value: ((analytics == null ? void 0 : analytics.orderCount) ?? BigInt(orders.length)).toString(),
      icon: ShoppingCart,
      href: "/admin/orders"
    },
    {
      label: "Customers",
      value: customers.length.toString(),
      icon: Users,
      href: "/admin/customers"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GradientText,
        {
          className: "text-3xl font-bold block font-display",
          as: "h1",
          children: "Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Welcome back, here's your store overview." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map(({ label, value, icon: Icon, href }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "data-ocid": `admin.stat.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-5 hover-lift", glowing: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-2 rounded-2xl",
            style: { background: "rgba(0,255,136,0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold block", as: "div", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
    ] }) }, label)) }),
    pendingOrders > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlimeCard,
      {
        className: "p-4 border border-yellow-400/20",
        "data-ocid": "admin.pending_orders_alert",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-2 rounded-xl",
                style: { background: "rgba(255,200,0,0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 16, className: "text-yellow-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                pendingOrders,
                " pending order",
                pendingOrders !== 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Awaiting processing" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs px-4 py-2 rounded-xl font-medium",
              style: {
                background: "rgba(255,200,0,0.15)",
                color: "rgb(234,179,8)"
              },
              "data-ocid": "admin.view_pending_button",
              children: "View Orders"
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/admin/orders",
            className: "text-sm text-primary hover:underline",
            "data-ocid": "admin.all_orders_link",
            children: "View all →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        orders.slice(0, 5).map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlimeCard,
          {
            className: "p-4",
            "data-ocid": `admin.recent_order.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                  "Order #",
                  order.id.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : "",
                  " •",
                  " ",
                  new Date(
                    Number(order.createdAt) / 1e6
                  ).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "font-bold", children: [
                  "$",
                  (Number(order.totalAmount) / 100).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.status })
              ] })
            ] })
          },
          order.id.toString()
        )),
        orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SlimeCard,
          {
            className: "p-8 text-center",
            "data-ocid": "admin.orders_empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No orders yet." })
          }
        )
      ] })
    ] }),
    (analytics == null ? void 0 : analytics.topProducts) && analytics.topProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Top Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analytics.topProducts.slice(0, 5).map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlimeCard,
        {
          className: "p-4",
          "data-ocid": `admin.top_product.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                Number(p.totalSold),
                " sold"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "font-bold text-sm", children: [
              "$",
              (Number(p.revenue) / 100).toFixed(2)
            ] })
          ] })
        },
        p.productId.toString()
      )) })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
