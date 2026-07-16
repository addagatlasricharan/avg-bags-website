import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Leaf, Award, Users, Globe, Target, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
            >
              About AVG BAGS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Pioneering sustainable packaging solutions through industrial excellence and uncompromising quality since 2014.
            </motion.p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Factory production line" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Founded in Warangal, Telangana, AVG Bags started with a clear mission: to provide a durable, sustainable, and premium alternative to single-use plastics. Over the past decade, we have grown from a small manufacturing unit to a state-of-the-art industrial facility.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Today, we serve hundreds of businesses, retail chains, schools, and temples across India, delivering millions of custom-printed non-woven bags every year with uncompromising quality and precision.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                  <div className="text-3xl font-serif font-bold text-secondary mb-2">15+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years of Excellence</div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                  <div className="text-3xl font-serif font-bold text-secondary mb-2">500+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="bg-[#0f1f14] rounded-3xl p-12 md:p-20 text-white mb-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, white 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Commitment</h2>
              <p className="text-lg text-white/70">The core principles that drive our manufacturing processes.</p>
            </div>
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Eco-Conscious</h3>
                <p className="text-white/60">We use 100% recyclable PP non-woven fabric and maintain a zero-waste policy in our cutting processes.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Uncompromising Quality</h3>
                <p className="text-white/60">Rigorous GSM testing, ultrasonic sealing, and multi-stage QA checks ensure every bag meets industrial standards.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-white/60">From design assistance to timely pan-India delivery, we prioritize building long-term partnerships with our clients.</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">Industrial Standards & Certifications</h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <div className="flex items-center gap-3 bg-muted px-6 py-4 rounded-xl font-bold text-lg"><Award className="w-6 h-6" /> ISO 9001:2015</div>
              <div className="flex items-center gap-3 bg-muted px-6 py-4 rounded-xl font-bold text-lg"><Globe className="w-6 h-6" /> Eco-Certified Material</div>
              <div className="flex items-center gap-3 bg-muted px-6 py-4 rounded-xl font-bold text-lg"><Target className="w-6 h-6" /> Zero-Waste Production</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
