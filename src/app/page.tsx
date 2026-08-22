"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    name: "Mini Racer Wall Art",
    category: "WALL DECOR",
    price: "₹899",
    image: "🚗",
    size: "tall",
  },
  {
    name: "Handmade Cloud Piece",
    category: "HANDMADE",
    price: "₹699",
    image: "☁️",
    size: "normal",
  },
  {
    name: "Retro Cotton Frame",
    category: "TEXTILE ART",
    price: "₹799",
    image: "🖼️",
    size: "normal",
  },
  {
    name: "Cherry Room Charm",
    category: "DECOR",
    price: "₹499",
    image: "🍒",
    size: "tall",
  },
];

const categories = [
  "Wall Decor",
  "Handmade",
  "Car Culture",
  "Textile Art",
  "Personalized",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f2ec] text-[#111]">
      {/* TOP BAR */}
      <div className="bg-[#111] px-4 py-2 text-center text-[10px] font-bold tracking-[0.25em] text-white">
        FREE SHIPPING ON ORDERS ABOVE ₹999 ✦ MADE WITH LOVE
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f5f2ec]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            className="rounded-full border border-black/10 p-2 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center lg:static lg:translate-x-0">
            <div className="text-3xl font-black tracking-[-0.09em]">
              yt<span className="text-[#ff4f91]">R</span>
            </div>
            <div className="hidden text-[7px] font-bold tracking-[0.28em] text-black/40 sm:block">
              YOUR TRENDY ROOM
            </div>
          </div>

          <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-wider lg:flex">
            <a href="#" className="hover:opacity-50">
              Home
            </a>
            <a href="#shop" className="hover:opacity-50">
              Shop
            </a>
            <a href="#categories" className="hover:opacity-50">
              Categories
            </a>
            <a href="#story" className="hover:opacity-50">
              Our Story
            </a>
          </div>

          <div className="flex items-center gap-1">
            <button className="rounded-full p-2.5 hover:bg-black/5">
              <Search size={19} />
            </button>

            <button className="hidden rounded-full p-2.5 hover:bg-black/5 sm:block">
              <Heart size={19} />
            </button>

            <button className="relative rounded-full bg-[#111] p-2.5 text-white">
              <ShoppingBag size={18} />
              {cart > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4f91] text-[9px] font-black">
                  {cart}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold">
              <a href="#">Home</a>
              <a href="#shop">Shop</a>
              <a href="#categories">Categories</a>
              <a href="#story">Our Story</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[9px] font-black tracking-[0.2em]"
            >
              <Sparkles size={12} />
              FOR ROOMS WITH PERSONALITY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl text-[58px] font-black leading-[0.87] tracking-[-0.065em] sm:text-7xl lg:text-[100px]"
            >
              YOUR ROOM.
              <br />
              <span className="text-[#ff4f91]">YOUR RULES.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-7 max-w-md text-sm leading-6 text-black/55 sm:text-base"
            >
              Handmade pieces, weird little finds and statement decor for
              people who refuse to have a boring room.
            </motion.p>

            <motion.a
              href="#shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-4 text-xs font-black text-white transition hover:scale-105"
            >
              SHOP THE DROP
              <ArrowUpRight size={15} />
            </motion.a>
          </div>

          {/* HERO COLLAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[450px]"
          >
            <div className="absolute right-0 top-0 h-[330px] w-[75%] rotate-2 rounded-[2rem] bg-[#d9c9ff] p-5 shadow-xl">
              <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-black/10 bg-[#ede6ff]">
                <span className="text-[130px]">🚗</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-10 h-[240px] w-[55%] -rotate-3 rounded-[2rem] bg-[#ffc8dd] p-5 shadow-xl">
              <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-black/10 bg-[#ffe5ef]">
                <span className="text-[100px]">🌸</span>
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[5%] z-20 rounded-full bg-[#ffdf4d] px-5 py-4 text-center text-[9px] font-black uppercase tracking-wider shadow-lg">
              make
              <br />
              it yours ✦
            </div>

            <div className="absolute left-[4%] top-[8%] z-20 rotate-[-8deg] rounded-full bg-[#111] px-5 py-3 text-[9px] font-black text-white shadow-lg">
              NOT BASIC.
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-black/10 bg-[#ff4f91] py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-10 whitespace-nowrap text-xs font-black tracking-[0.18em]"
        >
          <span>MAKE YOUR SPACE YOURS ✦</span>
          <span>HANDMADE WITH ATTITUDE ✦</span>
          <span>NO BORING WALLS ✦</span>
          <span>MAKE YOUR SPACE YOURS ✦</span>
          <span>HANDMADE WITH ATTITUDE ✦</span>
          <span>NO BORING WALLS ✦</span>
        </motion.div>
      </div>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-black tracking-[0.25em] text-[#ff4f91]">
              FIND YOUR THING
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Shop by vibe.
            </h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <a
              key={category}
              href="#shop"
              className={`whitespace-nowrap rounded-full border px-5 py-3 text-[10px] font-black uppercase tracking-wider transition hover:bg-[#111] hover:text-white ${
                index === 0
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-black/10 bg-white/50"
              }`}
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="shop" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-black tracking-[0.25em] text-[#ff4f91]">
              CURRENTLY OBSESSED
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.04em]">
              Cool stuff only.
            </h2>
          </div>

          <button className="hidden rounded-full border border-black/10 px-5 py-3 text-[10px] font-black sm:block">
            VIEW ALL →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div
                className={`group relative overflow-hidden rounded-[1.5rem] ${
                  index === 0 || index === 3
                    ? "aspect-[4/5]"
                    : "aspect-square"
                } ${
                  index % 4 === 0
                    ? "bg-[#dce5ff]"
                    : index % 4 === 1
                      ? "bg-[#ffe0e9]"
                      : index % 4 === 2
                        ? "bg-[#e7e0ff]"
                        : "bg-[#d8f1e8]"
                }`}
              >
                <button className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Heart size={14} />
                </button>

                <div className="flex h-full items-center justify-center transition duration-500 group-hover:scale-110">
                  <span className="text-8xl">{product.image}</span>
                </div>

                <button
                  onClick={() => setCart((value) => value + 1)}
                  className="absolute bottom-3 left-3 right-3 rounded-full bg-[#111] py-3 text-[9px] font-black text-white opacity-0 transition group-hover:opacity-100"
                >
                  + ADD TO BAG
                </button>
              </div>

              <div className="pt-4">
                <p className="text-[8px] font-black tracking-[0.2em] text-black/35">
                  {product.category}
                </p>

                <h3 className="mt-1 text-sm font-black">{product.name}</h3>

                <div className="mt-2 text-sm font-bold">{product.price}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="bg-[#111] px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[9px] font-black tracking-[0.3em] text-[#ff4f91]">
            THE YTR PHILOSOPHY
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            YOUR ROOM
            <br />
            SHOULDN&apos;T LOOK
            <br />
            <span className="text-[#ffdf4d]">LIKE EVERYONE ELSE&apos;S.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-lg text-sm leading-6 text-white/45">
            We find and make pieces that give your space a little more
            personality. Because basic is overrated.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[9px] font-black tracking-[0.25em] text-[#ff4f91]">
              ABOUT YTR
            </p>

            <h2 className="mt-4 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.05em]">
              For people who care about the little things.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-black/50">
              ytR — Your Trendy Room — is a place for the pieces that make you
              stop scrolling and think, “okay, I need that.”
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-[#dce5ff] text-7xl">
              🪩
            </div>
            <div className="mt-8 flex aspect-square items-center justify-center rounded-[2rem] bg-[#ffcbdc] text-7xl">
              🧸
            </div>
            <div className="-mt-8 flex aspect-square items-center justify-center rounded-[2rem] bg-[#ffdf4d] text-7xl">
              🏎️
            </div>
            <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-[#d8f1e8] text-7xl">
              🌷
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#ff4f91] px-6 py-12 text-center sm:px-12">
          <h2 className="text-4xl font-black tracking-[-0.04em]">
            Be the cool friend.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm text-black/60">
            New drops, weird finds and room inspiration. Straight to your
            inbox.
          </p>

          <div className="mx-auto mt-7 flex max-w-md rounded-full bg-white p-1.5">
            <input
              placeholder="your@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-xs outline-none"
            />
            <button className="rounded-full bg-[#111] px-5 py-3 text-[9px] font-black text-white">
              JOIN →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-4xl font-black tracking-[-0.09em]">
              yt<span className="text-[#ff4f91]">R</span>
            </div>
            <p className="mt-1 text-[8px] font-bold tracking-[0.3em] text-black/35">
              YOUR TRENDY ROOM
            </p>
          </div>

          <p className="text-[10px] text-black/35">
            © 2026 ytR. Made for rooms with personality.
          </p>
        </div>
      </footer>
    </main>
  );
}