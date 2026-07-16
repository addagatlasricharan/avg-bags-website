import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, CheckCircle, Truck, Leaf, Factory, ShoppingBag } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import bag2  from "@assets/ChatGPT_Image_May_12,_2026,_09_29_43_AM_1778565043939.png";
import bag4  from "@assets/ChatGPT_Image_May_12,_2026,_09_20_33_AM_1778565043940.png";
import bag6  from "@assets/ChatGPT_Image_May_12,_2026,_09_11_32_AM_1778565043941.png";
import bag14 from "@assets/ChatGPT_Image_May_12,_2026,_08_53_13_AM_1778565043943.png";

// keep bag1 & bag3 for featured products section
import bag1 from "@assets/ChatGPT_Image_May_12,_2026,_09_31_00_AM_1778565043939.png";
import bag3 from "@assets/ChatGPT_Image_May_12,_2026,_09_23_30_AM_1778565043940.png";

// Animated counter hook
function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatNumber({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="px-4 text-center">
      <div className="text-4xl font-serif font-bold text-secondary mb-2">{count}{suffix}</div>
      <div className="text-sm font-medium uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );
}

const clientTypes = [
  "Retail Stores", "Schools & Colleges", "Hospitals", "Temples & Trusts",
  "Political Campaigns", "Event Organizers", "Grocery Chains", "Pharma Companies",
  "Hotels & Hospitality", "NGOs & Foundations", "Textile Showrooms", "Auto Dealers",
];

// Mobile bag showcase — compact floating row, tap to highlight
function MobileBagShowcase() {
  const [active, setActive] = useState<number | null>(null);

  const bags = [
    { src: bag6,  alt: "Silver & Jewellery Bag", rotate: -6,  floatY: -10, floatDur: 6.0, delay: 0,   label: "Silver & Jewellery" },
    { src: bag2,  alt: "D-Cut Printed Bag",       rotate:  0,  floatY: -14, floatDur: 7.4, delay: 0.6, label: "D-Cut Printed"      },
    { src: bag14, alt: "Retail & Wholesale Bag",  rotate:  6,  floatY:  -8, floatDur: 5.6, delay: 1.2, label: "Retail & Wholesale" },
  ];

  const toggle = (i: number) => setActive(prev => prev === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.55 }}
      className="col-span-2 md:hidden flex items-end justify-center gap-4 pt-4 pb-6"
    >
      {bags.map((bag, i) => {
        const isActive = active === i;
        const isOther  = active !== null && !isActive;

        return (
          <motion.div
            key={i}
            onClick={() => toggle(i)}
            /* idle: float; active: pop up; other: dim & shrink */
            animate={
              isActive
                ? { scale: 1.18, rotate: 0, y: -18, opacity: 1, zIndex: 20 }
                : isOther
                ? { scale: 0.85, rotate: bag.rotate, y: 0, opacity: 0.35, zIndex: 1 }
                : {
                    scale: 1, rotate: bag.rotate,
                    y: [0, bag.floatY, 0],
                    opacity: 1, zIndex: 10,
                  }
            }
            transition={
              isActive || isOther
                ? { type: "spring", stiffness: 300, damping: 24 }
                : {
                    y: { repeat: Infinity, duration: bag.floatDur, ease: "easeInOut", delay: bag.delay },
                    scale: { duration: 0.3 }, rotate: { duration: 0.3 },
                  }
            }
            className="relative w-[28vw] max-w-[110px] rounded-xl overflow-hidden border border-white/20 cursor-pointer select-none flex-shrink-0"
            style={{
              boxShadow: isActive
                ? "0 20px 50px rgba(0,0,0,0.75), 0 0 0 2px rgba(255,255,255,0.2)"
                : "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <img src={bag.src} alt={bag.alt} className="w-full h-auto object-cover pointer-events-none" draggable={false} />

            {/* Tap label */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2"
            >
              <p className="text-white text-[9px] font-bold leading-tight">{bag.label}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Floating bag showcase with hover-to-front
function BagShowcase() {
  const [active, setActive] = useState<number | null>(null);

  // baseX/Y = resting offset from centre; floatY = float travel distance; floatDur = float speed
  const bags = [
    { src: bag6,  alt: "Silver & Jewellery Bag",  id: "6",  baseRotate:  4, baseX:  100, baseY: -70, baseZ: 30, floatY: -18, floatDur: 6.2, label: "Silver & Jewellery" },
    { src: bag2,  alt: "D-Cut Printed Bag",        id: "2",  baseRotate: -5, baseX: -105, baseY:  10, baseZ: 20, floatY:  20, floatDur: 7.6, label: "D-Cut Printed"      },
    { src: bag14, alt: "Retail & Wholesale Bag",   id: "14", baseRotate:  9, baseX:   10, baseY:  90, baseZ: 10, floatY: -14, floatDur: 5.4, label: "Retail & Wholesale" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.25 }}
      className="relative h-[580px] w-full hidden md:flex items-center justify-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-8 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {bags.map((bag, i) => {
        const isActive = active === i;
        const isOther  = active !== null && !isActive;

        return (
          <motion.div
            key={i}
            onHoverStart={() => setActive(i)}
            onHoverEnd={() => setActive(null)}
            /* idle: float continuously; active: spring to front; other: spring back */
            animate={
              isActive
                ? { scale: 1.12, rotate: 0, x: 0, y: -18, opacity: 1, zIndex: 50 }
                : isOther
                ? { scale: 0.85, rotate: bag.baseRotate, x: bag.baseX, y: bag.baseY, opacity: 0.4, zIndex: Math.max(1, bag.baseZ - 15) }
                : {
                    scale: 1, rotate: bag.baseRotate, x: bag.baseX,
                    y: [bag.baseY, bag.baseY + bag.floatY, bag.baseY],
                    opacity: 1, zIndex: bag.baseZ,
                  }
            }
            transition={
              isActive || isOther
                ? { type: "spring", stiffness: 260, damping: 22 }
                : {
                    y: { repeat: Infinity, duration: bag.floatDur, ease: "easeInOut" },
                    scale: { duration: 0.4 }, rotate: { duration: 0.4 }, x: { duration: 0.4 },
                  }
            }
            className="absolute w-56 cursor-pointer rounded-2xl overflow-hidden border border-white/20 select-none"
            style={{
              boxShadow: isActive
                ? "0 36px 80px rgba(0,0,0,0.75), 0 0 0 2px rgba(255,255,255,0.18)"
                : "0 18px 44px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={bag.src}
              alt={bag.alt}
              className="w-full h-auto object-cover pointer-events-none"
              draggable={false}
            />

            {/* Hover label slides up */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 py-4"
            >
              <p className="text-white text-xs font-bold tracking-wide">{bag.label}</p>
              <p className="text-white/70 text-[10px] mt-0.5">Custom Printed · Bulk Orders</p>
            </motion.div>
          </motion.div>
        );
      })}

      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/25 text-[10px] tracking-widest uppercase pointer-events-none">
        Hover to explore
      </p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">

        {/* 1. HERO */}
        <section className="relative md:min-h-screen flex items-center pt-24 pb-8 md:pb-0 overflow-hidden bg-[#0f1f14]">
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary rounded-full blur-[140px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary rounded-full blur-[160px] opacity-10 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">

            {/* Mobile bag strip — first row on mobile, hidden on desktop */}
            <MobileBagShowcase />

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="max-w-2xl py-6 md:py-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-secondary border border-primary/30 text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(26,77,46,0.3)]"
              >
                Manufacturing Non-Woven Fabric Bags
              </motion.span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.08] mb-6 drop-shadow-lg">
                Premium Non-Woven Fabric Bags Manufacturer
              </h1>
              <p className="text-xl text-white/75 mb-10 max-w-lg font-light leading-relaxed">
                Eco-Friendly <span className="text-secondary mx-2">•</span> Custom Printed Bags <span className="text-secondary mx-2">•</span> Bulk Orders
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shopping">
                  <Button
                    size="lg"
                    data-testid="button-shop-now"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-9 py-6 rounded-full shadow-xl hover:shadow-secondary/30 transition-all hover:-translate-y-1"
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button
                    size="lg"
                    variant="outline"
                    data-testid="button-get-quote-hero"
                    className="text-white border-white/30 hover:bg-white/10 text-lg px-9 py-6 rounded-full bg-transparent hover:-translate-y-1 transition-transform"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>

              {/* Quick trust signals */}
              <div className="flex flex-wrap gap-4 mt-6 pt-5 md:mt-10 md:pt-8 border-t border-white/10">
                {["15+ Years Experience", "500+ Happy Clients", "Overall Telangana Delivery"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Bag Showcase — stacked hover cards (desktop only) */}
            <BagShowcase />
          </div>

        </section>

        {/* 2. STATS BAR */}
        <section className="relative z-20 -mt-8 mx-4 md:mx-12">
          <div className="bg-primary text-white rounded-2xl shadow-2xl py-10 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
              <StatNumber target={15} label="Years Experience" />
              <StatNumber target={500} label="Happy Clients" />
              <StatNumber target={100} label="Bag Styles" />
              <div className="px-4 text-center">
                <div className="flex justify-center mb-2"><Truck className="w-9 h-9 text-secondary" /></div>
                <div className="text-sm font-medium uppercase tracking-wider opacity-80">Overall Telangana Delivery</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CLIENT TYPES STRIP */}
        <section className="py-12 bg-background overflow-hidden border-y border-border/30 mt-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by businesses across every industry
          </p>
          <div className="relative">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...clientTypes, ...clientTypes].map((type, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/6 text-primary border border-primary/12 text-sm font-medium shrink-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {type}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Why Choose AVG Bags</h2>
              <p className="text-lg text-muted-foreground">We combine industrial capacity with meticulous craftsmanship to deliver the finest non-woven bags in India.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Star className="w-8 h-8" />, title: "Custom Printing", desc: "High-quality flexo and screen printing with precise multi-color registration for your logo and design." },
                { icon: <Leaf className="w-8 h-8" />, title: "Eco-Friendly Material", desc: "Premium quality non-woven PP fabric that is durable, reusable, and environmentally responsible." },
                { icon: <Factory className="w-8 h-8" />, title: "Bulk Order Ready", desc: "Industrial manufacturing capacity to handle large orders for schools, temples, and retailers." },
                { icon: <CheckCircle className="w-8 h-8" />, title: "100% Recyclable", desc: "Commitment to sustainability with fully recyclable materials and zero-waste production practices." },
                { icon: <Truck className="w-8 h-8" />, title: "Fast Turnaround", desc: "Efficient production lines ensuring your custom orders are manufactured and dispatched on time." },
                { icon: <ShoppingBag className="w-8 h-8" />, title: "Versatile Styles", desc: "D-cut, W-cut, U-cut, loop handle, and box bags customized to your exact dimensional requirements." },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="w-14 h-14 bg-primary/8 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FEATURED PRODUCTS */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
              <div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-3">Featured Products</h2>
                <p className="text-lg text-muted-foreground">Premium bags for every purpose — school, temple, retail, and more.</p>
              </div>
              <Link href="/shopping">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">View Full Catalog</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: "1", name: "Grocery Carry Bag", price: 25, moq: 500, img: bag1 },
                { id: "2", name: "D-Cut Printed Bag", price: 18, moq: 1000, img: bag2 },
                { id: "3", name: "Loop Handle Bag", price: 22, moq: 300, img: bag3 },
                { id: "4", name: "Eco Shopping Bag", price: 20, moq: 300, img: bag4 },
              ].map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted/20 p-6 flex items-center justify-center">
                    <img src={product.img} alt={product.name} className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      MOQ: {product.moq}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary font-serif font-bold text-2xl mb-1">₹{product.price}<span className="text-sm font-normal text-muted-foreground"> / piece</span></p>
                    <h3 className="font-bold text-lg mb-4">{product.name}</h3>
                    <Link href={`/product/${product.id}`}>
                      <Button className="w-full rounded-xl" data-testid={`button-view-${i}`}>View Details</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MANUFACTURING HIGHLIGHTS */}
        <section className="py-24 bg-[#0f1f14] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-white mb-4">Our Manufacturing Process</h2>
              <p className="text-lg text-white/60">A seamless 7-step journey from raw material to finished premium bags.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-5 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {[
                { step: "01", title: "Raw Material", desc: "Premium 100% recyclable rolls sourced and tested" },
                { step: "02", title: "Fabric Cutting", desc: "Precision automated dimension cutting" },
                { step: "03", title: "Design & Master", desc: "Artwork and plate preparation" },
                { step: "04", title: "Printing", desc: "High-speed flexo/screen printing" },
                { step: "05", title: "Stitching", desc: "Ultrasonic sealing & sturdy finish" },
                { step: "06", title: "Quality Check", desc: "Rigorous load & print testing" },
                { step: "07", title: "Dispatch", desc: "Secure bulk packing & delivery" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="min-w-[260px] snap-center bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors cursor-default group"
                >
                  <div className="text-5xl font-serif font-bold text-white/8 group-hover:text-secondary/30 transition-colors mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/55 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/manufacturing">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-9 text-base">
                  Explore Full Process
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif font-bold text-center text-foreground mb-16">Trusted by Businesses Across India</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Rahul Deshmukh", role: "Retail Chain Owner, Hyderabad", text: "AVG Bags delivered exactly what we needed. The D-cut bags with our custom logo are high quality and our customers love them." },
                { name: "Sri Venkateswara Temple Trust", role: "Trust Committee, Warangal", text: "We ordered 5000 religious bags for prasadam distribution. The print quality is exceptionally sharp and the bags hold good weight." },
                { name: "Priya Sharma", role: "School Administrator, Karimnagar", text: "Excellent promotional bags for our annual sports day. Fast turnaround time and very professional service from the team at AVG." },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-muted/30 p-8 rounded-2xl border border-border/50 relative hover:shadow-lg transition-shadow"
                >
                  <div className="text-secondary mb-4 flex">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-base italic text-muted-foreground mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-24 bg-card border-y border-border/40">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about ordering from AVG Bags.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "What is the minimum order quantity (MOQ)?", a: "Our MOQ varies by bag style, typically ranging from 200 to 1,000 pieces. Standard unprinted bags have a lower MOQ compared to custom multi-color printed orders." },
                { q: "Do you offer custom printing?", a: "Yes! We specialize in custom printing using both screen printing and high-speed flexo printing. Our in-house design team can help prepare your logo and artwork for production." },
                { q: "How long does an order take to manufacture?", a: "Standard orders take 5–7 working days. Custom printed bulk orders may take 10–14 days depending on quantity and print complexity." },
                { q: "Are non-woven bags eco-friendly?", a: "Yes. Non-woven PP fabric is 100% recyclable, reusable, and a durable alternative to single-use plastic bags." },
                { q: "Can I get a sample before placing a bulk order?", a: "Yes, we provide samples on request. Contact us via WhatsApp or the Get Quote form and we'll arrange sample dispatch." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/40 py-2">
                  <AccordionTrigger className="text-base font-medium hover:text-primary text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 9. CTA BANNER */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Ready to order? Let's talk.</h2>
            <p className="text-xl text-primary-foreground/75 mb-10 max-w-2xl mx-auto">
              Get in touch with our team for bulk pricing, custom samples, and manufacturing timelines.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/quote">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-10 py-6 rounded-full w-full sm:w-auto shadow-xl">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 rounded-full w-full sm:w-auto bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-border/40 px-4 py-3 flex gap-3 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Non-Woven Bags · Min 500 pcs</p>
          <p className="text-sm font-semibold text-foreground">Starting ₹18/piece</p>
        </div>
        <Link href="/quote">
          <Button size="sm" className="bg-primary text-white rounded-xl px-5 shrink-0">
            Get Quote
          </Button>
        </Link>
        <Link href="/shopping">
          <Button size="sm" variant="outline" className="border-primary/30 text-primary rounded-xl px-5 shrink-0">
            Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
