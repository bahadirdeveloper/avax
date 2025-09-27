import Image from "next/image";
import Link from "next/link";

import type { Product } from "../data/products";
import { products } from "../data/products";

type GroupedProducts = {
  name: string;
  slug: string;
  items: Product[];
};

const MAX_PRODUCTS_PER_CATEGORY = 3;

const groupedProducts: GroupedProducts[] = Array.from(
  products.reduce((acc, product) => {
    const group = acc.get(product.categorySlug) ?? {
      name: product.category,
      slug: product.categorySlug,
      items: [] as Product[],
    };

    if (group.items.length < MAX_PRODUCTS_PER_CATEGORY) {
      group.items.push(product);
    }

    acc.set(product.categorySlug, group);
    return acc;
  }, new Map<string, GroupedProducts>()).values(),
);

export function FeaturedProducts() {
  return (
    <section id="products" className="bg-[#040b15] py-20 text-[#e2e8f0]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-10">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#5bffa7]">
            Ürün Vitrini
          </p>
          <h2 className="text-3xl font-semibold text-[#f8fafc] md:text-4xl">
            Operasyon sahası için hazır ürün grupları
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Tüm ürünlerimiz AVAX Savunma tedarik ağında kalite kontrol süreçlerinden
            geçirilir. Stokta bulunan modeller kategorilere göre listelenmiştir;
            detaylı teknik döküman ve toplu sipariş talepleriniz için bizimle
            iletişime geçebilirsiniz.
          </p>
        </header>

        <div className="grid gap-10">
          {groupedProducts.map((group) => (
            <article
              key={group.slug}
              className="space-y-6 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_20px_60px_rgba(6,12,24,0.25)] ring-1 ring-white/5 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {group.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5bffa7]">
                    {group.slug.replace(/-/g, " ")}
                  </p>
                </div>
                <Link
                  href="mailto:info@avaxsavunma.com?subject=Katalog%20Talebi"
                  className="text-sm font-semibold text-[#5bffa7] transition hover:text-white"
                >
                  Kategori kataloğu iste →
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {group.items.map((item) => {
                  const primaryImage = item.thumbnail
                    ? `/${item.thumbnail}`
                    : `/${item.variants[0]?.images[0] ?? "logo.png"}`;
                  const colors = Array.from(
                    new Set(item.variants.map((variant) => variant.color)),
                  );

                  return (
                    <div
                      key={item.name}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#060f1f] transition hover:-translate-y-1 hover:border-[#5bffa7]/60"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={primaryImage}
                          alt={`${item.name} ürün görseli`}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold text-white">
                            {item.name}
                          </h4>
                          <p className="text-xs uppercase tracking-[0.35em] text-[#5bffa7]">
                            {item.categorySlug.replace(/-/g, " ")}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {item.description}
                        </p>
                        <div className="mt-auto space-y-2 text-xs text-slate-300">
                          <p className="font-semibold text-white">
                            Renk seçenekleri
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((color) => (
                              <span
                                key={color}
                                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Katalog dışındaki ürünleri mi arıyorsunuz?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Özel operasyon setleri, birlik logolu ürünler ve toplu siparişler için
              uzman ekibimizle hızlıca görüşebilirsiniz.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <Link
              href="https://wa.me/905403843333"
              className="rounded-full bg-[#5bffa7] px-5 py-3 text-sm font-semibold text-[#04121c] transition hover:bg-white"
            >
              WhatsApp ile görüş
            </Link>
            <Link
              href="tel:+905403843333"
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#5bffa7]"
            >
              Telefon et
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
