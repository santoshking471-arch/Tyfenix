import { e as useAuth, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-C-xUBXvy.js";
import { a as Badge, B as Button } from "./button-YysK_q9R.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-5qq_wYLR.js";
import { A as AdminLayout, C as CircleAlert } from "./AdminLayout-BlEeEIeU.js";
import { S as SlimeCard, G as GradientText, a as ShoppingCart } from "./SlimeCard-DHGiJqq4.js";
import { g as useAllOrders, l as useUpdateOrderStatus } from "./useBackend-kSR7reZp.js";
import { O as OrderStatus } from "./backend.d-WMp6k-0J.js";
import { C as ChevronDown } from "./chevron-down-BnEBQWkT.js";
import "./index-2eVEModj.js";
import "./index-DfrNwFal.js";
import "./package-DAmhj-Wa.js";
const STATUS_OPTIONS = Object.values(OrderStatus);
const STATUS_COLORS = {
  [OrderStatus.Pending]: "rgba(255,200,0,0.15)",
  [OrderStatus.Confirmed]: "rgba(0,255,136,0.15)",
  [OrderStatus.Shipped]: "rgba(0,136,255,0.15)",
  [OrderStatus.Delivered]: "rgba(0,255,136,0.2)",
  [OrderStatus.Cancelled]: "rgba(255,50,50,0.15)"
};
const STATUS_TEXT = {
  [OrderStatus.Pending]: "oklch(0.75 0.18 80)",
  [OrderStatus.Confirmed]: "oklch(0.68 0.25 150)",
  [OrderStatus.Shipped]: "oklch(0.62 0.2 230)",
  [OrderStatus.Delivered]: "oklch(0.68 0.25 150)",
  [OrderStatus.Cancelled]: "oklch(0.65 0.22 25)"
};
function AdminOrders() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: orders = [], isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const filtered = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      ue.success(`Order status updated to ${status}`);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update status"
      );
    }
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold font-display", as: "h1", children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          filtered.length,
          " order",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["all", ...STATUS_OPTIONS].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterStatus(s),
          "data-ocid": `admin.orders.filter_${s}_tab`,
          className: `px-3 py-1.5 rounded-xl text-xs font-medium transition-smooth ${filterStatus === s ? "text-background" : "glass-card text-muted-foreground hover:text-foreground"}`,
          style: filterStatus === s ? {
            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))"
          } : {},
          children: s === "all" ? "All" : s
        },
        s
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-card h-24 animate-pulse rounded-3xl bg-white/5"
      },
      i
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-16 text-center",
        "data-ocid": "admin.orders_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ShoppingCart,
            {
              size: 48,
              className: "mx-auto text-muted-foreground mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No orders found." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlimeCard,
      {
        className: "p-5",
        "data-ocid": `admin.order.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
                "Order #",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "rounded-xl text-xs",
                  style: {
                    background: STATUS_COLORS[order.status],
                    color: STATUS_TEXT[order.status]
                  },
                  children: order.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
              Number(order.createdAt) / 1e6
            ).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              order.items.length,
              " item",
              order.items.length !== 1 ? "s" : "",
              " •",
              " ",
              order.shippingAddress.city,
              ",",
              " ",
              order.shippingAddress.country
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientText, { className: "font-bold", children: [
              "$",
              (Number(order.totalAmount) / 100).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "gap-1 text-xs rounded-xl glass-card",
                  "data-ocid": `admin.order_status_dropdown.${idx + 1}`,
                  children: [
                    "Update Status",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12 })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropdownMenuContent,
                {
                  className: "border border-white/10 rounded-2xl",
                  style: {
                    background: "rgba(10,14,39,0.97)",
                    backdropFilter: "blur(20px)"
                  },
                  children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownMenuItem,
                    {
                      onClick: () => handleStatusChange(order.id, s),
                      className: "rounded-xl cursor-pointer text-muted-foreground focus:text-foreground focus:bg-white/10",
                      disabled: s === order.status,
                      "data-ocid": `admin.order_status_${s.toLowerCase()}.${idx + 1}`,
                      children: s
                    },
                    s
                  ))
                }
              )
            ] })
          ] })
        ] })
      },
      order.id.toString()
    )) })
  ] }) });
}
export {
  AdminOrders as default
};
