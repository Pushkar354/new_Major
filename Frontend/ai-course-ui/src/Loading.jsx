import React from "react";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div absolute top-0   className="h-screen w-full flex flex-col items-center justify-center bg-black text-white z-100">


      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-indigo-400 mb-8 tracking-wide"
      >
        AI CourseLab
      </motion.h1>

      
      <div className="relative flex items-center justify-center">

        
        <div className="absolute w-24 h-24 rounded-full bg-indigo-500 blur-2xl opacity-20"></div>

        
        <motion.div
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

      </div>

     
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm mt-6"
      >
        Generating your AI-powered course...
      </motion.p>

    </div>
  )}