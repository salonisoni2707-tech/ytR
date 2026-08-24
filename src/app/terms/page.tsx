import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-[#f2f0ea] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-black tracking-widest text-lime-300">← BACK TO YTR</Link>
        <p className="mt-12 text-[9px] font-black tracking-[0.3em] text-lime-300">YTR / TERMS</p>
        <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Terms & Conditions<span className="text-lime-300">.</span></h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-white/55">
          <section><h2 className="text-lg font-black text-white">1. Using YTR</h2><p className="mt-2">YTR sells room decor, handmade objects and related products through this website. By placing an order, you agree to these terms and confirm that the information you provide is accurate.</p></section>
          <section><h2 className="text-lg font-black text-white">2. Products & Pricing</h2><p className="mt-2">Product descriptions, images and prices are displayed on the website and may change without notice. We aim to keep product information accurate, but minor visual differences may occur for handmade products.</p></section>
          <section><h2 className="text-lg font-black text-white">3. Orders & Payment</h2><p className="mt-2">An order is considered placed after successful payment confirmation. We reserve the right to cancel an order if a product is unavailable, a pricing error is identified, or an order appears fraudulent.</p></section>
          <section><h2 className="text-lg font-black text-white">4. Customer Responsibility</h2><p className="mt-2">Customers are responsible for providing correct name, phone number, email and delivery information. YTR cannot be responsible for delays caused by incorrect customer information.</p></section>
          <section><h2 className="text-lg font-black text-white">5. Policy Changes</h2><p className="mt-2">These terms may be updated when our products, services or processes change. The latest version will always be published on this page.</p></section>
        </div>
        <PolicyLinks />
      </div>
    </main>
  );
}

function PolicyLinks() {
  return <nav className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-[9px] font-black tracking-widest text-white/40"><Link href="/privacy">PRIVACY</Link><Link href="/shipping">SHIPPING</Link><Link href="/refund">REFUNDS</Link><Link href="/contact">CONTACT</Link></nav>;
}