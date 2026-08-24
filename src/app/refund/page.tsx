import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-[#f2f0ea] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-black tracking-widest text-lime-300">← BACK TO YTR</Link>
        <p className="mt-12 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / RETURNS</p>
        <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Cancellation & Refunds<span className="text-lime-300">.</span></h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/55">
          <section><h2 className="text-lg font-black text-white">Cancellation</h2><p className="mt-2">If you need to cancel an order, contact YTR as soon as possible with your order details. Cancellation may not be possible after an order has been dispatched or prepared for fulfilment.</p></section>
          <section><h2 className="text-lg font-black text-white">Returns</h2><p className="mt-2">If an item arrives damaged, defective or materially different from the product ordered, contact YTR promptly with photographs and order details so we can review the issue and provide the appropriate resolution.</p></section>
          <section><h2 className="text-lg font-black text-white">Refunds</h2><p className="mt-2">Where a refund is approved, it will normally be initiated to the original payment method used for the order. The time taken for the refunded amount to appear can depend on the payment provider or bank.</p></section>
          <section><h2 className="text-lg font-black text-white">Non-returnable situations</h2><p className="mt-2">Items damaged after delivery through misuse, alteration or improper handling may not qualify for a refund. Custom or personalised products may have additional restrictions that will be communicated before fulfilment.</p></section>
          <section><h2 className="text-lg font-black text-white">How to request help</h2><p className="mt-2">Please use the Contact page and include your order details, the issue and supporting photographs where relevant.</p></section>
        </div>
        <nav className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-[9px] font-black tracking-widest text-white/40"><Link href="/terms">TERMS</Link><Link href="/privacy">PRIVACY</Link><Link href="/shipping">SHIPPING</Link><Link href="/contact">CONTACT</Link></nav>
      </div>
    </main>
  );
}