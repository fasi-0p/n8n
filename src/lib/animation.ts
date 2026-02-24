import gsap from "gsap";
import Lenis from "lenis";

export const initSmoothScroll = () => {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};

export const fadeUp = (selector: string) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
  );
};