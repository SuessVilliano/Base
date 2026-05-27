"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="fixed bottom-5 right-5 z-40 lg:bottom-8 lg:right-8"
        >
          <Link
            href="/book"
            className="group flex items-center gap-2 rounded-full bg-base-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(30,91,255,0.6)] transition-all hover:bg-base-blue-600"
          >
            <Calendar size={16} />
            <span>Book a Space</span>
            <span className="ml-1 inline-block translate-x-0 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
