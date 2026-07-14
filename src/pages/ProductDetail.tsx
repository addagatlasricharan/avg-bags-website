import React, { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getProduct, getRelated } from "@/data/products";
import {
  ChevronRight, Minus, Plus, ShoppingCart, Star,
  Truck, Shield, RefreshCcw, Zap, CheckCircle, ArrowLeft,
} from "lucide-react";

// WhatsApp SVG icon
const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const bulkTiers = [
  { min: 1,     max: 999,   discount: 0,  label: "Standard" },
  { min: 1000,  max: 4999,  discount: 5,  label: "Bulk" },
  { min: 5000,  max: 9999,  discount: 10, label: "Wholesale" },
  { min: 10000, max: Infinity, discount: 15, label: "Factory" },
];

function getDiscount(qty: number) {
  return bulkTiers.find((t) => qty >= t.min && qty <= t.max) ?? bulkTiers[0];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id ?? "");
  const related = getRelated(id ?? "", product?.category ?? "");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedGsm, setSelectedGsm] = useState(1); // index into gsmOptions
  const [selectedPrint, setSelectedPrint] = useState(1);
  const [selectedHandle, setSelectedHandle] = useState(0);
  const [quantity, setQuantity] = useState(product?.moq ?? 500);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [imgZoomed, setImgZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(product.moq);
      setSelectedColor(0);
      setSelectedSize(Math.min(1, product.sizes.length - 1));
      setSelectedGsm(1);
      setSelectedPrint(1);
      setSelectedHandle(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-6 pt-32">
          <h2 className="text-2xl font-bold text-foreground">Product not found</h2>
          <Link href="/shopping">
            <Button>Back to Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const gsmOpt = product.gsmOptions[selectedGsm];
  const unitPrice = parseFloat((product.price * gsmOpt.multiplier).toFixed(2));
  const tier = getDiscount(quantity);
  const discountedUnit = parseFloat((unitPrice * (1 - tier.discount / 100)).toFixed(2));
  const totalPrice = parseFloat((discountedUnit * quantity).toFixed(2));

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: discountedUnit, quantity, image: product.img });
    toast({ title: "Added to Cart", description: `${quantity.toLocaleString()} × ${product.name} added.` });
  };

  const whatsappMsg = encodeURIComponent(
    `Hi AVG Bags! I'm interested in ordering:\n\n` +
    `Product: ${product.name}\n` +
    `GSM: ${gsmOpt.gsm}g\n` +
    `Size: ${product.sizes[selectedSize]?.dims}\n` +
    `Color: ${product.colors[selectedColor]?.name}\n` +
    `Print: ${product.printOptions[selectedPrint]}\n` +
    `Quantity: ${quantity.toLocaleString()} pcs\n` +
    `Estimated Total: ₹${totalPrice.toLocaleString()}\n\n` +
    `Please share pricing and delivery timeline.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pt-4 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shopping" className="hover:text-primary transition-colors">Shopping</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Back button (mobile) */}
          <Link href="/shopping" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 md:hidden transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to catalog
          </Link>

          {/* Main 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

            {/* LEFT: Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              {/* Main image */}
              <div
                className={`relative bg-muted/20 rounded-3xl overflow-hidden border border-border/40 cursor-zoom-in ${imgZoomed ? "cursor-zoom-out" : ""}`}
                onClick={() => setImgZoomed(!imgZoomed)}
              >
                <div className="aspect-square flex items-center justify-center p-8 md:p-12">
                  <motion.img
                    src={product.img}
                    alt={product.name}
                    className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ${imgZoomed ? "scale-125" : "scale-100 hover:scale-105"}`}
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {product.bagType}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white/80 backdrop-blur px-2 py-1 rounded-lg">
                  Click to zoom
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: <Truck className="w-4 h-4" />, text: "Pan-India Delivery" },
                  { icon: <Shield className="w-4 h-4" />, text: "Quality Guaranteed" },
                  { icon: <RefreshCcw className="w-4 h-4" />, text: "100% Recyclable" },
                  { icon: <Zap className="w-4 h-4" />, text: "5–14 Day Turnaround" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2.5 text-sm text-muted-foreground border border-border/30">
                    <span className="text-primary">{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Details & Configurator */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                    {product.bagType}
                  </span>
                  <div className="flex items-center gap-1 text-secondary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-xs text-muted-foreground ml-1">(48 reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-base">{product.tagline}</p>
              </div>

              {/* Live Price Display */}
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-serif font-bold text-primary">₹{discountedUnit.toFixed(2)}</span>
                  {tier.discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">₹{unitPrice.toFixed(2)}</span>
                  )}
                  <span className="text-sm text-muted-foreground">/ piece</span>
                  {tier.discount > 0 && (
                    <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      -{tier.discount}% {tier.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total for {quantity.toLocaleString()} pcs</span>
                  <span className="font-bold text-foreground text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Min. order: <strong>{product.moq.toLocaleString()} pcs</strong>
                </p>
              </div>

              {/* ── Configurators ── */}

              {/* Color */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  Color
                  <span className="font-normal text-muted-foreground">— {product.colors[selectedColor]?.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      data-testid={`button-color-${i}`}
                      title={c.name}
                      className={`w-9 h-9 rounded-full border-2 transition-all shadow-sm hover:scale-110 ${
                        selectedColor === i ? "border-primary scale-110 ring-2 ring-primary ring-offset-2" : "border-border/40"
                      }`}
                      style={{ backgroundColor: c.bg }}
                    />
                  ))}
                </div>
              </div>

              {/* GSM */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                  GSM (Fabric Weight)
                  <span className="text-xs font-normal text-muted-foreground">Higher GSM = Stronger & Heavier</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.gsmOptions.map((g, i) => (
                    <button
                      key={g.gsm}
                      onClick={() => setSelectedGsm(i)}
                      data-testid={`button-gsm-${g.gsm}`}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        selectedGsm === i
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-background border-border/50 text-foreground hover:border-primary/40"
                      }`}
                    >
                      {g.gsm}g
                      {i > 0 && (
                        <span className={`ml-1 text-xs ${selectedGsm === i ? "text-white/70" : "text-muted-foreground"}`}>
                          +{Math.round((g.multiplier - 1) * 100)}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Size — <span className="font-normal text-muted-foreground">{product.sizes[selectedSize]?.dims}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(i)}
                      data-testid={`button-size-${i}`}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        selectedSize === i
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-background border-border/50 text-foreground hover:border-primary/40"
                      }`}
                    >
                      {s.label}
                      <span className={`ml-1.5 text-xs font-normal ${selectedSize === i ? "text-white/70" : "text-muted-foreground"}`}>
                        {s.dims}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Type */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">Print Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.printOptions.map((p, i) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrint(i)}
                      data-testid={`button-print-${i}`}
                      className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                        selectedPrint === i
                          ? "bg-primary text-white border-primary"
                          : "bg-background border-border/50 text-foreground hover:border-primary/40"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Handle Type */}
              {product.handleOptions.length > 1 && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Handle Type</label>
                  <div className="flex flex-wrap gap-2">
                    {product.handleOptions.map((h, i) => (
                      <button
                        key={h}
                        onClick={() => setSelectedHandle(i)}
                        data-testid={`button-handle-${i}`}
                        className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                          selectedHandle === i
                            ? "bg-primary text-white border-primary"
                            : "bg-background border-border/50 text-foreground hover:border-primary/40"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                  Quantity (pieces)
                  <span className="text-xs font-normal text-muted-foreground">Min: {product.moq.toLocaleString()} pcs</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(product.moq, q - (q > 1000 ? 500 : 100)))}
                    data-testid="button-qty-decrease"
                    className="w-11 h-11 rounded-xl border border-border/60 flex items-center justify-center hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.moq}
                    step={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                    data-testid="input-quantity"
                    className="flex-1 text-center border border-border/60 rounded-xl py-2.5 text-lg font-bold text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + (q >= 1000 ? 500 : 100))}
                    data-testid="button-qty-increase"
                    className="w-11 h-11 rounded-xl border border-border/60 flex items-center justify-center hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-base font-semibold gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart — ₹{totalPrice.toLocaleString()}
                </Button>
                <a
                  href={`https://wa.me/917780524290?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-whatsapp-inquiry"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fba59] text-white rounded-xl py-3.5 text-base font-semibold transition-colors"
                >
                  <WaIcon />
                  Inquire on WhatsApp
                </a>
                <Link href="/quote" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl border-primary/30 text-primary hover:bg-primary/5 py-5"
                  >
                    Request Formal Quote
                  </Button>
                </Link>
              </div>

              {/* Accordion Specs */}
              <div className="border border-border/40 rounded-2xl overflow-hidden mt-2">
                {[
                  {
                    key: "description",
                    title: "Description & Uses",
                    content: (
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        <div>
                          <p className="font-semibold text-foreground mb-2 text-sm">Best for:</p>
                          <div className="flex flex-wrap gap-2">
                            {product.uses.map((u) => (
                              <span key={u} className="text-xs bg-primary/8 text-primary border border-primary/15 px-3 py-1 rounded-full">{u}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "specs",
                    title: "Full Specifications",
                    content: (
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        {[
                          ["Material", product.material],
                          ["Bag Type", product.bagType],
                          ["Available GSM", product.gsmOptions.map((g) => `${g.gsm}g`).join(", ")],
                          ["Available Sizes", product.sizes.map((s) => s.label).join(", ")],
                          ["Print Options", product.printOptions.join(", ")],
                          ["Handle Types", product.handleOptions.join(", ")],
                          ["MOQ", `${product.moq.toLocaleString()} pcs`],
                          ["Origin", "Warangal, Telangana, India"],
                        ].map(([k, v]) => (
                          <React.Fragment key={k}>
                            <span className="text-muted-foreground">{k}</span>
                            <span className="font-medium text-foreground">{v}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: "features",
                    title: "Key Features",
                    content: (
                      <ul className="space-y-2">
                        {product.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    key: "delivery",
                    title: "Packaging & Delivery",
                    content: (
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>All orders are bundled in sturdy packing to protect bags during transit. Bulk orders are dispatched in boxes of 100–500 pcs with full tracking provided.</p>
                        <div className="space-y-2">
                          {[
                            ["Standard order (no print)", "5–7 working days"],
                            ["Custom printed order", "10–14 working days"],
                            ["Delivery coverage", "Pan-India via courier"],
                            ["Shipping cost", "Calculated at checkout"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b border-border/30 pb-2">
                              <span>{k}</span>
                              <span className="font-medium text-foreground">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                ].map((section) => (
                  <div key={section.key} className="border-b border-border/40 last:border-0">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === section.key ? null : section.key)}
                      data-testid={`accordion-${section.key}`}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors text-left"
                    >
                      {section.title}
                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground transition-transform ${openAccordion === section.key ? "rotate-90" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openAccordion === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">{section.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-20 pt-12 border-t border-border/40">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link href={`/product/${p.id}`}>
                      <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-400 hover:-translate-y-1 cursor-pointer">
                        <div className="aspect-square bg-muted/20 p-4 flex items-center justify-center overflow-hidden">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-400"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-serif font-bold text-primary text-lg mb-0.5">₹{p.price}<span className="text-xs font-normal text-muted-foreground">/pc</span></p>
                          <p className="font-semibold text-sm text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">MOQ: {p.moq.toLocaleString()} pcs</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-border/40 px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{product.name}</p>
          <p className="font-bold text-primary">₹{discountedUnit.toFixed(2)}/pc · {quantity.toLocaleString()} pcs</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-1.5 bg-primary text-white rounded-xl px-4 py-2 text-sm font-semibold shrink-0"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
        <a
          href={`https://wa.me/917780524290?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] text-white rounded-xl px-4 py-2 text-sm font-semibold shrink-0"
        >
          <WaIcon /> WhatsApp
        </a>
      </div>
    </div>
  );
}
