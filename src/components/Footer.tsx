import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto py-6 bg-gradient-to-br from-black via-[#1a1a1a] to-[#3a2a1a] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="p-5 rounded-xl backdrop-blur-md border border-white/10 shadow-xl bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Side */}
          <div className="text-center sm:text-left">
            <div className="font-bold text-lg bg-gradient-to-r from-yellow-400 via-amber-300 to-pink-400 bg-clip-text text-transparent">
              DishQo — A Flavored Way To Live
            </div>
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} DishQo Cake. All rights reserved.
            </p>
          </div>

          {/* Right Side */}
          <nav aria-label="Footer" className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a href="https://facebook.com/dish_qo" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1.5 2.9v7A10 10 0 0 0 22 12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/dish_qo" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-pink-400 hover:text-black transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/233553437570" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-green-400 hover:text-black transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .2 5 0 11.5c0 2 .5 3.8 1.5 5.5L0 24l7.2-1.9a11.4 11.4 0 0 0 4.8 1c6.6 0 11.8-5 12-11.5 0-3.2-1.3-6.2-3.5-8.1zM12 21.5c-1.4 0-2.8-.3-4.1-.9L5 20l.4-2.6A8.5 8.5 0 0 1 3.5 11.5 8.4 8.4 0 0 1 12 3.1c4.6 0 8.4 3.7 8.4 8.4 0 4.6-3.7 8.4-8.4 8.4z" />
                </svg>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-3 text-xs text-white/70">
              <Link href="/shop" className="hover:text-yellow-400 transition-colors">Shop</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
              <Link href="/order-success" className="hover:text-yellow-400 transition-colors">Orders</Link>
            </div>
          </nav>
        </div>

        {/* Signature */}
        <p className="text-[9px] text-white/40 italic tracking-wider text-right mt-2">
          dishqo signature
        </p>
      </div>
    </footer>
  );
}
