import { e as useAuth, j as jsxRuntimeExports, b as ue } from "./index-C-xUBXvy.js";
import { a as Badge, B as Button } from "./button-YysK_q9R.js";
import { A as AdminLayout, C as CircleAlert, U as Users } from "./AdminLayout-BlEeEIeU.js";
import { S as SlimeCard, G as GradientText } from "./SlimeCard-DHGiJqq4.js";
import { h as useCustomers, m as useSetCustomerRole } from "./useBackend-kSR7reZp.js";
import { U as UserRole } from "./backend.d-WMp6k-0J.js";
import { S as Shield, U as User } from "./user-wbdDhPfK.js";
import "./package-DAmhj-Wa.js";
function AdminCustomers() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: customers = [], isLoading } = useCustomers();
  const setRole = useSetCustomerRole();
  const handleToggleRole = async (customerId, currentRole) => {
    const newRole = currentRole === UserRole.Admin ? UserRole.Customer : UserRole.Admin;
    try {
      await setRole.mutateAsync({ customerId, role: newRole });
      ue.success(`Role updated to ${newRole}`);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to update role");
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "float-entrance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold font-display", as: "h1", children: "Customers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        customers.length,
        " registered customer",
        customers.length !== 1 ? "s" : ""
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-card h-20 animate-pulse rounded-3xl bg-white/5"
      },
      i
    )) }) : customers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SlimeCard,
      {
        className: "p-16 text-center",
        "data-ocid": "admin.customers_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 48, className: "mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No customers yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: customers.map((customer, idx) => {
      var _a;
      const isAdmin2 = customer.role === UserRole.Admin || ((_a = customer.role) == null ? void 0 : _a.toString()) === "Admin";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlimeCard,
        {
          className: "p-4",
          "data-ocid": `admin.customer.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                style: {
                  background: isAdmin2 ? "rgba(183,0,255,0.15)" : "rgba(0,255,136,0.1)"
                },
                children: isAdmin2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-secondary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: customer.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "text-xs rounded-xl",
                    style: isAdmin2 ? {
                      background: "rgba(183,0,255,0.15)",
                      color: "oklch(0.62 0.28 270)"
                    } : {
                      background: "rgba(0,255,136,0.1)",
                      color: "oklch(0.68 0.25 150)"
                    },
                    children: isAdmin2 ? "Admin" : "Customer"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: customer.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Joined:",
                " ",
                new Date(
                  Number(customer.createdAt) / 1e6
                ).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleToggleRole(customer.id, customer.role),
                disabled: setRole.isPending,
                className: `rounded-xl text-xs gap-1 ${isAdmin2 ? "text-muted-foreground hover:text-destructive" : "text-muted-foreground hover:text-primary"}`,
                "data-ocid": `admin.customer_role_toggle.${idx + 1}`,
                children: isAdmin2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
                  "Demote"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 12 }),
                  "Make Admin"
                ] })
              }
            )
          ] })
        },
        customer.id.toString()
      );
    }) })
  ] }) });
}
export {
  AdminCustomers as default
};
