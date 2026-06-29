import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItem: { size: string; quantity: number } | null;
}

export function CartDrawer({ isOpen, onClose, cartItem }: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsCheckingOut(false);
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      gsap.to(drawerRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
      gsap.to(drawerRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (!cartItem) return;
    
    setIsCheckingOut(true);

    const message = `Hello, I want to order The Signature Club Oversized Tee.\nSize: ${cartItem.size}\nQuantity: ${cartItem.quantity}\nTotal: ${400 * cartItem.quantity} MAD`;
    const url = `https://wa.me/0710900502?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] opacity-0 pointer-events-none"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-[#050505] border-l border-white/10 z-[9995] transform translate-x-full flex flex-col"
      >
        <div className="p-8 flex justify-between items-center border-b border-white/10">
          <h2 className="text-sm tracking-[0.2em] uppercase font-light">Your Cart</h2>
          <button onClick={onClose} className="text-xs uppercase tracking-widest text-white/50 hover:text-white clickable">
            Close
          </button>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
          {isCheckingOut ? (
            <div className="animate-pulse space-y-4">
              <p className="text-xl font-light tracking-widest">Thank you.</p>
              <p className="text-sm font-thin tracking-widest text-white/50">Redirecting to WhatsApp to complete your order...</p>
            </div>
          ) : cartItem ? (
            <div className="w-full flex justify-between items-center border border-white/10 p-6">
              <div className="text-left space-y-2">
                <p className="text-sm tracking-widest font-light">Signature Oversized Tee</p>
                <p className="text-xs tracking-widest font-thin text-white/50">Size: {cartItem.size} | Qty: {cartItem.quantity}</p>
              </div>
              <p className="text-sm font-light">{400 * cartItem.quantity} MAD</p>
            </div>
          ) : (
            <p className="text-sm font-thin tracking-widest text-white/50">Your cart is currently empty.</p>
          )}
        </div>

        <div className="p-8 border-t border-white/10">
          <button 
            onClick={handleCheckout}
            disabled={!cartItem || isCheckingOut}
            className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors duration-300 clickable disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCheckingOut ? "Processing..." : "Checkout via WhatsApp"}
          </button>
        </div>
      </div>
    </>
  );
}
