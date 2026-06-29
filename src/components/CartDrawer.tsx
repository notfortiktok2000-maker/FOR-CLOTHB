import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CheckoutModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
      
      const tl = gsap.timeline();
      
      tl.to(modalRef.current, { 
        y: 0, 
        opacity: 1, 
        pointerEvents: "auto", 
        duration: 0.5, 
        ease: "power3.out" 
      })
      .fromTo(".form-field", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(summaryRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.2 },
        "-=0.6"
      )
      .fromTo(".size-btn",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
        "-=0.4"
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.4 });
      gsap.to(modalRef.current, { y: 30, opacity: 0, pointerEvents: "none", duration: 0.4, ease: "power3.in" });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (!firstName || !lastName || !address || !phone || !selectedSize) {
      setError(true);
      return;
    }
    setError(false);

    const message = `🛍️ NEW ORDER — THE SIGNATURE CLUB\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nAddress: ${address}\nPhone: ${phone}\nSize: ${selectedSize}\n\nProduct: Signature Oversized Tee\nPrice: 400 MAD\n\n— The Signature Club`;
    const url = `https://wa.me/212710900502?text=${encodeURIComponent(message)}`;
    
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A0A0A]/90 z-[9990] opacity-0 pointer-events-none"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[9995] flex items-center justify-center md:p-6 pointer-events-none">
        <div
          ref={modalRef}
          className="w-full h-full md:h-auto max-w-5xl bg-[#111111] md:border border-white/5 md:rounded-[16px] flex flex-col md:flex-row transform translate-y-[30px] opacity-0 pointer-events-none overflow-hidden overflow-y-auto"
        >
          {/* Close button - absolute */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 text-white/50 hover:text-white p-2 font-['Poppins'] font-light tracking-widest text-[11px] uppercase transition-colors duration-300"
          >
            Close
          </button>

          {/* Left Side - Form */}
          <div className="w-full md:w-3/5 p-8 md:p-14">
            <h2 className="form-field text-[14px] font-['Poppins'] font-light text-white/50 tracking-[0.2em] uppercase mb-10">
              Checkout
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-field w-full bg-transparent border-b border-white/15 text-white rounded-none py-4 px-0 font-['Poppins'] font-light text-[15px] placeholder:text-white/30 outline-none focus:border-white/80 transition-colors duration-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-field w-full bg-transparent border-b border-white/15 text-white rounded-none py-4 px-0 font-['Poppins'] font-light text-[15px] placeholder:text-white/30 outline-none focus:border-white/80 transition-colors duration-300"
                />
              </div>
              
              <input
                type="text"
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-field w-full bg-transparent border-b border-white/15 text-white rounded-none py-4 px-0 font-['Poppins'] font-light text-[15px] placeholder:text-white/30 outline-none focus:border-white/80 transition-colors duration-300"
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-field w-full bg-transparent border-b border-white/15 text-white rounded-none py-4 px-0 font-['Poppins'] font-light text-[15px] placeholder:text-white/30 outline-none focus:border-white/80 transition-colors duration-300"
              />

              <div className="pt-8 form-field">
                <p className="font-['Poppins'] font-extralight text-[11px] text-white/40 mb-4 uppercase tracking-[0.15em]">
                  Size
                </p>
                <div className="flex gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-btn flex-1 py-[12px] font-['Poppins'] font-light text-[14px] transition-colors duration-200 rounded-[8px] border ${
                        selectedSize === size
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-white/50 border-white/20 hover:border-white/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-red-400/80 font-['Poppins'] font-light text-[13px] pt-4 form-field">
                  Please fill all fields.
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div ref={summaryRef} className="w-full md:w-2/5 p-8 md:p-14 flex flex-col justify-between bg-[#111111] md:border-l border-white/5">
            <div>
              <h2 className="text-[14px] font-['Poppins'] font-light text-white/50 tracking-[0.2em] uppercase mb-10">
                Order Summary
              </h2>
              
              <div className="flex items-center gap-6 mb-10">
                <img
                  src="https://i.ibb.co/BHM5MdGY/The-three-line-graphic-NOTFOREVERYONE-202606290057.jpg"
                  alt="Signature Oversized Tee"
                  className="w-[80px] h-[80px] rounded-[12px] object-cover"
                />
                <div className="font-['Poppins'] space-y-1">
                  <p className="font-light text-white text-[14px]">Signature Oversized Tee</p>
                  <p className="font-extralight text-[#1A4FFF] text-[14px]">400 MAD</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-8 mt-8">
                <div className="flex justify-between items-center font-['Poppins']">
                  <span className="text-[16px] font-light text-white">Total</span>
                  <span className="text-[18px] font-semibold text-white">400 MAD</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full h-[52px] mt-12 bg-[#1A4FFF] text-white font-['Poppins'] font-light text-[13px] tracking-[0.15em] uppercase rounded-[10px] hover:bg-[#2D5FFF] active:scale-[0.98] transition-all duration-300"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
