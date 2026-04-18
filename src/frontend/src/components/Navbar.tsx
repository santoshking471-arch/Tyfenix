import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, Shield, ShoppingCart, User, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import GradientText from "./GradientText";

export default function Navbar() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    login,
    logout,
    customer,
  } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
      setMobileOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{
        background: "rgba(10,14,39,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="shrink-0" data-ocid="nav.logo_link">
            <GradientText className="text-2xl font-bold" as="span">
              SlimeMart
            </GradientText>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md items-center gap-2"
          >
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50 rounded-2xl"
                data-ocid="nav.search_input"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin && (
              <Link to="/admin" data-ocid="nav.admin_link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary gap-1.5 rounded-xl"
                >
                  <Shield size={16} />
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/cart" data-ocid="nav.cart_link" className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground rounded-xl relative"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                      color: "#000",
                    }}
                    data-ocid="nav.cart_badge"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/account" data-ocid="nav.account_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground gap-1.5 rounded-xl"
                  >
                    <User size={16} />
                    <span className="max-w-[80px] truncate text-sm">
                      {customer?.name ?? "Account"}
                    </span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-destructive rounded-xl text-xs"
                  data-ocid="nav.logout_button"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                size="sm"
                className="glow-border rounded-2xl px-4 font-semibold transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="nav.login_button"
              >
                {isInitializing
                  ? "Loading…"
                  : isLoggingIn
                    ? "Signing in…"
                    : "Sign In"}
              </Button>
            )}
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              to="/cart"
              className="relative"
              data-ocid="nav.mobile_cart_link"
            >
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl text-muted-foreground"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[10px]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                      color: "#000",
                    }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-xl text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3 float-entrance">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-8 bg-white/5 border-white/10 rounded-2xl text-sm"
                  data-ocid="nav.mobile_search_input"
                />
              </div>
            </form>
            <div className="flex flex-col gap-1">
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors"
                  data-ocid="nav.mobile_admin_link"
                >
                  <Shield size={16} />
                  <span className="text-sm">Admin Panel</span>
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors"
                    data-ocid="nav.mobile_account_link"
                  >
                    <User size={16} />
                    <span className="text-sm">
                      {customer?.name ?? "Account"}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    data-ocid="nav.mobile_logout_button"
                  >
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isInitializing || isLoggingIn}
                  className="w-full rounded-2xl font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                    color: "#0a0e27",
                  }}
                  data-ocid="nav.mobile_login_button"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
