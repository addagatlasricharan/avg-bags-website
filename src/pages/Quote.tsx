import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ChevronRight, ChevronLeft, Package, PenTool, Truck, FileText } from "lucide-react";

export default function Quote() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    bagType: "",
    size: "",
    quantity: "",
    material: "90gsm",
    printType: "screen",
    colors: "",
    customArtwork: "yes",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    deliveryDate: "",
    notes: ""
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
  };

  const steps = [
    { id: 1, title: "Product", icon: <Package className="w-5 h-5" /> },
    { id: 2, title: "Design", icon: <PenTool className="w-5 h-5" /> },
    { id: 3, title: "Delivery", icon: <Truck className="w-5 h-5" /> },
    { id: 4, title: "Summary", icon: <FileText className="w-5 h-5" /> }
  ];

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-28 pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-12 rounded-3xl border border-border/50 text-center max-w-md mx-auto shadow-2xl"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Quote Request Sent!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest in AVG Bags. Our manufacturing team will review your requirements and get back to you with a custom quote within 24 hours.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Request a Custom Quote</h1>
            <p className="text-lg text-muted-foreground">Fill out the details below for bulk manufacturing pricing.</p>
          </div>

          {/* Stepper */}
          <div className="flex justify-between items-center mb-12 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors ${
                  step >= s.id ? 'bg-primary border-primary text-white' : 'bg-background border-muted text-muted-foreground'
                }`}>
                  {s.icon}
                </div>
                <span className={`text-sm font-medium ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 shadow-sm min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                
                {/* STEP 1: PRODUCT */}
                {step === 1 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold">1. Product Details</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>Bag Style</Label>
                        <Select value={formData.bagType} onValueChange={(v) => updateForm('bagType', v)}>
                          <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="d-cut">D-Cut Bag</SelectItem>
                            <SelectItem value="w-cut">W-Cut (Grocery) Bag</SelectItem>
                            <SelectItem value="u-cut">U-Cut Bag</SelectItem>
                            <SelectItem value="loop-handle">Loop Handle Bag</SelectItem>
                            <SelectItem value="box">Box Type Bag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Fabric GSM (Thickness)</Label>
                        <Select value={formData.material} onValueChange={(v) => updateForm('material', v)}>
                          <SelectTrigger><SelectValue placeholder="Select GSM" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="40gsm">40 GSM (Light)</SelectItem>
                            <SelectItem value="60gsm">60 GSM (Standard)</SelectItem>
                            <SelectItem value="90gsm">90 GSM (Heavy Duty)</SelectItem>
                            <SelectItem value="120gsm">120 GSM (Premium Box)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Dimensions (Width x Height x Gusset)</Label>
                        <Input placeholder="e.g. 14 x 16 x 5 inches" value={formData.size} onChange={(e) => updateForm('size', e.target.value)} />
                      </div>

                      <div className="space-y-3">
                        <Label>Estimated Quantity (MOQ: 500)</Label>
                        <Input type="number" placeholder="5000" value={formData.quantity} onChange={(e) => updateForm('quantity', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DESIGN */}
                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold">2. Design & Printing</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Printing Method</Label>
                        <RadioGroup value={formData.printType} onValueChange={(v) => updateForm('printType', v)} className="grid md:grid-cols-2 gap-4">
                          <div className={`flex items-center space-x-2 border p-4 rounded-xl cursor-pointer ${formData.printType === 'screen' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <RadioGroupItem value="screen" id="r1" />
                            <Label htmlFor="r1" className="cursor-pointer">Screen Printing (1-2 colors, sharp)</Label>
                          </div>
                          <div className={`flex items-center space-x-2 border p-4 rounded-xl cursor-pointer ${formData.printType === 'flexo' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <RadioGroupItem value="flexo" id="r2" />
                            <Label htmlFor="r2" className="cursor-pointer">Flexo Printing (Multi-color, high volume)</Label>
                          </div>
                          <div className={`flex items-center space-x-2 border p-4 rounded-xl cursor-pointer ${formData.printType === 'none' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <RadioGroupItem value="none" id="r3" />
                            <Label htmlFor="r3" className="cursor-pointer">No Printing (Plain Bags)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label>Bag & Print Colors Required</Label>
                          <Input placeholder="e.g. Red bag with white logo" value={formData.colors} onChange={(e) => updateForm('colors', e.target.value)} />
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Do you have custom artwork ready?</Label>
                          <Select value={formData.customArtwork} onValueChange={(v) => updateForm('customArtwork', v)}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, I have the logo/design</SelectItem>
                              <SelectItem value="no">No, I need design assistance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DELIVERY */}
                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold">3. Contact & Delivery</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>Company/Organization Name</Label>
                        <Input value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} />
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Contact Person Name</Label>
                        <Input value={formData.contactName} onChange={(e) => updateForm('contactName', e.target.value)} />
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Email Address</Label>
                        <Input type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} />
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Phone Number</Label>
                        <Input type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                      </div>
                      
                      <div className="space-y-3 md:col-span-2">
                        <Label>Delivery Address / City</Label>
                        <Input placeholder="City, State, Pincode" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} />
                      </div>
                      
                      <div className="space-y-3 md:col-span-2">
                        <Label>Additional Notes or Specific Requirements</Label>
                        <Textarea placeholder="Any other details we should know..." className="min-h-[100px]" value={formData.notes} onChange={(e) => updateForm('notes', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUMMARY */}
                {step === 4 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-serif font-bold">4. Review Summary</h2>
                    
                    <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Product Specifications</h4>
                        <ul className="space-y-2">
                          <li><span className="font-medium">Style:</span> {formData.bagType || "Not specified"}</li>
                          <li><span className="font-medium">Size:</span> {formData.size || "Not specified"}</li>
                          <li><span className="font-medium">Material:</span> {formData.material || "Not specified"}</li>
                          <li><span className="font-medium">Quantity:</span> {formData.quantity || "Not specified"}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Design Details</h4>
                        <ul className="space-y-2">
                          <li><span className="font-medium">Printing:</span> {formData.printType || "Not specified"}</li>
                          <li><span className="font-medium">Colors:</span> {formData.colors || "Not specified"}</li>
                          <li><span className="font-medium">Artwork Ready:</span> {formData.customArtwork === "yes" ? "Yes" : "No"}</li>
                        </ul>
                      </div>
                      <div className="md:col-span-2 border-t border-border/50 pt-4 mt-2">
                        <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Contact Info</h4>
                        <p>{formData.companyName} - {formData.contactName}</p>
                        <p>{formData.phone} | {formData.email}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{formData.address}</p>
                      </div>
                    </div>
                  </div>
                )}
                
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-auto pt-8 flex justify-between items-center border-t border-border/50">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : <div></div>}
              
              {step < 4 ? (
                <Button onClick={handleNext}>
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-primary hover:bg-primary/90 px-8" onClick={handleSubmit}>
                  Submit Quote Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
