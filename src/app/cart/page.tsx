"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "@/lib/supabase";

type CartItem = {
  name: string;
  price: number;
  visual: string;
  quantity: number;
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("ytr-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        localStorage.removeItem("ytr-cart");
      }
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem("ytr-cart", JSON.stringify(items));
  };

  const increase = (index: number) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decrease = (index: number) => {
    const updated = [...cart];
    if (updated[index].quantity === 1) updated.splice(index, 1);
    else updated[index].quantity -= 1;
    updateCart(updated);
  };

  const remove = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveOrder = async (payment: RazorpayResponse) => {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        items: cart,
        total,
        status: "paid",
        payment_id: payment.razorpay_payment_id,
        razorpay_order_id: payment.razorpay_order_id,
      })
      .select("id")
      .single();

    if (error) throw error;
    return data.id as string;
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || placingOrder) return;

    setPlacingOrder(true);
    setPaymentError("");

    try {
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) throw new Error("Razorpay public key is not configured.");

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout is still loading. Please try again.");
      }

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await response.json();
      if (!response.ok || !order.orderId) {
        throw new Error(order.error || "Could not create payment order.");
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Your Trendy Room",
        description: "YTR order",
        order_id: order.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#bef264" },
        handler: async (payment: RazorpayResponse) => {
          try {
            const id = await saveOrder(payment);
            localStorage.removeItem("ytr-cart");
            setCart([]);
            setOrderId(id);
            setOrderPlaced(true);
          } catch (error) {
            console.error("Order save error:", error);
            setPaymentError("Payment succeeded, but we could not save the order. Please contact us with your payment ID: " + payment.razorpay_payment_id);
          } finally {
            setPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: () => setPlacingOrder(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentError(error instanceof Error ? error.message : "Unable to start checkout. Please try again.");
      setPlacingOrder(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <div className="w-full max-w-xl border border-white/10 bg-[#0d0d0d] p-8 text-center sm:p-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-300 text-black"><CheckCircle2 size={42} /></div>
          <p className="mt-8 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / ORDER CONFIRMED</p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.07em] sm:text-7xl">YOU&apos;RE<br />IN<span className="text-lime-300">.</span></h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-white/40">Payment received and your YTR order is confirmed. We&apos;ll get your object ready and contact you with the next steps.</p>
          {orderId && <div className="mt-8 border border-white/10 bg-black/30 p-4"><p className="text-[8px] font-black tracking-[0.2em] text-white/30">ORDER ID</p><p className="mt-2 break-all text-xs font-bold text-lime-300">{orderId}</p></div>}
          <Link href="/#shop" className="mt-8 inline-flex bg-lime-300 px-8 py-4 text-[9px] font-black tracking-[0.2em] text-black transition hover:bg-white">KEEP EXPLORING YTR →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-10 text-white lg:px-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Link href="/" className="mb-12 inline-flex items-center gap-2 text-xs font-black tracking-widest text-white/50 transition hover:text-lime-300"><ArrowLeft size={15} /> BACK TO YTR</Link>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12"><p className="text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / BAG</p><h1 className="mt-3 text-6xl font-black uppercase tracking-[-0.07em]">YOUR<br />BAG<span className="text-lime-300">.</span></h1></div>
        {cart.length === 0 ? (
          <div className="border border-white/10 bg-[#0d0d0d] p-16 text-center"><p className="text-sm text-white/40">Your bag is empty.</p><Link href="/#shop" className="mt-6 inline-block bg-lime-300 px-7 py-4 text-[9px] font-black tracking-widest text-black transition hover:bg-white">FIND SOMETHING COOL</Link></div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex items-center gap-4 border border-white/10 bg-[#0d0d0d] p-4 sm:gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-[#151515] text-4xl sm:h-24 sm:w-24 sm:text-5xl">{item.visual}</div>
                  <div className="min-w-0 flex-1"><p className="text-[8px] font-black tracking-widest text-white/30">YTR / OBJECT</p><h2 className="mt-1 truncate text-sm font-black">{item.name}</h2><p className="mt-2 text-xs text-lime-300">₹{item.price.toLocaleString("en-IN")}</p></div>
                  <div className="flex items-center gap-3 border border-white/10 px-2 py-2"><button onClick={() => decrease(index)} className="p-1 text-white/60 hover:text-lime-300"><Minus size={13} /></button><span className="w-5 text-center text-xs font-black">{item.quantity}</span><button onClick={() => increase(index)} className="p-1 text-white/60 hover:text-lime-300"><Plus size={13} /></button></div>
                  <button onClick={() => remove(index)} className="text-white/30 transition hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="h-fit border border-white/10 bg-[#0d0d0d] p-7">
              {!checkout ? (
                <>
                  <p className="text-[9px] font-black tracking-[0.25em] text-white/30">ORDER SUMMARY</p>
                  <div className="mt-8 flex justify-between text-sm"><span className="text-white/40">Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                  <div className="mt-3 flex justify-between text-sm"><span className="text-white/40">Shipping</span><span className="text-lime-300">FREE</span></div>
                  <div className="my-6 border-t border-white/10" /><div className="flex justify-between"><span className="text-xs font-black">TOTAL</span><span className="text-xl font-black text-lime-300">₹{total.toLocaleString("en-IN")}</span></div>
                  <button onClick={() => setCheckout(true)} className="mt-7 w-full bg-lime-300 py-4 text-[9px] font-black tracking-[0.2em] text-black transition hover:bg-white">PROCEED TO ORDER →</button>
                  <div className="mt-5 flex items-center justify-center gap-2 text-[8px] font-bold tracking-wider text-white/30"><ShieldCheck size={13} /> SAFE &amp; SECURE PAYMENT</div>
                </>
              ) : (
                <form onSubmit={placeOrder}>
                  <div className="flex items-center justify-between"><div><p className="text-[9px] font-black tracking-[0.25em] text-lime-300">YTR / CHECKOUT</p><h2 className="mt-2 text-2xl font-black uppercase">WHERE&apos;S IT<br />GOING?</h2></div><button type="button" onClick={() => setCheckout(false)} className="text-[8px] font-black tracking-widest text-white/30 hover:text-white">BACK</button></div>
                  <div className="mt-7 space-y-3">
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="FULL NAME" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" />
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="EMAIL" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" />
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="PHONE NUMBER" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" />
                    <textarea required name="address" value={form.address} onChange={handleChange} placeholder="DELIVERY ADDRESS" rows={3} className="w-full resize-none border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" />
                    <div className="grid grid-cols-2 gap-3"><input required name="city" value={form.city} onChange={handleChange} placeholder="CITY" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" /><input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} name="pincode" value={form.pincode} onChange={handleChange} placeholder="PINCODE" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-xs font-bold text-white outline-none placeholder:text-white/20 focus:border-lime-300" /></div>
                  </div>
                  <div className="my-6 border-t border-white/10" /><div className="flex justify-between"><span className="text-xs font-black">TOTAL</span><span className="text-xl font-black text-lime-300">₹{total.toLocaleString("en-IN")}</span></div>
                  {paymentError && <div className="mt-4 border border-red-400/20 bg-red-400/5 p-3 text-[10px] leading-5 text-red-300">{paymentError}</div>}
                  <button type="submit" disabled={placingOrder} className="mt-7 flex w-full items-center justify-center gap-2 bg-lime-300 py-4 text-[9px] font-black tracking-[0.2em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">{placingOrder ? <><Loader2 size={14} className="animate-spin" /> OPENING PAYMENT...</> : "PAY & PLACE ORDER →"}</button>
                  <div className="mt-5 flex items-center justify-center gap-2 text-[8px] font-bold tracking-wider text-white/30"><ShieldCheck size={13} /> SECURE RAZORPAY PAYMENT</div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
