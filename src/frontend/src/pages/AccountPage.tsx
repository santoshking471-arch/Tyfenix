import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Package, Settings, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useAuth } from "../contexts/AuthContext";
import { useMyOrders, useUpdateProfile } from "../hooks/useBackend";
import { OrderStatus } from "../types";

export default function AccountPage() {
  const { isAuthenticated, customer, login, registerCustomer, refreshProfile } =
    useAuth();
  const updateProfile = useUpdateProfile();
  const { data: orders = [] } = useMyOrders();
  const [editName, setEditName] = useState(customer?.name ?? "");
  const [editEmail, setEditEmail] = useState(customer?.email ?? "");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [registering, setRegistering] = useState(false);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <SlimeCard className="p-12" data-ocid="account.auth_required">
            <User size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>
            <p className="text-muted-foreground mb-6">
              Manage your profile, orders, and addresses.
            </p>
            <Button
              onClick={login}
              className="rounded-2xl font-semibold px-8 pulsing-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27",
              }}
              data-ocid="account.login_button"
            >
              Sign In
            </Button>
          </SlimeCard>
        </div>
      </Layout>
    );
  }

  if (!customer) {
    // Needs registration
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!regName.trim() || !regEmail.trim()) return;
      setRegistering(true);
      try {
        await registerCustomer(regName, regEmail);
        toast.success("Account created!");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setRegistering(false);
      }
    };

    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-24">
          <SlimeCard
            className="p-8"
            glowing
            data-ocid="account.registration_form"
          >
            <GradientText className="text-2xl font-bold block mb-2" as="h2">
              Complete Your Profile
            </GradientText>
            <p className="text-muted-foreground text-sm mb-6">
              Set up your account to start shopping.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs mb-1.5 block">
                  Full Name
                </Label>
                <Input
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Alex Johnson"
                  required
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="account.name_input"
                />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs mb-1.5 block">
                  Email
                </Label>
                <Input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="account.email_input"
                />
              </div>
              <Button
                type="submit"
                disabled={registering}
                className="w-full rounded-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="account.register_submit_button"
              >
                {registering ? "Creating Account…" : "Create Account"}
              </Button>
            </form>
          </SlimeCard>
        </div>
      </Layout>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({ name: editName, email: editEmail });
      await refreshProfile();
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8 float-entrance">
          <GradientText
            className="text-3xl font-bold block font-display"
            as="h1"
          >
            My Account
          </GradientText>
          <p className="text-muted-foreground mt-1">
            Welcome back, {customer.name}
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList
            className="mb-6 rounded-2xl p-1 h-auto gap-1"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {[
              { value: "profile", icon: User, label: "Profile" },
              { value: "orders", icon: Package, label: "Orders" },
              { value: "addresses", icon: MapPin, label: "Addresses" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-xl gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-ocid={`account.${value}_tab`}
              >
                <Icon size={14} />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile">
            <SlimeCard className="p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Settings size={18} className="text-primary" />
                Profile Settings
              </h2>
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-4 max-w-md"
              >
                <div>
                  <Label className="text-muted-foreground text-xs mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-2xl"
                    data-ocid="account.edit_name_input"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs mb-1.5 block">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-2xl"
                    data-ocid="account.edit_email_input"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="rounded-2xl font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                    color: "#0a0e27",
                  }}
                  data-ocid="account.save_profile_button"
                >
                  {updateProfile.isPending ? "Saving…" : "Save Changes"}
                </Button>
              </form>
            </SlimeCard>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-3">
              {orders.length === 0 ? (
                <SlimeCard
                  className="p-12 text-center"
                  data-ocid="account.orders_empty_state"
                >
                  <Package
                    size={40}
                    className="mx-auto text-muted-foreground mb-3"
                  />
                  <p className="text-muted-foreground">No orders yet.</p>
                </SlimeCard>
              ) : (
                orders.map((order, idx) => (
                  <SlimeCard
                    key={order.id.toString()}
                    className="p-4"
                    data-ocid={`account.order.${idx + 1}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-sm">
                          Order #{order.id.toString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            Number(order.createdAt) / 1_000_000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <GradientText className="font-bold">
                          ${(Number(order.totalAmount) / 100).toFixed(2)}
                        </GradientText>
                        <p className="text-xs text-muted-foreground">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </SlimeCard>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <SlimeCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-primary" />
                <h2 className="text-lg font-semibold">Saved Addresses</h2>
              </div>
              {customer.addresses.length === 0 ? (
                <div
                  className="text-center py-8"
                  data-ocid="account.addresses_empty_state"
                >
                  <MapPin
                    size={40}
                    className="mx-auto text-muted-foreground mb-3"
                  />
                  <p className="text-muted-foreground text-sm">
                    No saved addresses. Add one at checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customer.addresses.map((addr, i) => (
                    <div
                      key={`${addr.street}-${addr.city}-${i}`}
                      className="glass-card p-4 rounded-2xl text-sm"
                      data-ocid={`account.address.${i + 1}`}
                    >
                      <p className="text-foreground">{addr.street}</p>
                      <p className="text-muted-foreground">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-muted-foreground">{addr.country}</p>
                    </div>
                  ))}
                </div>
              )}
            </SlimeCard>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
