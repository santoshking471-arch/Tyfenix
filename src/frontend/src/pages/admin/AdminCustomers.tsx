import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Shield, User, Users } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import GradientText from "../../components/GradientText";
import SlimeCard from "../../components/SlimeCard";
import { useAuth } from "../../contexts/AuthContext";
import { useCustomers, useSetCustomerRole } from "../../hooks/useBackend";
import { UserRole } from "../../types";

export default function AdminCustomers() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: customers = [], isLoading } = useCustomers();
  const setRole = useSetCustomerRole();

  const handleToggleRole = async (
    customerId: import("../../types").UserId,
    currentRole: UserRole,
  ) => {
    const newRole =
      currentRole === UserRole.Admin ? UserRole.Customer : UserRole.Admin;
    try {
      await setRole.mutateAsync({ customerId, role: newRole });
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    }
  };

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
      <div className="space-y-6">
        <div className="float-entrance">
          <GradientText className="text-2xl font-bold font-display" as="h1">
            Customers
          </GradientText>
          <p className="text-muted-foreground text-sm mt-1">
            {customers.length} registered customer
            {customers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass-card h-20 animate-pulse rounded-3xl bg-white/5"
              />
            ))}
          </div>
        ) : customers.length === 0 ? (
          <SlimeCard
            className="p-16 text-center"
            data-ocid="admin.customers_empty_state"
          >
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No customers yet.</p>
          </SlimeCard>
        ) : (
          <div className="space-y-3">
            {customers.map((customer, idx) => {
              const isAdmin =
                customer.role === UserRole.Admin ||
                customer.role?.toString() === "Admin";
              return (
                <SlimeCard
                  key={customer.id.toString()}
                  className="p-4"
                  data-ocid={`admin.customer.${idx + 1}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: isAdmin
                          ? "rgba(183,0,255,0.15)"
                          : "rgba(0,255,136,0.1)",
                      }}
                    >
                      {isAdmin ? (
                        <Shield size={18} className="text-secondary" />
                      ) : (
                        <User size={18} className="text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{customer.name}</p>
                        <Badge
                          className="text-xs rounded-xl"
                          style={
                            isAdmin
                              ? {
                                  background: "rgba(183,0,255,0.15)",
                                  color: "oklch(0.62 0.28 270)",
                                }
                              : {
                                  background: "rgba(0,255,136,0.1)",
                                  color: "oklch(0.68 0.25 150)",
                                }
                          }
                        >
                          {isAdmin ? "Admin" : "Customer"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {customer.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined:{" "}
                        {new Date(
                          Number(customer.createdAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleToggleRole(customer.id, customer.role)
                      }
                      disabled={setRole.isPending}
                      className={`rounded-xl text-xs gap-1 ${
                        isAdmin
                          ? "text-muted-foreground hover:text-destructive"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      data-ocid={`admin.customer_role_toggle.${idx + 1}`}
                    >
                      {isAdmin ? (
                        <>
                          <User size={12} />
                          Demote
                        </>
                      ) : (
                        <>
                          <Shield size={12} />
                          Make Admin
                        </>
                      )}
                    </Button>
                  </div>
                </SlimeCard>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
