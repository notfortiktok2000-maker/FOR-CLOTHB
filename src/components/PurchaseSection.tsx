import { useState } from "react";

interface PurchaseSectionProps {
  onAddToCart: (size: string, quantity: number) => void;
}

export function PurchaseSection({ onAddToCart }: PurchaseSectionProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const sizes = ["S", "M", "L", "XL"];

  return (
    <section id="purchase" className="relative w-full py-32 bg-black flex flex-col lg:flex-row items-center justify-center gap-16 px-8 max-w-7xl mx-auto">
      {/* Product Image */}
      <div 
        className="w-full lg:w-1/2 relative bg-[#0A0A0A] border border-white/5 overflow-hidden group cursor-none flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10 pointer-events-none"></div>
        <img
          src="https://i.ibb.co/BHM5MdGY/The-three-line-graphic-NOTFOREVERYONE-202606290057.jpg"
          alt="NOTFOREVERYONE T-Shirt"
          className="relative z-20 w-full max-w-[500px] object-contain object-center"
        />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col items-start space-y-12">
        <div>
          <h2 className="text-3xl font-light tracking-[0.1em] mb-2">Signature Oversized Tee</h2>
          <p className="text-xl font-thin text-white/70">400 MAD</p>
        </div>

        {/* Size Selector */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center text-xs tracking-widest uppercase font-light text-white/50">
            <span>Select Size</span>
            <span className="cursor-pointer hover:text-white clickable">Size Guide</span>
          </div>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center text-sm font-light transition-all duration-300 clickable ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "bg-transparent border border-white/20 text-white hover:border-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="w-full space-y-8">
          <div className="flex items-center gap-6">
            <span className="text-xs tracking-widest uppercase font-light text-white/50">Quantity</span>
            <div className="flex items-center gap-4 border border-white/20 px-4 py-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-white/50 hover:text-white clickable p-1"
              >-</button>
              <span className="w-8 text-center text-sm font-light">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-white/50 hover:text-white clickable p-1"
              >+</button>
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedSize) {
                onAddToCart(selectedSize, quantity);
              } else {
                alert("Please select a size");
              }
            }}
            className="group relative w-full py-5 bg-transparent border border-white overflow-hidden clickable"
          >
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-light mix-blend-difference text-white">
              Add to Cart
            </span>
            <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
}
