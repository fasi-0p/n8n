"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import AutomationScene from "@/components/hero/AutomationScene";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    /* ---------------- HERO INTRO ---------------- */

    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );

    /* ---------------- FLOATING PANELS ---------------- */

    gsap.to(".glass-panel", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* ---------------- LUXURY SCROLL MOTION ---------------- */

    gsap.utils.toArray(".parallax-section").forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0.4, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            scrub: true,
          },
        }
      );
    });

    /* ---------------- CINEMATIC DEPTH MOMENT ---------------- */

    gsap.fromTo(
      ".stats-section",
      { scale: 0.96, opacity: 0.6 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 75%",
          scrub: true,
        },
      }
    );

    /* ---------------- COUNTERS ---------------- */

    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-value"));

      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
        }
      );
    });

    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-black text-white">

      {/* ---------------- HERO ---------------- */}

      <section className="relative h-screen w-full overflow-hidden">
        <AutomationScene />

        <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Orchestrate Everything
          </h1>

          <p className="mt-6 text-lg text-white/50">
            Build logic. Control workflows. Scale systems.
          </p>

          <div className="mt-10 flex gap-6">
            <div className="glass-panel backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white/60">
              Visual Logic Builder
            </div>

            <div className="glass-panel backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white/60">
              Infinite Integrations
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="rounded-lg bg-white px-6 py-3 text-black transition hover:scale-105"
            >
              Sign Up
            </button>

            <button
              onClick={() => router.push("/signin")}
              className="rounded-lg border border-white/20 px-6 py-3 transition hover:border-cyan-400"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- STORY SECTION ---------------- */}

      <section className="parallax-section h-screen flex items-center justify-center text-white/40">
        Complexity Made Invisible
      </section>

      {/* ---------------- STATS (CINEMATIC MOMENT) ---------------- */}

      <section className="stats-section relative py-32">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-4xl font-semibold text-center mb-20">
            Built for Scale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="stat-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="stat-number text-4xl font-semibold" data-value="1280">
                0
              </div>
              <div className="text-white/50 mt-2">
                Workflows Executed
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="stat-number text-4xl font-semibold" data-value="96">
                0
              </div>
              <div className="text-white/50 mt-2">
                Active Automations
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="stat-number text-4xl font-semibold" data-value="24">
                0
              </div>
              <div className="text-white/50 mt-2">
                Integrations Connected
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- CLOSING ---------------- */}

      <section className="parallax-section h-screen flex items-center justify-center text-white/30">
        Precision. Power. Control.
      </section>

    </main>
  );
}