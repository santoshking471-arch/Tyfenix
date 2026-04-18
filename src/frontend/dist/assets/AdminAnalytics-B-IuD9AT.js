import { e as useAuth, j as jsxRuntimeExports, S as Skeleton } from "./index-C-xUBXvy.js";
import { A as AdminLayout, C as CircleAlert } from "./AdminLayout-BlEeEIeU.js";
import { c as createLucideIcon, a as ShoppingCart, S as SlimeCard, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { f as useAnalytics } from "./useBackend-kSR7reZp.js";
import { P as Package } from "./package-DAmhj-Wa.js";
import { T as TrendingUp } from "./trending-up-w_40gXhw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function AdminAnalytics() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: analytics, isLoading } = useAnalytics();
  const metrics = analytics ? [
    {
      label: "Total Revenue",
      value: `$${(Number(analytics.totalRevenue) / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "rgba(0,255,136,0.15)",
      iconColor: "oklch(0.68 0.25 150)"
    },
    {
      label: "Total Orders",
      value: analytics.orderCount.toString(),
      icon: ShoppingCart,
      color: "rgba(183,0,255,0.15)",
      iconColor: "oklch(0.62 0.28 270)"
    },
    {
      label: "Top Products",
      value: analytics.topProducts.length.toString(),
      icon: Package,
      color: "rgba(0,136,255,0.15)",
      iconColor: "oklch(0.62 0.2 230)"
    },
    {
      label: "Avg Order Value",
      value: analytics.orderCount > 0n ? `$${(Number(analytics.totalRevenue) / Number(analytics.orderCount) / 100).toFixed(2)}` : "$0.00",
      icon: TrendingUp,
      color: "rgba(255,200,0,0.15)",
      iconColor: "oklch(0.75 0.18 80)"
    }
  ] : [];
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold font-display", as: "h1", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Store performance overview" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-3xl bg-white/5" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: metrics.map(
        ({ label, value, icon: Icon, color, iconColor }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SlimeCard,
          {
            className: "p-5",
            glowing: true,
            "data-ocid": `admin.analytics_metric.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-2xl flex items-center justify-center mb-3",
                  style: { background: color },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, style: { color: iconColor } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold block", as: "div", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: label })
            ]
          },
          label
        )
      ) }),
      analytics && analytics.topProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Top Performing Products" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analytics.topProducts.map((product, idx) => {
          const maxRevenue = Math.max(
            ...analytics.topProducts.map((p) => Number(p.revenue))
          );
          const pct = maxRevenue > 0 ? Math.round(
            Number(product.revenue) / maxRevenue * 100
          ) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SlimeCard,
            {
              className: "p-4",
              "data-ocid": `admin.top_product.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold shrink-0",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                          color: "#0a0e27"
                        },
                        children: idx + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: product.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "font-bold text-sm", children: [
                      "$",
                      (Number(product.revenue) / 100).toFixed(2)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      Number(product.totalSold),
                      " units"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-smooth",
                    style: {
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))"
                    }
                  }
                ) })
              ]
            },
            product.productId.toString()
          );
        }) })
      ] }),
      analytics && analytics.topProducts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SlimeCard,
        {
          className: "p-16 text-center",
          "data-ocid": "admin.analytics_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrendingUp,
              {
                size: 48,
                className: "mx-auto text-muted-foreground mb-4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No sales data yet. Start selling to see analytics." })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  AdminAnalytics as default
};
