"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const demoProducts = [
  { id: "demo-1", name: "Racer Wall Piece", category: "WALL DECOR", price: "₹899", visual: "🏎️", bg: "from-zinc-900 via-violet-950 to-black", image_url: null },
  { id: "demo-2", name: "Cloud Nine", category: "HANDMADE", price: "₹699", visual: "☁️", bg: "from-neutral-900 via-slate-700 to-black", image_url: null },
  { id: "demo-3", name: "Retro Frame", category: "WALL DECOR", price: "₹799", visual: "🖼️", bg: "from-zinc-900 via-emerald-950 to-black", image_url: null },
  { id: "demo-4", name: "Cherry Bomb", category: "DECOR", price: "₹499", visual: "🍒", bg: "from-neutral-900 via-red-950 to-black", image_url: null },
];

type Product = { id: string; name: string; category: string; price: string; visual: string; bg: string; image_url: string | null };
type CartItem = { name: string; price: number; visual: string; quantity: number };

const categories = ["ALL", "WALL DECOR", "HANDMADE", "CAR CULTURE", "TEXTILE"];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("ytr-cart");
    if (savedCart) {
      try {
        const items: CartItem[] = JSON.parse(savedCart);
        setCart(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch {
        localStorage.removeItem("ytr-cart");
      }
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        if (!supabaseUrl || !supabaseKey) return;
        const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
        if (error || !data?.length) return;
        setProducts(data.map((product, index) => ({
          id: product.id,
          name: product.name,
          category: String(product.category || "DECOR").toUpperCase(),
          price: `₹${Number(product.price).toLocaleString("en-IN")}`,
          visual: "✦",
          bg: index % 4 === 0 ? "from-zinc-900 via-violet-950 to-black" : index % 4 === 1 ? "from-neutral-900 via-slate-700 to-black" : index % 4 === 2 ? "from-zinc-900 via-emerald-950 to-black" : "from-neutral-900 via-red-950 to-black",
          image_url: product.image_url,
        })));
      } catch {
        // Keep the local demo products if Supabase is unavailable.
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "ALL" || product.category.includes(activeCategory);
    const matchesSearch = !query.trim() || product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [products, activeCategory, query]);

  const addToCart = (product: Product) => {
    const existing: CartItem[] = JSON.parse(localStorage.getItem("ytr-cart") || "[]");
    const found = existing.find((item) => item.name === product.name);
    if (found) found.quantity += 1;
    else existing.push({ name: product.name, price: Number(product.price.replace(/[₹,]/g, "")), visual: product.visual, quantity: 1 });
    localStorage.setItem("ytr-cart", JSON.stringify(existing));
    setCart(existing.reduce((sum, item) => sum + item.quantity, 0));
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f4ee] text-[#171717]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f5f4ee]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">
          <button aria-label="Open menu" onClick={() => setMenu(!menu)} className="rounded-full p-2 transition hover:bg-black/5 lg:hidden">
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>

          <Link href="/" className="group flex items-center gap-2 text-[30px] font-black tracking-[-0.12em] sm:text-[34px]">
            yt<span className="text-lime-500 transition group-hover:rotate-6">R</span>
            <span className="hidden pt-1 text-[8px] font-bold tracking-[0.18em] text-black/35 sm:block">YOUR TRENDY ROOM</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.14em] lg:flex">
            <a href="#shop" className="transition hover:text-lime-600">Shop</a>
            <a href="#categories" className="transition hover:text-lime-600">Categories</a>
            <a href="#about" className="transition hover:text-lime-600">About</a>
          </nav>

          <div className="flex items-center gap-1">
            <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-2.5 transition hover:bg-black/5">
              <Search size={19} />
            </button>
            <button aria-label="Wishlist" className="hidden rounded-full p-2.5 transition hover:bg-black/5 sm:block"><Heart size={19} /></button>
            <Link aria-label="Shopping bag" href="/cart" className="relative rounded-full p-2.5 transition hover:bg-black/5">
              <ShoppingBag size={19} />
              {cart > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-lime-400 px-1 text-[9px] font-black">{cart}</span>}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-black/10 px-4 py-3 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <Search size={17} className="opacity-40" />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-black/30" />
              <button onClick={() => { setQuery(""); setSearchOpen(false); }} className="text-xs font-bold uppercase opacity-50">Close</button>
            </div>
          </div>
        )}

        {menu && (
          <div className="border-t border-black/10 bg-[#f5f4ee] px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-wider">
              <a href="#shop" onClick={() => setMenu(false)}>Shop</a>
              <a href="#categories" onClick={() => setMenu(false)}>Categories</a>
              <a href="#about" onClick={() => setMenu(false)}>About</a>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-7 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="grid overflow-hidden rounded-[26px] bg-[#171717] shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400"><Sparkles size={13} /> New drop / 01</div>
              <h1 className="max-w-xl text-[52px] font-black uppercase leading-[0.88] tracking-[-0.065em] sm:text-6xl lg:text-[72px]">Make your<br /><span className="text-white/25">room</span> look<br />like you.</h1>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">Cool wall pieces, handmade finds & little objects with a lot of personality.</p>
              <a href="#shop" className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-400 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black transition hover:-translate-y-0.5 hover:bg-white">Shop the drop <ArrowUpRight size={15} /></a>
            </div>
            <div className="absolute bottom-5 right-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">YTR / 2026</div>
          </div>
          <div className="relative min-h-[370px] overflow-hidden bg-gradient-to-br from-violet-950 via-zinc-900 to-black sm:min-h-[500px] lg:min-h-[560px]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
            <motion.img initial={{ opacity: 0, scale: .9, rotate: 1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .75 }} src="/products/product-19.jpg" alt="Featured YTR wall decor" className="absolute inset-0 h-full w-full object-contain p-8 mix-blend-screen sm:p-12 lg:p-16" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:left-7 sm:top-7">Featured piece</div>
            <div className="absolute bottom-5 right-5 flex h-16 w-16 rotate-[-8deg] items-center justify-center rounded-full bg-lime-400 text-center text-[9px] font-black uppercase leading-3 text-black sm:bottom-7 sm:right-7">Make<br />it yours</div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-[#171717] py-3 text-[9px] font-black uppercase tracking-[0.28em] text-white/70">
        <div className="mx-auto flex w-max gap-8 whitespace-nowrap">YOUR SPACE • YOUR RULES • LESS BORING ROOMS • YOUR SPACE • YOUR RULES • LESS BORING ROOMS •</div>
      </div>

      <section id="categories" className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8 [scrollbar-width:none]">
          {categories.map((category) => (
            <button key={category} onClick={() => { setActiveCategory(category); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className={`shrink-0 rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition ${activeCategory === category ? "border-black bg-lime-400 text-black" : "border-black/10 hover:border-black/40"}`}>
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-600">Fresh from YTR</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Shop the collection</h2>
          </div>
          <span className="text-xs text-black/40">{filteredProducts.length} pieces</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white px-6 py-20 text-center text-sm text-black/50">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map((product, index) => (
              <motion.article key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .04, .2) }} className="group min-w-0">
                <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${product.bg}`}>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[70px] sm:text-[90px]">{product.visual}</div>
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-md">YTR / {String(index + 1).padStart(2, "0")}</div>
                  <button aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-lime-400 group-hover:opacity-100 max-sm:opacity-100"><Heart size={15} /></button>
                  <button onClick={() => addToCart(product)} className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full bg-lime-400 py-3 text-[10px] font-black uppercase tracking-wider text-black opacity-0 shadow-sm transition hover:bg-white group-hover:opacity-100 max-sm:opacity-100">Add to bag <ArrowUpRight size={13} /></button>
                </div>
                <div className="pt-3">
                  <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">{product.category}</div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-5 sm:text-[15px]">{product.name}</h3>
                    <span className="shrink-0 text-sm font-bold">{product.price}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <section id="about" className="border-y border-black/10 bg-[#171717] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400"><Sparkles size={12} /> YTR — Your Trendy Room</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">Your room is part of<br className="hidden sm:block" /> your personality.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/45">Playful wall pieces, handmade objects and weird little finds. No boring corners. No copy-paste rooms.</p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="font-black text-black">yt<span className="text-lime-500">R</span></div>
        <div>© {new Date().getFullYear()} YTR. Made for rooms with personality.</div>
      </footer>
    </main>
  );
}
