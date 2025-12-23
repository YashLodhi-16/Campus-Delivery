"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { University, School, GraduationCap, MapPin, ArrowRight, Check } from 'lucide-react';

export default function SelectCollege() {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [isExiting, setIsExiting] = useState(false);

    const colleges = [
        { id: 1, name: "DTU", location: "Main Campus", icon: <School className="w-8 h-8" /> },
        { id: 2, name: "IGDTUW", location: "Kashmere Gate", icon: <University className="w-8 h-8" /> },
        { id: 3, name: "IIIT", location: "Okhla,Delhi", icon: <GraduationCap className="w-8 h-8" /> },
        { id: 4, name: "NSUT", location: "Dwarka", icon: <MapPin className="w-8 h-8" /> },
    ];

    const handleContinue = () => {
        if (selected) {
            const selectedCollege = colleges.find(c => c.id === selected);
            setIsExiting(true);
            setTimeout(() => {
                router.push(`/${selectedCollege.name.toLowerCase()}`);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFD54F] overflow-hidden relative font-sans p-4">

            {/* --- FLOATING BUBBLE BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "120vh", x: Math.random() * 100 + "vw" }}
                        animate={{
                            y: "-20vh",
                            x: [null, (Math.random() - 0.5) * 200 + "px"] // S-Curve drifting
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.8
                        }}
                        className="absolute opacity-30"
                    >
                        <div className="w-12 h-12 bg-white rounded-full blur-sm shadow-xl flex items-center justify-center">
                            <University size={20} className="text-orange-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                        className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-8 z-10 border border-white"
                    >
                        <div className="text-center mb-10">
                            <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-3xl font-black tracking-widest uppercase">
                                SELECT COLLEGE
                            </span>
                            {/* <h1 className="text-4xl font-black text-gray-900 mt-4 italic">SELECT COLLEGE</h1> */}
                            <p className="text-gray-500 font-medium mt-2">Where should we deliver your happiness?</p>
                        </div>

                        {/* COLLEGE GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            {colleges.map((college) => (
                                <motion.button
                                    key={college.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected(college.id)}
                                    className={`relative p-2 md:p-4 rounded-3xl text-left transition-all border-4 ${selected === college.id
                                            ? 'border-red-500 bg-red-50 ring-4 ring-red-100'
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${selected === college.id ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
                                        }`}>
                                        {college.icon}
                                    </div>

                                    <h3 className="font-black text-gray-900 text-lg uppercase leading-tight">
                                        {college.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm font-bold flex items-center gap-1 mt-1">
                                        <MapPin size={12} /> {college.location}
                                    </p>

                                    {selected === college.id && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1">
                                            <Check size={16} strokeWidth={4} />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* CONTINUE BUTTON */}
                        <motion.button
                            disabled={!selected}
                            onClick={handleContinue}
                            whileHover={selected ? { scale: 1.02, backgroundColor: '#dc2626' } : {}}
                            whileTap={selected ? { scale: 0.98 } : {}}
                            className={`w-full py-4 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-2xl ${selected
                                    ? 'bg-red-600 text-white shadow-red-200 cursor-pointer'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            FINALIZE SELECTION <ArrowRight size={24} />
                        </motion.button>

                        <p className="text-center text-gray-400 text-[10px] font-bold mt-2 tracking-widest uppercase">
                            Not seeing your college? <span className="text-red-500 underline cursor-pointer">Contact Support</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}