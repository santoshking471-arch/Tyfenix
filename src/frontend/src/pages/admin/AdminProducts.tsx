import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Check,
  Package,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import GradientText from "../../components/GradientText";
import SlimeCard from "../../components/SlimeCard";
import { useAuth } from "../../contexts/AuthContext";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../../hooks/useBackend";
import { type Product, ProductCategory } from "../../types";

const CATEGORIES = Object.values(ProductCategory);

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: ProductCategory;
  stock: string;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: ProductCategory.Electronics,
  stock: "",
};

export default function AdminProducts() {
  const { isAdmin, isAuthenticated, login } = useAuth();
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

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

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      price: (Number(product.price) / 100).toFixed(2),
      imageUrl: product.imageUrl,
      category: product.category,
      stock: Number(product.stock).toString(),
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceCents = Math.round(Number.parseFloat(form.price) * 100);
    try {
      if (editing) {
        await updateProduct.mutateAsync({
          id: editing.id,
          name: form.name,
          description: form.description,
          price: BigInt(priceCents),
          imageUrl: form.imageUrl,
          category: form.category,
          stock: BigInt(Number.parseInt(form.stock)),
        });
        toast.success("Product updated!");
      } else {
        await createProduct.mutateAsync({
          name: form.name,
          description: form.description,
          price: BigInt(priceCents),
          imageUrl: form.imageUrl,
          category: form.category,
          stock: BigInt(Number.parseInt(form.stock)),
        });
        toast.success("Product created!");
      }
      setIsOpen(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save product",
      );
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted.");
      setDeleteConfirm(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        isActive: !product.isActive,
      });
      toast.success(
        product.isActive ? "Product deactivated" : "Product activated",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between float-entrance">
          <div>
            <GradientText className="text-2xl font-bold font-display" as="h1">
              Products
            </GradientText>
            <p className="text-muted-foreground text-sm mt-1">
              {products.length} total products
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="rounded-2xl font-semibold gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
              color: "#0a0e27",
            }}
            data-ocid="admin.create_product_button"
          >
            <Plus size={16} />
            Add Product
          </Button>
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
        ) : products.length === 0 ? (
          <SlimeCard
            className="p-16 text-center"
            data-ocid="admin.products_empty_state"
          >
            <Package size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add your first product to get started.
            </p>
            <Button
              onClick={openCreate}
              className="rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                color: "#0a0e27",
              }}
            >
              Add Product
            </Button>
          </SlimeCard>
        ) : (
          <div className="space-y-3">
            {products.map((product, idx) => (
              <SlimeCard
                key={product.id.toString()}
                className="p-4"
                data-ocid={`admin.product.${idx + 1}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl || "/assets/images/placeholder.svg"}
                    alt={product.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <Badge
                        className="text-xs rounded-xl shrink-0"
                        style={{
                          background: "rgba(0,255,136,0.1)",
                          color: "oklch(0.68 0.25 150)",
                        }}
                      >
                        {product.category}
                      </Badge>
                      {!product.isActive && (
                        <Badge
                          className="text-xs rounded-xl"
                          variant="destructive"
                        >
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${(Number(product.price) / 100).toFixed(2)} • Stock:{" "}
                      {Number(product.stock)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(product)}
                      className={`rounded-xl text-xs gap-1 ${
                        product.isActive
                          ? "text-muted-foreground hover:text-foreground"
                          : "text-primary hover:text-primary"
                      }`}
                      data-ocid={`admin.product_toggle.${idx + 1}`}
                    >
                      {product.isActive ? <X size={14} /> : <Check size={14} />}
                      {product.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(product)}
                      className="rounded-xl text-muted-foreground hover:text-foreground"
                      data-ocid={`admin.product_edit.${idx + 1}`}
                    >
                      <Pencil size={14} />
                    </Button>
                    {deleteConfirm === product.id ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-xl text-destructive hover:text-destructive"
                          data-ocid={`admin.product_confirm_delete.${idx + 1}`}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-xl text-muted-foreground"
                          data-ocid={`admin.product_cancel_delete.${idx + 1}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirm(product.id)}
                        className="rounded-xl text-muted-foreground hover:text-destructive"
                        data-ocid={`admin.product_delete.${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </SlimeCard>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-lg rounded-3xl border border-white/10"
          style={{
            background: "rgba(10,14,39,0.97)",
            backdropFilter: "blur(20px)",
          }}
          data-ocid="admin.product_dialog"
        >
          <DialogHeader>
            <DialogTitle>
              <GradientText className="text-xl font-bold">
                {editing ? "Edit Product" : "Add Product"}
              </GradientText>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Product Name
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="admin.product_name_input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Price ($)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  required
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="admin.product_price_input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Stock
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: e.target.value }))
                  }
                  required
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="admin.product_stock_input"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, category: v as ProductCategory }))
                  }
                >
                  <SelectTrigger
                    className="bg-white/5 border-white/10 rounded-2xl"
                    data-ocid="admin.product_category_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className="border border-white/10 rounded-2xl"
                    style={{
                      background: "rgba(10,14,39,0.97)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat} className="rounded-xl">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Image URL
                </Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  className="bg-white/5 border-white/10 rounded-2xl"
                  data-ocid="admin.product_image_input"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Description
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="bg-white/5 border-white/10 rounded-2xl resize-none"
                  data-ocid="admin.product_description_textarea"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl"
                data-ocid="admin.product_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending}
                className="rounded-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="admin.product_submit_button"
              >
                {createProduct.isPending || updateProduct.isPending
                  ? "Saving…"
                  : editing
                    ? "Save Changes"
                    : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
