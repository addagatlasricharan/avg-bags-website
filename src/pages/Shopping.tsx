import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ShoppingBag, ArrowRight } from "lucide-react";
import { allProducts } from "@/data/products";

const categories = [
  { value: "all",    label: "All Products" },
  { value: "handle", label: "Loop Handle" },
  { value: "dcut",   label: "D-Cut" },
  { value: "box",    label: "Box Type" },
];

// Color dot helper — map hex to inline style
const ColorDot = ({ bg }: { bg: string }) => (
  <div
    className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
    style={{ backgroundColor: bg }}
  />
);

export default function Shopping() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchCat = filter === "all" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: product.moq, image: product.img });
    toast({ title: "Added to Cart", description: `${product.moq.toLocaleString()} × ${product.name} added.` });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-28 pb-14 bg-[#0f1f14] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-semibold mb-4 uppercase tracking-widest">
                Product Catalog
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                Shop Non-Woven Bags
              </h1>
              <p className="text-lg text-white/70 max-w-xl">
                Premium custom-printed bags in bulk. Click any product to see full specs, GSM options, and pricing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="relative w-full md:w-80"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search bags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-secondary/60 transition-colors"
              />
            </motion.div>
          </div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8 items-center"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                data-testid={`button-filter-${cat.value}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  filter === cat.value
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-auto text-white/50 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              {filtered.length} products
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No products match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  key={product.id}
                  data-testid={`card-product-${product.id}`}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="group bg-card rounded-2xl overflow-hidden border border-border/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-400 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-muted/20 p-6 flex items-center justify-center">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          MOQ: {product.moq.toLocaleString()} pcs
                        </div>
                        {/* Color dots */}
                        <div className="absolute bottom-3 right-3 flex gap-1 bg-white/80 backdrop-blur p-1.5 rounded-full shadow-sm border border-border/30">
                          {product.colors.slice(0, 4).map((c, idx) => (
                            <ColorDot key={idx} bg={c.bg} />
                          ))}
                        </div>
                        {/* View details overlay */}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Price — most prominent */}
                        <div className="flex items-baseline gap-1 mb-1.5">
                          <span className="text-2xl font-serif font-bold text-primary">₹{product.price}</span>
                          <span className="text-sm text-muted-foreground font-normal">/ piece</span>
                        </div>

                        <h3 className="font-bold text-base text-foreground mb-1 leading-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.tagline}</p>

                        <div className="grid grid-cols-2 gap-y-1 text-xs mb-4 flex-1">
                          <span className="text-muted-foreground">Type</span>
                          <span className="font-medium text-right text-foreground">{product.bagType}</span>
                          <span className="text-muted-foreground">GSM</span>
                          <span className="font-medium text-right text-foreground">60–100g</span>
                          <span className="text-muted-foreground">Print</span>
                          <span className="font-medium text-right text-secondary">Custom</span>
                        </div>

                        <div className="flex flex-col gap-2 pt-4 border-t border-border/40 mt-auto">
                          <Button
                            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-sm gap-1.5"
                            data-testid={`button-view-product-${product.id}`}
                          >
                            View Full Details <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={(e) => handleAddToCart(product, e)}
                            data-testid={`button-add-to-cart-${product.id}`}
                            className="w-full rounded-xl border-primary/25 hover:bg-primary/5 text-primary text-sm"
                          >
                            Quick Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-[#0f1f14] text-white rounded-3xl p-10 text-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">Need a custom size or design?</h3>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">We manufacture bags to any specification. Share your requirements and get a quote within 24 hours.</p>
              <Link href="/quote">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 rounded-full text-base">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-border/40 px-4 py-3 flex gap-3 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1 text-sm text-muted-foreground font-medium">Min. 200 pcs · Pan-India delivery</div>
        <Link href="/quote">
          <Button size="sm" className="bg-primary text-white rounded-xl px-5 shrink-0">
            Get Quote
          </Button>
        </Link>
      </div>
    </div>
  );
}
