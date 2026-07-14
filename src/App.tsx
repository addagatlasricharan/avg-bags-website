import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

// Components
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Shopping from "@/pages/Shopping";
import Services from "@/pages/Services";
import Manufacturing from "@/pages/Manufacturing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Quote from "@/pages/Quote";
import Cart from "@/pages/Cart";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/layout/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shopping" component={Shopping} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/services" component={Services} />
      <Route path="/manufacturing" component={Manufacturing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/quote" component={Quote} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
              <div className="flex flex-col min-h-screen">
                <div className="flex-1">
                <Router />
                </div>
                <Footer />
                <WhatsAppButton />
                </div>
            </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
