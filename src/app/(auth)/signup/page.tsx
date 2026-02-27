import React from "react";
import RegisterForm from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";
import DotGrid from "@/components/DotGrid";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  await requireUnauth();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0">
        <DotGrid dotSize={5}
        gap={13}
        baseColor="#271E37"
        activeColor="#dc7718"
        proximity={120}
        shockRadius={250}
        shockStrength={0.35}
        returnDuration={1.5} />
          </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="p-8 sm:p-10 rounded-3xl 
                        bg-slate-900/70 
                        backdrop-blur-2xl 
                        border border-slate-700/40 
                        shadow-2xl shadow-black/60">

          {/* Logo + Heading */}
          <div className="flex flex-col items-center gap-4 mb-8 text-center">
            <Link href="/" className="group">
              <div className="relative p-4 rounded-2xl bg-slate-800 border border-slate-600/40">
                <Image
                  src="/logos/logo.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                />
                <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            <h1 className="text-2xl font-bold text-white">
              Welcome back to{" "}
              <span className="text-orange-500 italic">N8N</span>
            </h1>

            <p className="text-sm text-slate-400">
              Log in to continue automating.
            </p>
          </div>

          <RegisterForm />

        </div>
      </div>

    </div>
  );
};

export default page;