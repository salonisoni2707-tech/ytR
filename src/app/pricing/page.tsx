export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-5 py-12 text-white lg:px-12">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-xs font-black tracking-widest text-white/50 hover:text-lime-300"
        >
          ← BACK TO YTR
        </a>

        <div className="mt-16 border border-white/10 bg-[#0d0d0d] p-8 sm:p-12">
          <p className="text-[9px] font-black tracking-[0.3em] text-lime-300">
            YTR / PRICING
          </p>

          <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em] sm:text-7xl">
            PRICES.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40">
            All product prices are displayed in Indian Rupees (INR) on the
            product listing and checkout pages. The final payable amount is
            shown before payment is completed.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="border border-white/10 p-5">
              <p className="text-[9px] font-black tracking-widest text-white/30">
                PRODUCT PRICING
              </p>
              <p className="mt-3 text-sm font-bold">
                Prices are shown against each product and may vary by product,
                collection, or custom request.
              </p>
            </div>

            <div className="border border-white/10 p-5">
              <p className="text-[9px] font-black tracking-widest text-white/30">
                SHIPPING
              </p>
              <p className="mt-3 text-sm font-bold text-lime-300">
                FREE SHIPPING
              </p>
              <p className="mt-2 text-xs leading-6 text-white/40">
                Unless a product-specific shipping charge is clearly shown at
                checkout.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs leading-6 text-white/40">
              For custom products or bulk orders, the applicable price will be
              confirmed with the customer before payment. No additional
              mandatory charge will be collected without being disclosed to
              the customer.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
