"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import HomeLoader from "./components/home-loader"

export default function Home() {
  const router = useRouter()
  const [subloading, setsubLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setsubLoading(true)

    setTimeout(() => {
      router.push("/signup")
    }, 800)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <HomeLoader />

  return (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-400 flex items-center justify-center px-4">

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
    >

      {/* 🟡 LEFT SIDE — BRAND / BANNER */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-yellow-300 to-yellow-400 p-8 flex flex-col justify-center items-center text-center"
      >
        <img
          src="/images/banner.png"
          alt="Campus Delivery"
          className="w-64 lg:w-72 rounded-2xl shadow-lg"
        />

        <h1 className="mt-6 text-2xl lg:text-3xl font-extrabold text-gray-900">
          Campus #1 Delivery Website
        </h1>

        <p className="mt-2 text-gray-800 text-sm max-w-sm">
          Fast, reliable delivery right inside your campus.
          One number. One OTP. Done.
        </p>

        {/* subtle decorative bar */}
        <div className="mt-6 w-16 h-1 rounded-full bg-red-500" />
      </motion.div>

      {/* ⚪ RIGHT SIDE — LOGIN FORM */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-8 flex flex-col justify-center"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto w-full">

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Login / Sign up
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              We’ll verify you with OTP
            </p>
          </div>

          {/* NUMBER */}
          <div className="relative">
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="Phone Number"
              className="peer w-full rounded-xl border border-gray-600 px-4 py-3 text-center text-lg focus:outline-none text-black focus:ring-2 focus:ring-yellow-400"
            /> 
          </div>

          {/* OTP */}
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              required
              placeholder="OTP"
              className="peer w-full rounded-xl border border-gray-600 px-4 py-3 text-center text-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            /> 
          </div>

          {/* NOTE */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-md text-xs text-gray-700">
            <b>NOTE:</b> This number will be used for delivery calls and cannot be
            changed later.
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
          >
            CONTINUE
          </motion.button>
        </form>
      </motion.div>

    </motion.div>
  </div>
)

}
