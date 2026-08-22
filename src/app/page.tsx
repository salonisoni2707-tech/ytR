"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Neon Arcane Lamp",
    price: "₹1,499",
    category: "ROOM TECH",
    tag: "NEW DROP",
    emoji: "💡",
  },
  {
    id: 2,
    name: "Shadow Grid Desk Mat",
    price: "₹799",
    category: "DESK",
    tag: "TRENDING",
    emoji: "🎮",
  },
  {
    id: 3,
    name: "Moonlit Wall Frame",
    price: "₹999",
    category: "DECOR",
    tag: "LIMITED",
    emoji: "🌙",
  },
  {
    id: 4,
    name: "Cyber Bloom Planter",
    price: "₹649",
    category: "DECOR",
    tag: "HOT",
    emoji: "🌸",
  },
];

const categories = [
  { name: "Room Decor", icon: "🏠" },
  { name: "Desk Setup", icon: "🖥️" },
  { name: "Lighting", icon: "💡" },
  { name: "Wall Art", icon: "🖼️" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08080d] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        <div className="absolute right-[-15%] top-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* Announcement */}
      <div className="relative z-20 border-b border-white/5 bg-[#0d0d14] px-4 py-2 text-center text-[11px] tracking-[0.2em] text-white/60">
        ✦ FREE SHIPPING ON ORDERS ABOVE ₹999 ✦
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-[#08080d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-white/10 p-2 lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="group cursor-pointer">
              <div className="text-3xl font-black tracking-[-0.08em]">
                yt<span className="text-fuchsia-400">R</span>
              </div>
              <div className="hidden text-[7px] font-bold tracking-[0.3em] text-white/40 sm:block">
                YOUR TRENDY ROOM
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-white/60 lg:flex">
            <a className="text-white transition hover:text-fuchsia-400" href="#">
              Home
            </a>
            <a className="transition hover:text-fuchsia-400" href="#shop">
              Shop
            </a>
            <a className="transition hover:text-fuchsia-400" href="#categories">
              Categories
            </a>
            <a className="transition hover:text-fuchsia-400" href="#story">
              Our Story
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl p-2.5 text-white/70 transition hover:bg-white/5 hover:text-white">
              <Search size={20} />
            </button>

            <button className="relative rounded-xl p-2.5 text-white/70 transition hover:bg-white/5 hover:text-white">
              <Heart size={20} />
            </button>

            <button className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 transition hover:border-fuchsia-400/40">
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-5 text-sm text-white/70">
              <a href="#" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="#shop" onClick={() => setMenuOpen(false)}>
                Shop
              </a>
              <a href="#categories" onClick={() => setMenuOpen(false)}>
                Categories
              </a>
              <a href="#story" onClick={() => setMenuOpen(false)}>
                Our Story
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 px-4 py-2 text-[10px] font-bold tracking-[0.22em] text-fuchsia-300"
            >
              <Sparkles size={13} />
              MADE FOR YOUR VIBE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
            >
              Your room.
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                Your universe.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg"
            >
              Handmade pieces, aesthetic decor and setup essentials designed
              to turn your ordinary room into a space that actually feels like
              you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#shop"
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:scale-[1.02]"
              >
                Explore the drop
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3.5 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Browse categories
              </a>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-fuchsia-500/10 blur-[90px]" />

            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#191323] via-[#10101a] to-[#071319]">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />

              <div className="absolute left-[12%] top-[14%] rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs text-fuchsia-300 backdrop-blur">
                ✦ room energy
              </div>

              <div className="absolute right-[10%] top-[30%] rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300 backdrop-blur">
                +100 aura
              </div>

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] drop-shadow-[0_0_60px_rgba(217,70,239,.3)] sm:text-[190px]"
              >
                🎮
              </motion.div>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.25em] text-white/30">
                    DROP 001
                  </div>
                  <div className="mt-1 text-xl font-black">ROOM // MODE</div>
                </div>

                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/50 backdrop-blur">
                  01 / 04
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="relative z-10 border-y border-white/10 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-fuchsia-400">
                FIND YOUR VIBE
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                Shop by category
              </h2>
            </div>

            <a
              href="#shop"
              className="hidden items-center gap-1 text-xs font-bold text-white/40 transition hover:text-white sm:flex"
            >
              View all <ChevronRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                whileHover={{ y: -4 }}
                key={category.name}
                href="#shop"
                className="group rounded-2xl border border-white/10 bg-[#101017] p-5 transition hover:border-fuchsia-400/30"
              >
                <div className="text-3xl">{category.icon}</div>
                <div className="mt-8 text-sm font-bold">{category.name}</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-white/30 transition group-hover:text-fuchsia-300">
                  EXPLORE <ArrowRight size={11} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="shop"
        className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-fuchsia-400">
              <Sparkles size={12} />
              THE LATEST DROP
            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Made to stand out.
            </h2>
          </div>

          <button className="hidden items-center gap-1 text-sm font-bold text-white/40 transition hover:text-white sm:flex">
            Shop all <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -5 }}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111119]">
                <div className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[8px] font-bold tracking-wider backdrop-blur">
                  {product.tag}
                </div>

                <button className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white/50 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:text-white">
                  <Heart size={14} />
                </button>

                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 4 }}
                    className="text-7xl drop-shadow-[0_0_35px_rgba(217,70,239,.18)] sm:text-8xl"
                  >
                    {product.emoji}
                  </motion.div>
                </div>

                <button
                  onClick={() => setCartCount((count) => count + 1)}
                  className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-xl bg-white py-3 text-xs font-black text-black opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                >
                  + ADD TO CART
                </button>
              </div>

              <div className="pt-4">
                <div className="text-[9px] font-bold tracking-[0.2em] text-white/30">
                  {product.category}
                </div>

                <h3 className="mt-1 text-sm font-bold sm:text-base">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-black">{product.price}</span>

                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <Star size={11} fill="currentColor" />
                    4.9
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="relative z-10 px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#17121e] to-[#0c1116]">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-300">
                WHY YTR EXISTS
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Your space should feel like{" "}
                <span className="text-fuchsia-400">you.</span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                ytR started with one simple idea: your room isn't just four
                walls. It's where you create, play, dream, work and become
                yourself.
              </p>

              <button className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white">
                Discover our story <ArrowRight size={16} />
              </button>
            </div>

            <div className="relative min-h-[320px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10" />

              <div className="absolute left-[15%] top-[18%] text-6xl">🌙</div>
              <div className="absolute right-[18%] top-[25%] text-5xl">🌸</div>
              <div className="absolute bottom-[15%] left-[28%] text-7xl">🪴</div>
              <div className="absolute bottom-[20%] right-[20%] text-6xl">🎧</div>

              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <div className="text-2xl font-black tracking-[-0.08em]">
              yt<span className="text-fuchsia-400">R</span>
            </div>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-white/25">
              YOUR TRENDY ROOM
            </p>
          </div>

          <div className="text-xs text-white/30">
            Made for rooms with personality. © 2026 ytR.
          </div>
        </div>
      </footer>
    </main>
  );
}