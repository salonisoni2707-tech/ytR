import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-[#f2f0ea] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-black tracking-widest text-lime-300">← BACK TO YTR</Link>
        <p className="mt-12 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / CONTACT</p>
        <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Need help<span className="text-lime-300">?</span></h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="border border-white/10 bg-[#0d0d0d] p-6"><p className="text-[9px] font-black tracking-widest text-white/30">ORDERS</p><p className="mt-3 text-sm leading-6 text-white/60">For order, delivery, cancellation or refund questions, keep your order details ready when contacting YTR.</p></div>
          <div className="border border-white/10 bg-[#0d0d0d] p-6"><p className="text-[9px] font-black tracking-widest text-white/30">PAYMENTS</p><p className="mt-3 text-sm leading-6 text-white/60">For a payment issue, keep the Razorpay payment or order reference visible so the transaction can be traced.</p></div>
        </div>
        <div className="mt-8 border border-lime-300/20 bg-lime-300/[0.04] p-7 text-sm leading-7 text-white/60"><p className="font-black text-lime-300">CUSTOMER SUPPORT</p><p className="mt-2">Please use the customer-support contact details provided during your order or payment confirmation. Include your order reference, name and a short description of the issue.</p></div>
        <nav className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-[9px] font-black tracking-widest text-white/40"><Link href="/terms">TERMS</Link><Link href="/privacy">PRIVACY</Link><Link href="/shipping">SHIPPING</Link><Link href="/refund">REFUNDS</Link></nav>
      </div>
    </main>
  );
}