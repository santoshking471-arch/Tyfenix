import { e as useAuth, j as jsxRuntimeExports, L as Link } from "./index-C-xUBXvy.js";
import { a as Badge } from "./button-YysK_q9R.js";
import { c as createLucideIcon, S as SlimeCard, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { L as Layout } from "./Layout-BIU5AB8G.js";
import { d as useMyOrders } from "./useBackend-kSR7reZp.js";
import { O as OrderStatus } from "./backend.d-WMp6k-0J.js";
import { P as Package } from "./package-DAmhj-Wa.js";
import { S as ShoppingBag } from "./shopping-bag-x08r9tY8.js";
import { C as CircleCheck } from "./circle-check-ITTQN9av.js";
import { T as Truck } from "./truck-DrLHHEJo.js";
import "./input-DdCZie-x.js";
import "./user-wbdDhPfK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const STATUS_CONFIG = {
  [OrderStatus.Pending]: {
    label: "Pending",
    color: "rgba(255,200,0,0.15)",
    icon: Clock
  },
  [OrderStatus.Confirmed]: {
    label: "Confirmed",
    color: "rgba(0,255,136,0.15)",
    icon: CircleCheck
  },
  [OrderStatus.Shipped]: {
    label: "Shipped",
    color: "rgba(0,136,255,0.15)",
    icon: Truck
  },
  [OrderStatus.Delivered]: {
    label: "Delivered",
    color: "rgba(0,255,136,0.2)",
    icon: CircleCheck
  },
  [OrderStatus.Cancelled]: {
    label: "Cancelled",
    color: "rgba(255,50,50,0.15)",
    icon: CircleX
  }
};
function OrdersPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: orders = [], isLoading } = useMyOrders();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SlimeCard, { className: "p-12", "data-ocid": "orders.auth_required", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 64, className: "mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Sign in to view orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Track and manage your orders after signing in." }),
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
          "data-ocid": "orders.login_button",
          children: "Sign In"
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display mb-8 float-entrance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { as: "span", children: "My Orders" }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-card h-28 animate-pulse rounded-3xl bg-white/5"
      },
      i
    )) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-16 text-center",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ShoppingBag,
            {
              size: 64,
              className: "mx-auto text-muted-foreground mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Start shopping to see your orders here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "px-8 py-3 rounded-2xl font-semibold",
              style: {
                background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27"
              },
              "data-ocid": "orders.shop_now_button",
              children: "Shop Now"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((order, idx) => {
      const config = STATUS_CONFIG[order.status];
      const StatusIcon = config.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SlimeCard,
        {
          className: "p-5",
          "data-ocid": `orders.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
                    "Order #",
                    order.id.toString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: "rounded-xl text-xs flex items-center gap-1",
                      style: {
                        background: config.color,
                        color: order.status === OrderStatus.Cancelled ? "oklch(0.65 0.22 25)" : "oklch(0.68 0.25 150)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { size: 10 }),
                        config.label
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                  Number(order.createdAt) / 1e6
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "text-lg font-bold", children: [
                  "$",
                  (Number(order.totalAmount) / 100).toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-white/10 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "Ship to:",
                " "
              ] }),
              order.shippingAddress.street,
              ", ",
              order.shippingAddress.city,
              ", ",
              order.shippingAddress.country
            ] })
          ]
        },
        order.id.toString()
      );
    }) })
  ] }) });
}
export {
  OrdersPage as default
};
