import { c as createLucideIcon, A as AnimatedBlobs, X, M as Menu, G as GradientText, a as ShoppingCart } from "./SlimeCard-DHGiJqq4.js";
import { r as reactExports, e as useAuth, l as useRouterState, j as jsxRuntimeExports, L as Link } from "./index-C-xUBXvy.js";
import { P as Package } from "./package-DAmhj-Wa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: ChartColumn }
];
function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const { logout } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const NavContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-white/10 flex items-center justify-between", children: [
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-xl font-bold font-display", children: "SlimeMart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Admin Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCollapsed(!collapsed),
          className: "hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground",
          "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
          children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 py-4 space-y-1 px-2 overflow-y-auto", children: adminNavItems.map((item) => {
      const Icon = item.icon;
      const isActive = currentPath === item.href || item.href !== "/admin" && currentPath.startsWith(item.href);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.href,
          onClick: () => setMobileOpen(false),
          "data-ocid": `admin.nav.${item.label.toLowerCase()}_link`,
          className: `flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-smooth group ${isActive ? "glow-border text-foreground" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                size: 18,
                className: `shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`
              }
            ),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: item.label })
          ]
        },
        item.href
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-white/10 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "admin.nav.storefront_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18, className: "shrink-0" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "View Store" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: logout,
          className: "w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth",
          "data-ocid": "admin.nav.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18, className: "shrink-0" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Logout" })
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen relative overflow-x-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: `hidden lg:flex flex-col glass-card rounded-none border-r border-white/10 transition-smooth ${collapsed ? "w-16" : "w-64"}`,
          style: { backdropFilter: "blur(20px)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavContent, {})
        }
      ),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
            onClick: () => setMobileOpen(false),
            onKeyUp: (e) => e.key === "Escape" && setMobileOpen(false),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "aside",
          {
            className: "absolute left-0 top-0 bottom-0 w-64 glass-card rounded-none border-r border-white/10",
            style: { backdropFilter: "blur(20px)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavContent, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10",
            style: {
              background: "rgba(10,14,39,0.8)",
              backdropFilter: "blur(20px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setMobileOpen(true),
                  className: "p-2 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground",
                  "aria-label": "Open menu",
                  "data-ocid": "admin.mobile_menu_button",
                  children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GradientText, { className: "text-lg font-bold font-display", children: "SlimeMart Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 overflow-auto", children })
      ] })
    ] })
  ] });
}
export {
  AdminLayout as A,
  CircleAlert as C,
  Users as U
};
