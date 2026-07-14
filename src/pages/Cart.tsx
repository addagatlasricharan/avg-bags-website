import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OrderSnapshot = {
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shipping: number;
  paymentMethod: string;
  name: string;
  phone: string;
  city: string;
};

const paymentLabels: Record<string, string> = {
  bank: "Bank Transfer / NEFT",
  upi: "UPI Payment",
  cod: "Advance + Balance on Delivery",
};

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);

  // Controlled fields we need for the WhatsApp message
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [phone, setPhone]         = useState("");
  const [city, setCity]           = useState("");

  const shipping   = cartTotal > 0 ? 500 : 0;
  const finalTotal = cartTotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `AVG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSnapshot({
      orderId,
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: finalTotal,
      shipping,
      paymentMethod,
      name: `${firstName} ${lastName}`.trim(),
      phone,
      city,
    });
    clearCart();
    setStep("success");
  };

  if (step === "success" && orderSnapshot) {
    const waMsg = encodeURIComponent(
      `🛍️ *New Order — ${orderSnapshot.orderId}*\n\n` +
      `*Customer:* ${orderSnapshot.name || "Not provided"}\n` +
      `*Phone:* ${orderSnapshot.phone || "Not provided"}\n` +
      `*City:* ${orderSnapshot.city || "Not provided"}\n` +
      `*Payment:* ${paymentLabels[orderSnapshot.paymentMethod]}\n\n` +
      `*Order Items:*\n` +
      orderSnapshot.items.map(
        (i) => `• ${i.name} — ${i.quantity.toLocaleString()} pcs @ ₹${i.price}/pc = ₹${(i.quantity * i.price).toLocaleString()}`
      ).join("\n") +
      `\n\n*Shipping:* ₹${orderSnapshot.shipping.toLocaleString()}` +
      `\n*Total:* ₹${orderSnapshot.total.toLocaleString()}` +
      `\n\nPlease confirm design details and initiate production.`
    );

    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-10 rounded-3xl border border-border/50 text-center max-w-lg w-full mx-auto shadow-2xl"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-3">Order Placed!</h2>
            <p className="text-muted-foreground mb-5 leading-relaxed">
              Your bulk order request has been received. Our team will contact you shortly to confirm design details and start production.
            </p>

            {/* Order ID */}
            <p className="font-mono bg-muted px-4 py-2.5 rounded-xl text-sm mb-6 inline-block">
              {orderSnapshot.orderId}
            </p>

            {/* Order mini-summary */}
            <div className="bg-muted/40 rounded-2xl p-5 text-left mb-8 space-y-2 text-sm">
              {orderSnapshot.items.map((item, i) => (
                <div key={i} className="flex justify-between text-foreground">
                  <span className="truncate mr-4">{item.name} × {item.quantity.toLocaleString()} pcs</span>
                  <span className="font-semibold shrink-0">₹{(item.quantity * item.price).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border/40 pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">₹{orderSnapshot.total.toLocaleString()}</span>
              </div>
            </div>

            {/* WhatsApp CTA — primary action */}
            <a
              href={`https://wa.me/917780524290?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1fba59] text-white rounded-xl py-4 text-base font-semibold transition-colors mb-3 shadow-lg shadow-green-200"
            >
              <WaIcon />
              Send Order to AVG Bags on WhatsApp
            </a>
            <p className="text-xs text-muted-foreground mb-6">
              Tap above to send your full order summary directly to our team for fastest processing.
            </p>

            <Link href="/shopping">
              <Button variant="outline" className="w-full rounded-xl border-primary/25 text-primary hover:bg-primary/5">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">
            {step === "cart" ? "Your Cart" : "Checkout Details"}
          </h1>

          {items.length === 0 && step === "cart" ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-border/50">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any bags to your bulk order yet.</p>
              <Link href="/shopping">
                <Button size="lg" className="px-10 rounded-full bg-primary hover:bg-primary/90">Browse Catalog</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Left Column */}
              <div className="lg:col-span-2">
                {step === "cart" ? (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
                        >
                          <div className="w-24 h-24 bg-muted rounded-xl p-2 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                            <p className="text-primary font-bold">₹{item.price} / piece</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-muted rounded-lg border border-border/50 p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 100)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-16 text-center font-mono font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 100)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="w-24 text-right font-bold text-lg">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    id="checkout-form"
                    onSubmit={handleCheckoutSubmit}
                    className="bg-card border border-border/50 rounded-3xl p-8 space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-6 border-b pb-4">Billing & Shipping Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Company Name (Optional)</Label>
                          <Input />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone (WhatsApp preferred)</Label>
                          <Input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Street Address</Label>
                          <Input required />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input required value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input required />
                        </div>
                        <div className="space-y-2">
                          <Label>PIN Code</Label>
                          <Input required />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif font-bold mb-6 border-b pb-4">Payment Method</h3>
                      <div className="space-y-3">
                        {[
                          { value: "bank", title: "Bank Transfer / NEFT",          desc: "Make payment directly to our bank account. Details provided after order." },
                          { value: "upi",  title: "UPI Payment",                   desc: "Pay via GPay, PhonePe, Paytm etc." },
                          { value: "cod",  title: "Advance + Balance on Delivery", desc: "50% advance required to start production." },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                              paymentMethod === opt.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={opt.value}
                              checked={paymentMethod === opt.value}
                              onChange={() => setPaymentMethod(opt.value)}
                              className="w-4 h-4 accent-primary"
                            />
                            <div>
                              <div className="font-bold">{opt.title}</div>
                              <div className="text-sm text-muted-foreground">{opt.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.form>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#0f1f14] text-white rounded-3xl p-8 sticky top-32 shadow-xl">
                  <h3 className="text-2xl font-serif font-bold mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/80">
                      <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} pcs)</span>
                      <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Base Shipping (Bulk)</span>
                      <span>₹{shipping.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="border-t border-white/20 pt-4 mt-4 flex justify-between font-bold text-xl">
                      <span>Total Amount</span>
                      <span className="text-secondary">₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {step === "cart" ? (
                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-white text-lg py-6 rounded-xl"
                      onClick={() => setStep("checkout")}
                    >
                      Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      form="checkout-form"
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-white text-lg py-6 rounded-xl"
                    >
                      Place Order
                    </Button>
                  )}

                  {step === "cart" && (
                    <Button variant="ghost" className="w-full mt-4 text-white/60 hover:text-white hover:bg-white/10" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  )}

                  <div className="mt-8 space-y-4 text-sm text-white/60">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-secondary" /> Secure checkout
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-secondary" /> Pan-India delivery via logistics
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
