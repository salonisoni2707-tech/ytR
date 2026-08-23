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
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const demoProducts = [
  {
    id: "demo-1",
    name: "Racer Wall Piece",
    category: "WALL / 01",
    price: "₹899",
    visual: "🏎️",
    bg: "from-zinc-900 to-violet-950",
    image_url: null,
  },
  {
    id: "demo-2",
    name: "Cloud Nine",
    category: "HANDMADE / 02",
    price: "₹699",
    visual: "☁️",
    bg: "from-neutral-900 to-slate-800",
    image_url: null,
  },
  {
    id: "demo-3",
    name: "Retro Frame",
    category: "WALL / 03",
    price: "₹799",
    visual: "🖼️",
    bg: "from-zinc-900 to-emerald-950",
    image_url: null,
  },
  {
    id: "demo-4",
    name: "Cherry Bomb",
    category: "DECOR / 04",
    price: "₹499",
    visual: "🍒",
    bg: "from-neutral-900 to-red-950",
    image_url: null,
  },
];

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  visual: string;
  bg: string;
  image_url: string | null;
};

const categories = [
  "ALL",
  "WALL DECOR",
  "HANDMADE",
  "CAR CULTURE",
  "TEXTILE",
  "CUSTOM",
];

type CartItem = {
  name: string;
  price: number;
  visual: string;
  quantity: number;
};

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);
  const [products, setProducts] = useState<Product[]>(demoProducts);

  useEffect(() => {
    const savedCart = localStorage.getItem("ytr-cart");

    if (savedCart) {
      try {
        const items: CartItem[] = JSON.parse(savedCart);

        setCart(
          items.reduce(
            (sum, item) => sum + item.quantity,
            0
          )
        );
      } catch {
        localStorage.removeItem("ytr-cart");
      }
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase products error:", error);
        return;
      }

      if (!data || data.length === 0) {
        setProducts(demoProducts);
        return;
      }

      const formattedProducts: Product[] = data.map(
        (product, index) => ({
          id: product.id,
          name: product.name,
          category: `${product.category} / ${String(
            index + 1
          ).padStart(2, "0")}`,
          price: `₹${Number(product.price).toLocaleString(
            "en-IN"
          )}`,
          visual: "✦",
          bg:
            index % 4 === 0
              ? "from-zinc-900 to-violet-950"
              : index % 4 === 1
                ? "from-neutral-900 to-slate-800"
                : index % 4 === 2
                  ? "from-zinc-900 to-emerald-950"
                  : "from-neutral-900 to-red-950",
          image_url: product.image_url,
        })
      );

      setProducts(formattedProducts);
    };

    loadProducts();
  }, []);

  const addToCart = (product: Product) => {
    const existing: CartItem[] = JSON.parse(
      localStorage.getItem("ytr-cart") || "[]"
    );

    const found = existing.find(
      (item) => item.name === product.name
    );

    if (found) {
      found.quantity += 1;
    } else {
      existing.push({
        name: product.name,
        price: Number(
          product.price.replace(/[₹,]/g, "")
        ),
        visual: product.visual,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "ytr-cart",
      JSON.stringify(existing)
    );

    setCart(
      existing.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-[#f2f0ea] selection:bg-lime-300 selection:text-black">

      {/* GRAIN */}
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')]" />

      {/* TOP TICKER */}
      <div className="border-b border-white/10 bg-[#0c0c0c] py-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-10 whitespace-nowrap text-[9px] font-black tracking-[0.28em] text-white/50"
        >
          <span>
            YOUR TRENDY ROOM ✦ NO BASIC ROOMS ✦ MADE TO STAND OUT ✦
          </span>
          <span>
            YOUR TRENDY ROOM ✦ NO BASIC ROOMS ✦ MADE TO STAND OUT ✦
          </span>
          <span>
            YOUR TRENDY ROOM ✦ NO BASIC ROOMS ✦ MADE TO STAND OUT ✦
          </span>
        </motion.div>
      </div>

      {/* NAV */}
      <nav className="relative z-50 border-b border-white/10 bg-[#070707]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">

          <button
            onClick={() => setMenu(!menu)}
            className="rounded-full border border-white/10 p-2 lg:hidden"
          >
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-[38px] font-black leading-none tracking-[-0.12em]">
              yt<span className="text-lime-300">R</span>
            </div>

            <div className="hidden border-l border-white/10 pl-4 text-[8px] font-bold leading-3 tracking-[0.2em] text-white/30 sm:block">
              YOUR
              <br />
              TRENDY
              <br />
              ROOM
            </div>
          </div>

          <div className="hidden items-center gap-8 text-[10px] font-black tracking-[0.16em] lg:flex">
            <a className="text-lime-300" href="#">
              INDEX
            </a>

            <a
              className="text-white/50 transition hover:text-white"
              href="#shop"
            >
              SHOP
            </a>

            <a
              className="text-white/50 transition hover:text-white"
              href="#categories"
            >
              OBJECTS
            </a>

            <a
              className="text-white/50 transition hover:text-white"
              href="#story"
            >
              WORLD
            </a>
          </div>

          <div className="flex items-center gap-1">

            <button className="rounded-full p-2.5 text-white/60 hover:bg-white/5 hover:text-white">
              <Search size={18} />
            </button>

            <button className="hidden rounded-full p-2.5 text-white/60 hover:bg-white/5 hover:text-white sm:block">
              <Heart size={18} />
            </button>

            {/* CART */}
            <Link
              href="/cart"
              className="relative rounded-full border border-white/10 bg-white/[0.04] p-2.5"
            >
              <ShoppingBag size={18} />

              {cart > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime-300 text-[9px] font-black text-black">
                  {cart}
                </span>
              )}
            </Link>

          </div>
        </div>

        {menu && (
          <div className="border-t border-white/10 px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-xs font-black tracking-widest">
              <a href="#">INDEX</a>
              <a href="#shop">SHOP</a>
              <a href="#categories">OBJECTS</a>
              <a href="#story">WORLD</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 lg:px-8 lg:pt-24">

        <div className="absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[140px]" />

        <div className="absolute left-[-15%] top-[35%] h-[350px] w-[350px] rounded-full bg-lime-300/[0.04] blur-[120px]" />

        <div className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">

          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-3 text-[9px] font-black tracking-[0.3em] text-lime-300"
            >
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_15px_#bef264]" />
              YOUR SPACE / YOUR RULES
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="text-[62px] font-black uppercase leading-[0.78] tracking-[-0.075em] sm:text-8xl lg:text-[118px]"
            >
              {["DON'T", "DECORATE.", "CREATE."].map((word, i) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 80,
                      rotate: i === 1 ? -3 : 0,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className={`block ${
                    i === 1
                      ? "text-white/20"
                      : i === 2
                        ? "text-lime-300"
                        : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-9 max-w-md text-sm leading-7 text-white/40"
            >
              Handmade objects, wall pieces and weird little things for rooms
              that refuse to look like everyone else&apos;s.
            </motion.p>

            <motion.a
              href="#shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="group mt-8 inline-flex items-center gap-4 border border-white/20 bg-white px-7 py-4 text-[10px] font-black tracking-[0.15em] text-black transition hover:bg-lime-300"
            >
              ENTER THE ROOM

              <ArrowUpRight
                size={15}
                className="transition group-hover:rotate-45"
              />
            </motion.a>

          </div>

          {/* HERO OBJECT */}
          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-full max-w-[520px]"
          >

            <div className="absolute inset-[8%] rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#171717] via-[#0d0d0d] to-[#171126] shadow-2xl" />

            <div className="absolute right-[7%] top-[8%] rotate-6 border border-lime-300/40 bg-lime-300 px-4 py-3 text-[8px] font-black text-black">
              NEW
              <br />
              OBJECTS
            </div>

            <div className="absolute left-[10%] top-[15%] text-[8px] font-black tracking-[0.3em] text-white/30">
              YTR / 001
            </div>

            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [-3, 2, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.12,
                rotate: 8,
              }}
              className="absolute inset-0 flex items-center justify-center text-[155px] drop-shadow-[0_0_70px_rgba(139,92,246,.3)] sm:text-[190px]"
            >
              🏎️
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[25%] left-[-2%] z-30 hidden border border-white/20 bg-[#111] px-4 py-3 text-[8px] font-black tracking-[0.2em] text-lime-300 shadow-2xl sm:block"
            >
              NO
              <br />
              BORING
              <br />
              ROOMS.
            </motion.div>

            <div className="absolute bottom-[13%] left-[12%] max-w-[180px]">
              <div className="text-[9px] font-black tracking-[0.2em] text-white/30">
                OBJECT / 01
              </div>

              <div className="mt-1 text-xl font-black">
                MAKE YOUR WALL LOUD.
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[8%] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white/40">
              <ArrowUpRight size={18} />
            </div>

          </motion.div>

        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {[
            ["01", "HANDMADE", "Small batch. Big personality."],
            ["02", "NOT BASIC", "Objects worth looking twice at."],
            ["03", "YOUR WORLD", "Built around your vibe."],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              className="border-b border-white/10 p-7 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10"
            >
              <div className="text-[9px] font-black text-lime-300">
                {num}
              </div>

              <div className="mt-7 text-lg font-black">
                {title}
              </div>

              <div className="mt-2 text-xs text-white/35">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>

            <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-lime-300">
              <Sparkles size={12} />
              THE OBJECT LIBRARY
            </div>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em] sm:text-6xl">
              FIND YOUR
              <br />
              <span className="text-white/20">
                OBSESSION.
              </span>
            </h2>

          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, i) => (
            <a
              key={category}
              href="#shop"
              className={`border px-5 py-3 text-[9px] font-black tracking-[0.15em] transition ${
                i === 0
                  ? "border-lime-300 bg-lime-300 text-black"
                  : "border-white/10 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="shop"
        className="mx-auto max-w-7xl px-5 pb-24 lg:px-8"
      >

        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-5">

          <div>
            <p className="text-[9px] font-black tracking-[0.3em] text-white/30">
              001 — CURRENT DROP
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase tracking-[-0.05em]">
              GOOD STUFF.
            </h2>
          </div>

          <div className="hidden text-[9px] font-black tracking-widest text-white/30 sm:block">
            SCROLL TO EXPLORE ↓
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">

          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                y: -12,
                rotate: index % 2 === 0 ? -1 : 1,
                transition: {
                  duration: 0.25,
                },
              }}
              className="group"
            >

              <div
                className={`relative aspect-[4/5] overflow-hidden border border-white/10 bg-gradient-to-br ${product.bg}`}
              >

                <div className="absolute left-3 top-3 z-10 text-[8px] font-black tracking-[0.2em] text-white/30">
                  YTR / 0{index + 1}
                </div>

                <button className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/30 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Heart size={13} />
                </button>

                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:30px_30px]" />

                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: index % 2 === 0 ? 2 : -2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-[90px]">
                      {product.visual}
                    </span>
                  )}
                </motion.div>

                {/* REAL ADD TO BAG */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-3 left-3 right-3 translate-y-3 bg-white py-3 text-[9px] font-black text-black opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-lime-300"
                >
                  + ADD TO BAG
                </button>

              </div>

              <div className="border-b border-white/10 py-4">

                <div className="text-[8px] font-black tracking-[0.2em] text-white/30">
                  {product.category}
                </div>

                <div className="mt-1 flex items-start justify-between gap-2">

                  <h3 className="text-sm font-black">
                    {product.name}
                  </h3>

                  <span className="whitespace-nowrap text-xs font-bold text-lime-300">
                    {product.price}
                  </span>

                </div>

              </div>

            </motion.article>
          ))}

        </div>
      </section>

      {/* ROOM INSPO — MOVING GALLERY */}
      <section className="overflow-hidden border-y border-white/10 bg-[#050505] py-24">

        <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-lime-300">
                <Sparkles size={12} />
                YTR / ROOM INSPO
              </div>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.8] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                ROOMS
                <br />
                <span className="text-white/15">
                  THAT GO
                </span>
                <br />
                <span className="text-lime-300">
                  HARD.
                </span>
              </h2>

            </div>

            <p className="max-w-sm text-xs leading-6 text-white/35">
              Steal the vibe. Not the personality.
              <br />
              A little inspiration for your next room obsession.
            </p>

          </div>
        </div>

        {/* ROW 1 */}
        <div className="relative mb-5 overflow-hidden">

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-5"
          >

            {[
              {
                image:
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
                label: "DARK / 001",
                title: "MIDNIGHT ROOM",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
                label: "CREATIVE / 002",
                title: "OBJECT HEAVEN",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85",
                label: "MINIMAL / 003",
                title: "LESS BASIC",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
                label: "STREET / 004",
                title: "YOUR SPACE",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
                label: "OBJECT / 005",
                title: "NO BORING WALLS",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85",
                label: "VIBE / 006",
                title: "MAKE IT YOURS",
              },
            ].map((room, index) => (

              <motion.div
                key={`${room.title}-${index}`}
                whileHover={{
                  scale: 1.04,
                  rotate: index % 2 === 0 ? -1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                className="group relative h-[280px] w-[390px] shrink-0 overflow-hidden border border-white/10 bg-zinc-900 sm:h-[350px] sm:w-[500px]"
              >

                <img
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

                <div className="absolute left-5 top-5 text-[8px] font-black tracking-[0.25em] text-white/50">
                  {room.label}
                </div>

                <div className="absolute bottom-5 left-5">

                  <div className="text-lg font-black uppercase tracking-tight">
                    {room.title}
                  </div>

                  <div className="mt-1 text-[8px] font-black tracking-[0.2em] text-lime-300">
                    INSPO →
                  </div>

                </div>

                <div className="absolute bottom-5 right-5 text-[9px] font-black text-white/30">
                  0{index + 1}
                </div>

              </motion.div>

            ))}

          </motion.div>

        </div>

        {/* ROW 2 */}
        <div className="relative overflow-hidden">

          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-5"
          >

            {[
              {
                image:
                  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
                label: "RAW / 007",
                title: "BUILT DIFFERENT",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85",
                label: "RETRO / 008",
                title: "OLD SCHOOL",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
                label: "ART / 009",
                title: "WALL ENERGY",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=85",
                label: "NIGHT / 010",
                title: "AFTER DARK",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85",
                label: "RETRO / 011",
                title: "COLLECT YOUR VIBE",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
                label: "ART / 012",
                title: "MAKE IT LOUD",
              },
            ].map((room, index) => (

              <motion.div
                key={`${room.title}-${index}`}
                whileHover={{
                  scale: 1.04,
                  rotate: index % 2 === 0 ? 1 : -1,
                }}
                className="group relative h-[220px] w-[310px] shrink-0 overflow-hidden border border-white/10 bg-zinc-900 sm:h-[290px] sm:w-[430px]"
              >

                <img
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />

                <div className="absolute left-5 top-5 text-[8px] font-black tracking-[0.25em] text-white/50">
                  {room.label}
                </div>

                <div className="absolute bottom-5 left-5">

                  <div className="text-base font-black uppercase">
                    {room.title}
                  </div>

                  <div className="mt-1 text-[8px] font-black tracking-[0.2em] text-lime-300">
                    GET INSPIRED →
                  </div>

                </div>

              </motion.div>

            ))}

          </motion.div>

        </div>

        <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/10 px-5 pt-5 lg:px-8">

          <span className="text-[8px] font-black tracking-[0.25em] text-white/25">
            MORE ROOMS / MORE PERSONALITY
          </span>

          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="text-[9px] font-black text-lime-300"
          >
            KEEP SCROLLING →
          </motion.span>

        </div>

      </section>

      {/* HUGE STATEMENT */}
      <section
        id="story"
        className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0b] px-5 py-28 lg:px-8"
      >

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl">

          <p className="text-[9px] font-black tracking-[0.3em] text-lime-300">
            YTR / PHILOSOPHY
          </p>

          <h2 className="mt-8 text-[58px] font-black uppercase leading-[0.8] tracking-[-0.075em] sm:text-8xl lg:text-[125px]">
            BORING
            <br />
            ROOMS
            <br />
            <span className="text-white/15">
              ARE A
            </span>
            <br />
            <span className="text-lime-300">
              CHOICE.
            </span>
          </h2>

          <p className="mt-10 max-w-md text-sm leading-7 text-white/35">
            We make and collect things that give your room a pulse. Strange
            pieces. Handmade pieces. Pieces you actually want people to ask
            about.
          </p>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl border border-white/10 bg-[#101010] p-8 sm:p-14 lg:p-20">

          <div className="grid items-end gap-10 md:grid-cols-2">

            <div>

              <p className="text-[9px] font-black tracking-[0.3em] text-white/30">
                THIS IS YOUR SIGN
              </p>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-7xl">
                MAKE
                <br />
                YOUR ROOM
                <br />
                <span className="text-lime-300">
                  UNFORGETTABLE.
                </span>
              </h2>

            </div>

            <div className="md:text-right">

              <p className="mx-auto max-w-sm text-sm leading-6 text-white/35 md:ml-auto">
                Follow the weird. Pick what feels like you. Build a space
                nobody else could have made.
              </p>

              <motion.a
                href="#shop"
                whileHover={{
                  scale: 1.05,
                  x: 4,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="mt-7 inline-flex items-center gap-3 bg-lime-300 px-7 py-4 text-[9px] font-black tracking-[0.15em] text-black transition hover:bg-white"
              >
                EXPLORE YTR
                <ArrowUpRight size={15} />
              </motion.a>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-10 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="text-4xl font-black tracking-[-0.12em]">
              yt<span className="text-lime-300">R</span>
            </div>

            <div className="mt-2 text-[8px] font-bold tracking-[0.25em] text-white/25">
              YOUR TRENDY ROOM
            </div>

          </div>

          <div className="text-[9px] font-bold tracking-wider text-white/25">
            © 2026 YTR — NO BORING ROOMS.
          </div>

        </div>

      </footer>

    </main>
  );
}