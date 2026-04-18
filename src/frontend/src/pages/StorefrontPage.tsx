import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useSearch } from "@tanstack/react-router";
import { ChevronDown, Filter, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import GradientText from "../components/GradientText";
import Layout from "../components/Layout";
import SlimeCard from "../components/SlimeCard";
import { useCart } from "../contexts/CartContext";
import { useProducts, useSearchProducts } from "../hooks/useBackend";
import { ProductCategory } from "../types";

const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: "All Products", value: null },
  { label: "Electronics", value: ProductCategory.Electronics },
  { label: "Clothing", value: ProductCategory.Clothing },
  { label: "Beauty", value: ProductCategory.Beauty },
  { label: "Home & Garden", value: ProductCategory.HomeGarden },
  { label: "Sports", value: ProductCategory.Sports },
  { label: "Books", value: ProductCategory.Books },
  { label: "Food", value: ProductCategory.Food },
  { label: "Other", value: ProductCategory.Other },
];

export default function StorefrontPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const searchParams = useSearch({ strict: false }) as { q?: string };
  const searchTerm = searchParams.q ?? "";

  const { data: allProducts = [], isLoading } = useProducts(selectedCategory);
  const { data: searchResults = [], isLoading: searchLoading } =
    useSearchProducts(searchTerm);
  const { addItem } = useCart();

  const products = searchTerm ? searchResults : allProducts;
  const loading = searchTerm ? searchLoading : isLoading;

  const handleAddToCart = async (productId: bigint, name: string) => {
    await addItem(productId, 1n);
    toast.success(`${name} added to cart!`, {
      icon: "🛒",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto float-entrance">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-6">
            <Sparkles size={14} />
            <span>Premium Shopping Experience</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display">
            <GradientText as="span">Discover</GradientText>
            <br />
            <span className="text-foreground">Amazing Products</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Shop the finest collection curated for you — from cutting-edge
            electronics to luxurious beauty essentials.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/cart">
              <Button
                size="lg"
                className="rounded-2xl px-8 font-semibold pulsing-glow"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                  color: "#0a0e27",
                }}
                data-ocid="hero.shop_now_button"
              >
                <ShoppingBag size={18} className="mr-2" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                data-ocid={`filter.${cat.label.replace(/\s+/g, "_").toLowerCase()}_tab`}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-smooth ${
                  selectedCategory === cat.value
                    ? "text-background font-semibold"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
                style={
                  selectedCategory === cat.value
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                      }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 glass-card rounded-2xl text-muted-foreground"
                data-ocid="filter.more_categories_button"
              >
                <Filter size={14} />
                More
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border border-white/10 rounded-2xl"
              style={{
                background: "rgba(10,14,39,0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              {CATEGORIES.slice(5).map((cat) => (
                <DropdownMenuItem
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="rounded-xl text-muted-foreground focus:text-foreground focus:bg-white/10 cursor-pointer"
                  data-ocid={`filter.${cat.label.replace(/\s+/g, "_").toLowerCase()}_item`}
                >
                  {cat.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {searchTerm && (
          <p className="text-muted-foreground mb-6 text-sm">
            Search results for{" "}
            <span className="text-foreground font-medium">"{searchTerm}"</span>{" "}
            — {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((key) => (
              <div
                key={key}
                className="glass-card rounded-3xl h-72 animate-pulse bg-white/5"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            className="glass-card p-16 text-center rounded-3xl"
            data-ocid="products.empty_state"
          >
            <ShoppingBag
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Try a different search term."
                : "No products available in this category yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <SlimeCard
                key={product.id.toString()}
                hoverable
                glowing
                className="flex flex-col overflow-hidden p-0"
                data-ocid={`products.item.${idx + 1}`}
              >
                <Link
                  to="/product/$id"
                  params={{ id: product.id.toString() }}
                  className="block"
                >
                  <div className="aspect-square overflow-hidden rounded-t-3xl">
                    <img
                      src={product.imageUrl || "/assets/images/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder.svg";
                      }}
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to="/product/$id"
                      params={{ id: product.id.toString() }}
                      className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm leading-snug"
                    >
                      {product.name}
                    </Link>
                    <Badge
                      className="shrink-0 text-xs rounded-xl"
                      style={{
                        background: "rgba(0,255,136,0.15)",
                        color: "oklch(0.68 0.25 150)",
                      }}
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs text-muted-foreground">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Number(product.stock)} in stock)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <GradientText className="text-lg font-bold">
                      ${(Number(product.price) / 100).toFixed(2)}
                    </GradientText>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={product.stock === 0n || !product.isActive}
                      className="rounded-xl text-xs font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
                        color: "#0a0e27",
                      }}
                      data-ocid={`products.add_to_cart.${idx + 1}`}
                    >
                      {product.stock === 0n ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </SlimeCard>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
