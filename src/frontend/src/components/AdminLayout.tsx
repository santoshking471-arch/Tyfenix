import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AnimatedBlobs from "./AnimatedBlobs";
import GradientText from "./GradientText";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const NavContent = () => (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <Link to="/" className="block">
            <GradientText className="text-xl font-bold font-display">
              SlimeMart
            </GradientText>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.href ||
            (item.href !== "/admin" && currentPath.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              data-ocid={`admin.nav.${item.label.toLowerCase()}_link`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-smooth group ${
                isActive
                  ? "glow-border text-foreground"
                  : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="admin.nav.storefront_link"
        >
          <Package size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">View Store</span>}
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth"
          data-ocid="admin.nav.logout_button"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      <AnimatedBlobs />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col glass-card rounded-none border-r border-white/10 transition-smooth ${
            collapsed ? "w-16" : "w-64"
          }`}
          style={{ backdropFilter: "blur(20px)" }}
        >
          <NavContent />
        </aside>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              onKeyUp={(e) => e.key === "Escape" && setMobileOpen(false)}
              role="presentation"
            />
            <aside
              className="absolute left-0 top-0 bottom-0 w-64 glass-card rounded-none border-r border-white/10"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <NavContent />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header
            className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10"
            style={{
              background: "rgba(10,14,39,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground"
              aria-label="Open menu"
              data-ocid="admin.mobile_menu_button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <GradientText className="text-lg font-bold font-display">
              SlimeMart Admin
            </GradientText>
            <div className="w-8" />
          </header>

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
