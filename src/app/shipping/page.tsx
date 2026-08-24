import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-[#f2f0ea] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-black tracking-widest text-lime-300">← BACK TO YTR</Link>
        <p className="mt-12 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / SHIPPING</p>
        <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Shipping Policy<span className="text-lime-300">.</span></h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/55">
          <section><h2 className="text-lg font-black text-white">Order processing</h2><p className="mt-2">Orders are processed after successful payment confirmation. Processing and dispatch timing can vary by product availability and whether an item is handmade or made to order.</p></section>
          <section><h2 className="text-lg font-black text-white">Delivery</h2><p className="mt-2">Delivery timelines depend on the delivery location and courier availability. The applicable delivery estimate will be communicated with your order or by our support team.</p></section>
          <section><h2 className="text-lg font-black text-white">Shipping charges</h2><p className="mt-2">Any applicable shipping charge will be shown before payment. If the checkout shows FREE shipping, no separate shipping charge will be collected for that order.</p></section>
          <section><h2 className="text-lg font-black text-white">Delays & address issues</h2><p className="mt-2">Courier delays, remote-area delivery restrictions, incorrect addresses and unavailable recipients can affect delivery time. Customers should provide accurate delivery information at checkout.</p></section>
          <section><h2 className="text-lg font-black text-white">Damaged package</h2><p className="mt-2">If a package arrives visibly damaged, please contact YTR as soon as possible and keep the packaging and product photos available so the issue can be reviewed.</p></section>
        </div>
        <nav className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-[9px] font-black tracking-widest text-white/40"><Link href="/terms">TERMS</Link><Link href="/privacy">PRIVACY</Link><Link href="/refund">REFUNDS</Link><Link href="/contact">CONTACT</Link></nav>
      </div>
    </main>
  );
}