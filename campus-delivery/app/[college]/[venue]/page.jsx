"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Plus, Minus, Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const MENU_DATA = {
  categories: ["Popular", "Main Course", "Snacks", "Drinks"],
  items: [
    { id: 1, name: "Paneer Butter Masala", price: 180, category: "Main Course", rating: 4.8, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300" },
    { id: 2, name: "Crispy Veg Burger", price: 99, category: "Popular", rating: 4.5, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300" },
    { id: 3, name: "Cold Coffee", price: 60, category: "Drinks", rating: 4.9, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300" },
    { id: 4, name: "French Fries", price: 80, category: "Snacks", rating: 4.2, img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=300" },
    { id: 5, name: "Masala Dosa", price: 120, category: "Popular", rating: 4.7, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300" },
  ]
};

export default function VenueMenu() {
  const params = useParams();
  const venue = params.venue?.toUpperCase();
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("Popular");
  const [cart, setCart] = useState({}); // { itemId: quantity }

  // 1. PULL DATA LOGIC: Calculate detailed cart for the checkout page
  const { totalItems, totalPrice, cartDetails } = useMemo(() => {
    const details = Object.entries(cart).map(([id, qty]) => {
      const item = MENU_DATA.items.find(i => i.id === parseInt(id));
      return { ...item, qty };
    });

    const totals = details.reduce((acc, item) => ({
      totalItems: acc.totalItems + item.qty,
      totalPrice: acc.totalPrice + (item.price * item.qty)
    }), { totalItems: 0, totalPrice: 0 });

    return { ...totals, cartDetails: details };
  }, [cart]);

  // 2. CHECKOUT HANDLER: Save to localStorage and redirect
  const handleCheckout = () => {
    if (totalItems > 0) {
      localStorage.setItem('campus_cart', JSON.stringify(cartDetails));
      localStorage.setItem('campus_total', totalPrice.toString());
      router.push('/cart');
    }
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const filteredItems = MENU_DATA.items.filter(item => item.category === activeCat);

  return (
    <div className="min-h-screen bg-[#FFD54F] font-sans">
      {/* HEADER */}
      <header className="p-4 flex items-center justify-between sticky top-0 bg-[#FFD54F] z-30">
        <button onClick={() => router.back()} className="bg-white p-3 text-gray-500 rounded-2xl shadow-lg">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="font-black text-3xl uppercase italic tracking-tighter">{venue}</h1>
          <p className="text-[14px] font-bold text-red-600 tracking-widest uppercase">Menu Selection</p>
        </div>
        <div className="w-12" />
      </header>

      <div className="bg-white m-2 md:mx-6 rounded-t-[3rem] min-h-[calc(100vh-100px)] p-6 pb-32">
        {/* CATEGORY SELECTOR */}
        <div className="flex gap-3 pl-3 overflow-x-auto pb-6 no-scrollbar">
          {MENU_DATA.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-3 rounded-2xl font-black text-xs whitespace-nowrap transition-all ${
                activeCat === cat ? 'bg-black text-white scale-105 shadow-xl' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ITEMS LIST */}
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-[2rem] border border-transparent hover:border-yellow-200 transition-all"
              >
                <img src={item.img} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shadow-md" />
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold">{item.rating}</span>
                  </div>
                  <h3 className="font-black text-gray-900 leading-tight uppercase text-sm mb-1">{item.name}</h3>
                  <p className="font-bold text-red-600 text-lg">₹{item.price}</p>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex flex-col items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateCart(item.id, 1)}
                    className="p-2 bg-yellow-400 rounded-xl text-black"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </motion.button>
                  
                  <span className={`font-black ${cart[item.id] ? 'text-black' : 'text-gray-200'} text-sm w-6 text-center`}>
                    {cart[item.id] || 0}
                  </span>

                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => updateCart(item.id, -1)}
                    disabled={!cart[item.id]}
                    className={`p-2 rounded-xl transition-colors ${cart[item.id] ? 'bg-gray-100 text-black' : 'text-gray-200'}`}
                  >
                    <Minus size={18} strokeWidth={3} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* FLOATING CART BAR */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 w-full md:w-1/2 md:left-1/4 px-4 z-50"
          >
            <div className="bg-black rounded-[2.5rem] p-4 flex items-center justify-between shadow-2xl border border-white/10">
              <div className="flex items-center gap-4 pl-4">
                <div className="relative">
                  <ShoppingBag className="text-white" size={28} />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">Total Amount</p>
                  <p className="text-white text-xl font-black italic">₹{totalPrice}</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                className="bg-red-600 text-white px-8 py-4 rounded-[1.8rem] font-black text-sm tracking-tight hover:bg-red-700 transition-colors"
              >
                CHECKOUT
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}