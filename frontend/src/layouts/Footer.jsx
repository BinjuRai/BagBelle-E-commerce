import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-dark">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 text-base secondary-font">

          {/* BRAND */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/src/assets/images/BagbelleLogo.svg" // update with your premium logo
                alt="Premium Bags Logo"
                className="w-28 cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-muted-dark leading-relaxed max-w-xs text-lg">
              Handcrafted luxury bags designed to elevate your style. Premium quality leather, timeless elegance.
            </p>
          </div>

          {/* ACCOUNT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-text-dark">My Account</h4>
            <ul className="space-y-3 text-muted-dark text-lg">
              <li><Link to="/login" className="hover:text-accent hover:underline transition-colors">Login</Link></li>
              <li><Link to="/cart" className="hover:text-accent hover:underline transition-colors">My Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-accent hover:underline transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* PAYMENT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-text-dark">Secure Payments</h4>
            <ul className="space-y-3 text-muted-dark text-lg">
              <li>Credit / Debit Card</li>
              <li>PayPal</li>
              <li>Bank Transfer</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-text-dark">
              <Link to="/contact" className="hover:underline text-accent">Contact Us</Link>
            </h4>
            <ul className="space-y-3 text-muted-dark text-lg">
              <li>
                📞 <a href="tel:+9779800000000" className="hover:underline hover:text-accent transition-colors">
                  +977 9800000000
                </a>
              </li>
              <li>
                ✉️ <a href="mailto:premiumbags@gmail.com" className="hover:underline hover:text-accent transition-colors">
                  premiumbags@gmail.com
                </a>
              </li>
              <li>📍 Lalitpur, Nepal</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-muted-dark my-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-dark secondary-font">

          <p>© 2025 Premium Bags — Lalitpur, Nepal</p>

          {/* SOCIALS */}
          <div className="flex gap-6">
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={22} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={22} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-accent transition-colors"><Youtube size={22} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
