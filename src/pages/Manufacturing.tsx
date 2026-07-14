import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const steps = [
  {
    number: "01",
    title: "Raw Material Sourcing",
    description: "We source premium 100% recyclable non-woven fabric rolls from trusted suppliers. Each roll is tested for GSM accuracy, tensile strength, and color consistency before entering production.",
    color: "bg-green-100 text-green-800"
  },
  {
    number: "02",
    title: "Fabric Cutting",
    description: "Using precision automated cutting machines, the fabric is cut into exact dimensions for various bag styles — D-cut, W-cut, U-cut, and more — with minimal wastage.",
    color: "bg-blue-100 text-blue-800"
  },
  {
    number: "03",
    title: "Design & Master / Plate Making",
    description: "Our in-house design team creates precise artwork and prepares printing masters or plates according to the customer's chosen design, logo, and colors. Each plate is color-separated and quality-checked before production begins.",
    color: "bg-purple-100 text-purple-800"
  },
  {
    number: "04",
    title: "Printing as per Design & Color",
    description: "Using the prepared masters/plates, we print the customer's design in their chosen colors on the fabric using high-speed flexo or screen printing machines. Multi-color prints are applied in precise registration for sharp, vibrant results.",
    color: "bg-orange-100 text-orange-800"
  },
  {
    number: "05",
    title: "Bag Stitching / Sealing",
    description: "Cut and printed pieces are assembled using advanced ultrasonic sealing technology or high-quality stitching for maximum load-bearing capacity and clean finish.",
    color: "bg-teal-100 text-teal-800"
  },
  {
    number: "06",
    title: "Quality Check",
    description: "Every batch undergoes rigorous QA testing — seam strength, print registration, dimensional accuracy, and load capacity — before moving to packing.",
    color: "bg-red-100 text-red-800"
  },
  {
    number: "07",
    title: "Packing & Dispatch",
    description: "Finished bags are bundled, securely packed in bulk, and dispatched through our logistics network for pan-India delivery with full tracking.",
    color: "bg-yellow-100 text-yellow-800"
  }
];

export default function Manufacturing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1f14]">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Manufacturing Process</h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Industrial precision meets craftsmanship. Take a tour through our 7-step quality-controlled production line.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(255,180,0,0.5)] z-10"></div>
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${step.color}`}>
                        Step {step.number}
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-white/70 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Experience the Quality</h2>
            <Link href="/quote">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-white rounded-full px-10 py-6 text-lg">
                Start Your Order
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
