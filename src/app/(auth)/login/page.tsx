import React from "react";
import LoginForm from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  await requireUnauth();

  return (
    // Forced dark background (Slate 900)
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-slate-900 font-sans text-slate-200">
      
      {/* --- VISUAL BACKGROUND ELEMENTS --- */}
      {/* 1. Subtle Developer Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Ambient Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      {/* Frosted Glass Card */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8 p-8 sm:p-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/50">
        
        {/* LOGO AREA */}
        <div className="flex flex-col items-center gap-2">
          <Link 
            href="/" 
            className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
          >
            {/* Logo box with subtle hover glow */}
            <div className="relative flex items-center justify-center p-4 bg-slate-800/80 rounded-2xl shadow-inner border border-slate-600/50">
              <Image src="/logos/logo.svg" alt="n8n" width={50} height={50} className="relative z-10" />
              <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Welcome back to <span className="text-orange-500 italic">N8N</span>
            </h1>
          </Link>
          <p className="text-sm text-slate-400 font-medium text-center mt-1">
            Log in to continue automating.
          </p>
        </div>

        {/* FORM */}
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
      
    </div>
  );
};

export default page;