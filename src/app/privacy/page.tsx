import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-[#f2f0ea] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-black tracking-widest text-lime-300">← BACK TO YTR</Link>
        <p className="mt-12 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / PRIVACY</p>
        <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Privacy Policy<span className="text-lime-300">.</span></h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/55">
          <section><h2 className="text-lg font-black text-white">Information we collect</h2><p className="mt-2">When you place an order, we may collect information such as your name, phone number, email address, delivery details and order information needed to process and support your purchase.</p></section>
          <section><h2 className="text-lg font-black text-white">Payments</h2><p className="mt-2">Payments are processed through our payment partner, Razorpay. YTR does not store your card, UPI PIN or other payment credentials. Payment information is handled by the payment provider according to its own security and privacy policies.</p></section>
          <section><h2 className="text-lg font-black text-white">How we use information</h2><p className="mt-2">We use customer information to process orders, arrange delivery, provide customer support, prevent misuse and communicate about an order or service request.</p></section>
          <section><h2 className="text-lg font-black text-white">Data sharing</h2><p className="mt-2">We share only the information reasonably necessary with payment, delivery and technology service providers to fulfil your order and operate the website.</p></section>
          <section><h2 className="text-lg font-black text-white">Your choices</h2><p className="mt-2">You may contact us regarding questions about your order or personal information. We will handle reasonable requests in accordance with applicable law.</p></section>
        </div>
        <nav className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-[9px] font-black tracking-widest text-white/40"><Link href="/terms">TERMS</Link><Link href="/shipping">SHIPPING</Link><Link href="/refund">REFUNDS</Link><Link href="/contact">CONTACT</Link></nav>
      </div>
    </main>
  );
}