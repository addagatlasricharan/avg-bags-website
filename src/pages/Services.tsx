import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Scissors, Printer, Copy, PenTool, ArrowRight, CheckCircle } from "lucide-react";

import bag2  from "@assets/ChatGPT_Image_May_12,_2026,_09_29_43_AM_1778565043939.png";
import bag5 from "@assets/ChatGPT_Image_May_12,_2026,_09_14_27_AM_1778565043940.png";
import bag9 from "@assets/ChatGPT_Image_May_12,_2026,_08_57_52_AM_1778565043942.png";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-[#0f1f14] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1.5 px-4 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-semibold mb-6 uppercase tracking-widest"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70"
          >
            From raw fabric to finished custom printed bags, we provide end-to-end industrial manufacturing services under one roof.
          </motion.p>
        </div>
      </section>

      <main className="flex-1 pb-24">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-12">

            {/* FEATURED SERVICE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f1f14] text-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                {/* Left: Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                  />
                  <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary text-sm font-bold mb-5 uppercase tracking-wider border border-secondary/30">
                      Core Specialization
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 leading-tight">
                      Manufacturing Non-Woven Fabric Bags
                    </h2>
                    <p className="text-lg text-white/75 mb-8 leading-relaxed">
                      Our primary industrial capability. We manufacture millions of premium quality, eco-friendly non-woven PP bags annually for businesses, educational institutions, temples, and retail chains across India.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {["100% Recyclable Material", "High Load-Bearing Capacity", "Customizable Dimensions & GSM", "Pan-India Delivery"].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-white/90">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/shopping">
                      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-5 rounded-xl text-base font-semibold">
                        View Products
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Real bag images collage */}
                <div className="relative min-h-[360px] md:min-h-0 overflow-hidden bg-black/20">
                  <img
                    src={bag2}
                    alt="Non-woven bag sample"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f14]/60 via-transparent to-transparent" />

                  
                </div>
              </div>
            </motion.div>

            {/* OTHER SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Printer className="w-10 h-10" />,
                  title: "Printing on Non-Woven Bags",
                  desc: "State-of-the-art custom flexo and screen printing. We ensure precise multi-color registration, sharp logos, and vibrant branding that lasts.",
                  features: ["Flexo & Screen Printing", "Multi-color Registration", "UV-resistant Inks"],
                },
                {
                  icon: <Scissors className="w-10 h-10" />,
                  title: "Cutting of Non-Woven Bags",
                  desc: "Precision automated cutting services. We expertly cut D-cut, W-cut, and U-cut styles to exact dimensional requirements with minimal fabric wastage.",
                  features: ["D-Cut, W-Cut, U-Cut Styles", "Automated Precision Cutting", "Minimal Wastage"],
                },
                {
                  icon: <Copy className="w-10 h-10" />,
                  title: "A3 & A4 Master Duplicators",
                  desc: "High-volume, high-quality duplicator printing services for business documents, forms, and promotional inserts.",
                  features: ["A3 & A4 Formats", "High-Volume Output", "Sharp Print Quality"],
                },
                {
                  icon: <PenTool className="w-10 h-10" />,
                  title: "DTP Work",
                  desc: "Professional Desktop Publishing and design services to prepare your artwork, logos, and layouts perfectly for the printing press.",
                  features: ["Logo & Artwork Prep", "Color Separation", "Print-ready Files"],
                },
              ].map((service, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col"
                >
                  <div className="w-16 h-16 bg-primary/8 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-1">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/quote" className="inline-flex items-center gap-1 text-primary font-semibold hover:text-secondary transition-colors text-sm mt-auto">
                    Request Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/40 border border-border/50 rounded-3xl p-10 md:p-14 text-center"
            >
              <h3 className="text-3xl font-serif font-bold mb-4">Need something custom?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Tell us your requirements and we'll prepare a detailed quote with samples, pricing, and timelines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button size="lg" className="bg-primary text-white rounded-xl px-10">Get a Free Quote</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-xl px-10 border-primary/30 text-primary hover:bg-primary/5">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
