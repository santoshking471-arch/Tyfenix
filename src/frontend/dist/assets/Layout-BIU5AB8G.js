import { e as useAuth, a as useCart, r as reactExports, d as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-C-xUBXvy.js";
import { c as createLucideIcon, G as GradientText, a as ShoppingCart, X, M as Menu, A as AnimatedBlobs } from "./SlimeCard-DHGiJqq4.js";
import { B as Button, a as Badge } from "./button-YysK_q9R.js";
import { I as Input } from "./input-DdCZie-x.js";
import { S as Shield, U as User } from "./user-wbdDhPfK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Navbar() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    login,
    logout,
    customer
  } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
      setMobileOpen(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: "sticky top-0 z-50 border-b border-white/10",
      style: {
        background: "rgba(10,14,39,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "shrink-0", "data-ocid": "nav.logo_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-2xl font-bold", as: "span", children: "SlimeMart" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "form",
            {
              onSubmit: handleSearch,
              className: "hidden md:flex flex-1 max-w-md items-center gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    size: 16,
                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "Search products...",
                    className: "pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50 rounded-2xl",
                    "data-ocid": "nav.search_input"
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "data-ocid": "nav.admin_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground hover:text-primary gap-1.5 rounded-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 }),
                  "Admin"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", "data-ocid": "nav.cart_link", className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground hover:text-foreground rounded-xl relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18 }),
                  totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                        color: "#000"
                      },
                      "data-ocid": "nav.cart_badge",
                      children: totalItems > 99 ? "99+" : totalItems
                    }
                  )
                ]
              }
            ) }),
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", "data-ocid": "nav.account_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-foreground gap-1.5 rounded-xl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[80px] truncate text-sm", children: (customer == null ? void 0 : customer.name) ?? "Account" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: logout,
                  className: "text-muted-foreground hover:text-destructive rounded-xl text-xs",
                  "data-ocid": "nav.logout_button",
                  children: "Logout"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: login,
                disabled: isInitializing || isLoggingIn,
                size: "sm",
                className: "glow-border rounded-2xl px-4 font-semibold transition-smooth",
                style: {
                  background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27"
                },
                "data-ocid": "nav.login_button",
                children: isInitializing ? "Loading…" : isLoggingIn ? "Signing in…" : "Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/cart",
                className: "relative",
                "data-ocid": "nav.mobile_cart_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "rounded-xl text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18 }),
                      totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[10px]",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                            color: "#000"
                          },
                          children: totalItems
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "rounded-xl text-muted-foreground",
                onClick: () => setMobileOpen(!mobileOpen),
                "aria-label": "Toggle menu",
                "data-ocid": "nav.mobile_menu_button",
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
              }
            )
          ] })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden py-4 border-t border-white/10 space-y-3 float-entrance", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Search products...",
                className: "pl-8 bg-white/5 border-white/10 rounded-2xl text-sm",
                "data-ocid": "nav.mobile_search_input"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin",
                onClick: () => setMobileOpen(false),
                className: "flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors",
                "data-ocid": "nav.mobile_admin_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Admin Panel" })
                ]
              }
            ),
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/account",
                  onClick: () => setMobileOpen(false),
                  className: "flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors",
                  "data-ocid": "nav.mobile_account_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: (customer == null ? void 0 : customer.name) ?? "Account" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    logout();
                    setMobileOpen(false);
                  },
                  className: "flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors",
                  "data-ocid": "nav.mobile_logout_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Logout" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => {
                  login();
                  setMobileOpen(false);
                },
                disabled: isInitializing || isLoggingIn,
                className: "w-full rounded-2xl font-semibold",
                style: {
                  background: "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27"
                },
                "data-ocid": "nav.mobile_login_button",
                children: "Sign In"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Layout({ children, showFooter = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen relative overflow-x-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
      showFooter && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/10 mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xl font-bold glow-neon-primary font-display",
              style: { fontFamily: "var(--font-display)" },
              children: "SlimeMart"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "— Premium E-Commerce" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-sm text-center", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ".",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-primary transition-colors",
              children: "Built with love using caffeine.ai"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Layout as L
};
