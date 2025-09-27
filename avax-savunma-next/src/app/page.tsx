import Image from "next/image";
import Link from "next/link";

import { FeaturedProducts } from "../components/featured-products";

const heroHighlights = [
  "NATO uyumlu taktik ekipman",
  "Alanında uzman tedarik ağı",
  "TSE belgeli üretim partnerleri",
];

const categories = [
  {
    name: "Taktik Gömlek",
    slug: "taktik-gomlek",
    description:
      "Operasyonel konfor sağlayan, nefes alabilir kumaş ve güçlendirilmiş dikiş yapısı.",
    image: "/taktik-gomlek/akn-225-gomlek/haki/31.webp",
  },
  {
    name: "Outdoor T-Shirt",
    slug: "outdoor-tshirt",
    description:
      "Saha görevlerine uygun, hızlı kuruyan ve UV korumalı hafif kumaş seçenekleri.",
    image: "/outdoor-tshirt/bisiklet-kisa-kol-taktik/haki/66.webp",
  },
  {
    name: "Taktik Pantolon",
    slug: "taktik-pantolon",
    description:
      "Profesyonel saha kullanımı için çok cepli, dayanıklı ve ergonomik tasarımlar.",
    image: "/taktik-pantolon/akn-516-taktik-pantolon/91.webp",
  },
  {
    name: "Mont & Yağmurluk",
    slug: "mont-yagmurluk",
    description:
      "Zorlu iklim koşullarına uygun su ve rüzgar geçirmez üst katman çözümleri.",
    image: "/mont-yagmurluk/akn-soguk-iklim-mont-/HAKI/131.webp",
  },
  {
    name: "Outdoor Ayakkabı",
    slug: "outdoor-ayakkabi",
    description:
      "Çok yönlü arazi kullanımına uygun taban teknolojisi ve bilek destek sistemleri.",
    image: "/outdoor-ayakkabi/vogel-m1493-suet-ayakkabi/siyah/159.webp",
  },
  {
    name: "Taktik Bot",
    slug: "taktik-bot",
    description:
      "Profesyonel birlikler tarafından tercih edilen, yüksek dayanımlı taktik botlar.",
    image: "/taktik-bot/vogel-1491-fermuarli-outdoor-bot/siyah/215.webp",
  },
  {
    name: "Teçhizat & Aksesuar",
    slug: "techizat-aksesuar",
    description:
      "Operasyonel verimliliği artıran taşıma sistemleri, koruyucu yelek ve aksesuarlar.",
    image: "/techizat-aksesuar/akn-aoutdoor-45-lt-canta/haki/306.webp",
  },
];

const differentiators = [
  {
    title: "Savunma Sektörü Deneyimi",
    description:
      "Sivil ve askeri kurumların saha gereksinimlerini karşılayan ürün portföyü ve tedarik danışmanlığı sunuyoruz.",
  },
  {
    title: "Kalite Belgeleri",
    description:
      "TSE, ISO ve NATO AQAP standartlarına uygun üretim partnerleriyle çalışıyor, kalite denetim süreçlerini şeffaf yürütüyoruz.",
  },
  {
    title: "Proje Odaklı Çözümler",
    description:
      "Birlik, operasyon veya toplu tedarik projelerinin lojistik planlaması ve kişiselleştirilmiş paketleme hizmetlerini üstleniyoruz.",
  },
  {
    title: "Hızlı Lojistik",
    description:
      "Türkiye geneli stok yönetimi ve 48 saat içinde sevkiyat hazırlığı ile kritik teslim sürelerine uyum sağlıyoruz.",
  },
];

const stats = [
  { label: "Profesyonel ürün", value: "650+" },
  { label: "Kurumsal referans", value: "120+" },
  { label: "İhracat noktası", value: "6" },
  { label: "Yıl sektör deneyimi", value: "12" },
];

const faqs = [
  {
    question: "Ürünler hangi standartlara uygun?",
    answer:
      "Ürün gamımızın tamamı NATO uyumlu spesifikasyonlara göre seçilir ve üretim partnerlerimiz TSE, ISO 9001 ve AQAP belgelerine sahiptir.",
  },
  {
    question: "Kurumsal tedarik için minimum sipariş miktarı var mı?",
    answer:
      "Toplu tedarik projelerinde ihtiyaç duyduğunuz adetleri birlikte planlıyoruz. Stok durumuna bağlı olarak minimum sipariş 25 adetle başlar, proje bazlı esneklik sağlıyoruz.",
  },
  {
    question: "Ürünleri yerinde inceleyebilir miyim?",
    answer:
      "Silifke/Mersin adresimizde örnek ürünlerimizi görebilir, randevu ile demo sunum alabilirsiniz. Ayrıca çevrim içi ürün tanıtım görüşmeleri de düzenliyoruz.",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/avaxsavunma",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/avax-savunma",
  },
];

const headingFont = "font-[family-name:var(--font-orbitron)]";

export default function Home() {
  return (
    <>
      <header className="relative overflow-hidden bg-[#030712] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#143b52_0%,#030712_60%)] opacity-90" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:px-10 lg:px-16">
          <nav
            className="flex flex-col items-center justify-between gap-6 text-sm text-slate-200 md:flex-row"
            aria-label="Ana menü"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AVAX Savunma logo"
                width={56}
                height={56}
                className="rounded"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Askeri Seviye Teçhizat
                </p>
                <p className={`text-lg font-semibold text-white ${headingFont}`}>
                  AVAX SAVUNMA
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#about" className="text-slate-300 transition hover:text-white">
                Hakkımızda
              </Link>
              <Link
                href="#categories"
                className="text-slate-300 transition hover:text-white"
              >
                Ürün Kategorileri
              </Link>
              <Link
                href="#contact"
                className="text-slate-300 transition hover:text-white"
              >
                İletişim
              </Link>
              <Link
                href="tel:+905403843333"
                className="rounded-full bg-[#5BFFA7] px-4 py-2 font-medium text-[#03131e] transition hover:bg-white"
              >
                +90 540 384 33 33
              </Link>
            </div>
          </nav>

          <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#5bffa7]">
                Savunma Sanayi Tedarik Ortağınız
              </p>
              <h1
                className={`text-3xl font-semibold leading-tight text-white md:text-5xl ${headingFont}`}
              >
                NATO standartlarında taktik giyim ve profesyonel ekipman ile her
                göreve hazır olun.
              </h1>
              <p className="max-w-xl text-base text-slate-200 md:text-lg">
                AVAX Savunma, askeri birlikler, güvenlik güçleri ve profesyonel
                outdoor ekiplerinin saha gereksinimlerine güçlü ve güvenilir
                çözümler sunar. Tedarik, danışmanlık ve lojistik yönetimini tek
                noktadan yönetiyoruz.
              </p>
              <ul className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                {heroHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-[#5bffa7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#contact"
                  className="rounded-full bg-[#5bffa7] px-6 py-3 font-semibold text-[#03131e] transition hover:bg-white"
                >
                  Teklif iste
                </Link>
                <Link
                  href="https://wa.me/905403843333"
                  className="rounded-full border border-slate-500 px-6 py-3 font-semibold text-white transition hover:border-white"
                >
                  WhatsApp danışmanlık
                </Link>
              </div>
            </div>
            <div className="grid gap-4 rounded-3xl bg-white/5 p-6 backdrop-blur md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5bffa7]">
                Operasyonel güven
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center text-slate-200">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 p-4">
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                AVAX Savunma, milli ve uluslararası görevlerde kullanılan
                taktik ekipmanların güvenilir tedarikçisidir.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-[#030b18] text-[#e2e8f0]">
        <section id="about" className="mx-auto max-w-5xl space-y-6 px-6 py-20 md:px-10">
          <h2 className={`text-3xl font-semibold text-white md:text-4xl ${headingFont}`}>
            Kurumsal Profil
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            AVAX Savunma, operasyonel birlikler için askeri seviye giyim ve
            taktik ekipman tedarikinde uzmanlaşmış yerli bir markadır. Ürün
            seçimi, test ve kalite kontrol süreçlerini kendi mühendis ekibimiz
            yönetir; kamu ve özel sektör ihalelerine özel danışmanlık sunarız.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-[#5bffa7]/40"
              >
                <h3 className={`text-xl font-semibold text-white ${headingFont}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="categories" className="bg-[#040b15] py-20">
          <div className="mx-auto max-w-6xl space-y-6 px-6 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className={`text-3xl font-semibold text-white md:text-4xl ${headingFont}`}>
                  Ürün Kategorileri
                </h2>
                <p className="mt-2 max-w-2xl text-base text-slate-300">
                  Sıcak-soğuk iklim operasyonları, özel kuvvet görevleri ve şehir
                  içi güvenlik operasyonları için optimize edilmiş taktik giyim ve
                  ekipman çözümlerini stoklarımızda tutuyoruz.
                </p>
              </div>
              <Link
                href="mailto:info@avaxsavunma.com"
                className="text-sm font-semibold text-[#5bffa7] transition hover:text-white"
              >
                Katalog talep et →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-[#5bffa7]/40"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={category.image}
                      alt={`${category.name} örnek ürün görseli`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={category.slug === "taktik-gomlek"}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                      {category.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {category.description}
                    </p>
                    <span className="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-[#5bffa7]">
                      {category.slug.replace(/-/g, " ")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProducts />

        <section className="mx-auto max-w-6xl space-y-6 px-6 py-20 md:px-10">
          <h2 className={`text-3xl font-semibold text-white md:text-4xl ${headingFont}`}>
            Saha başarısı için güvenilir destek
          </h2>
          <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
              <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                Sertifikasyon ve uyumluluk
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Tedarik zincirimiz, Türkiye ve uluslararası savunma projelerinde
                aranan standartlara uygunluk raporları ile desteklenir. Ürünlerimiz
                kullanıcı testlerinden geçirilerek operasyonel uyumluluğu
                doğrulanır.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>NATO AQAP, ISO 9001 ve TSE hizmet yeterlilik belgeleri</li>
                <li>Balistik ve ergonomi test raporları</li>
                <li>Operasyon sonrası kullanıcı geri bildirim döngüsü</li>
              </ul>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                  Lojistik ve teslimat
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Stok yönetimi, kalite kontrol ve sigortalı sevkiyat süreçleri tek
                  elden yönetilir. Uluslararası gönderiler için gümrük ve paketleme
                  danışmanlığı sunuyoruz.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                  Saha uyarlamaları
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Birlik logoları, kişiye özel numaralandırma ve görev bazlı
                  setler oluşturuyor; eğitim atölyeleri ile ekipman kullanımını
                  standartlaştırıyoruz.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                  Yerel destek ağı
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Mersin merkezli depo ve showroomumuzda numune inceleme,
                  bakım-onarım ve hızlı parça değişimi sağlıyoruz.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <h3 className={`text-lg font-semibold text-white ${headingFont}`}>
                  Dijital ürün kataloğu
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Güncel stok, teknik çizim ve ölçü tablolarını içeren katalogları
                  PDF ve çevrim içi paylaşım formatlarında sunuyoruz.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#0d1b2a] py-20 text-white">
          <div className="mx-auto max-w-5xl space-y-10 px-6 md:px-10">
            <div className="space-y-4 text-center">
              <h2 className={`text-3xl font-semibold md:text-4xl ${headingFont}`}>
                Sık sorulan sorular
              </h2>
              <p className="text-base text-slate-200">
                Taktik ekipman tedarikiyle ilgili merak edilen konuların kısa
                yanıtlarını burada bulabilirsiniz.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left"
                >
                  <summary className="cursor-pointer text-lg font-semibold">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm text-slate-200">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-20 md:px-10">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 md:grid-cols-[2fr_3fr]">
            <div className="space-y-3">
              <h2 className={`text-3xl font-semibold text-white md:text-4xl ${headingFont}`}>
                İletişime geçin
              </h2>
              <p className="text-base text-slate-300">
                Savunma projeleriniz için doğru ürün ve tedarik modelini birlikte
                belirleyelim. Uzman ekibimiz 48 saat içinde size dönüş yapar.
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <p className={`font-semibold text-white ${headingFont}`}>Adres</p>
                  <p>
                    Göksu Mah. Oğuz Kağan Cad. Geçer Apt. No:20/3
                    <br /> Silifke / Mersin
                  </p>
                </div>
                <div>
                  <p className={`font-semibold text-white ${headingFont}`}>Telefon</p>
                  <Link
                    href="tel:+905403843333"
                    className="text-[#5bffa7] transition hover:text-white"
                  >
                    +90 540 384 33 33
                  </Link>
                </div>
                <div>
                  <p className={`font-semibold text-white ${headingFont}`}>E-posta</p>
                  <Link
                    href="mailto:info@avaxsavunma.com"
                    className="text-[#5bffa7] transition hover:text-white"
                  >
                    info@avaxsavunma.com
                  </Link>
                </div>
                <div>
                  <p className={`font-semibold text-white ${headingFont}`}>
                    Çalışma saatleri
                  </p>
                  <p>Hafta içi 09:00 – 18:00 · Cumartesi 09:00 – 14:00</p>
                </div>
              </div>
            </div>
            <form
              className="grid gap-4 text-sm text-slate-200"
              action="https://formsubmit.co/info@avaxsavunma.com"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="AVAX Savunma web formu" />
              <label className="grid gap-2">
                <span className={`font-semibold text-white ${headingFont}`}>
                  Adınız Soyadınız
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  className="rounded-xl border border-white/20 bg-[#030712]/40 p-3 text-white placeholder:text-slate-400"
                  placeholder="Adınızı girin"
                />
              </label>
              <label className="grid gap-2">
                <span className={`font-semibold text-white ${headingFont}`}>
                  E-posta
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-xl border border-white/20 bg-[#030712]/40 p-3 text-white placeholder:text-slate-400"
                  placeholder="ornek@kurum.com"
                />
              </label>
              <label className="grid gap-2">
                <span className={`font-semibold text-white ${headingFont}`}>
                  Telefon
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="rounded-xl border border-white/20 bg-[#030712]/40 p-3 text-white placeholder:text-slate-400"
                  placeholder="(5xx) xxx xx xx"
                />
              </label>
              <label className="grid gap-2">
                <span className={`font-semibold text-white ${headingFont}`}>
                  İhtiyacınız
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="rounded-xl border border-white/20 bg-[#030712]/40 p-3 text-white placeholder:text-slate-400"
                  placeholder="Tedarik etmek istediğiniz ürün ve adet bilgisini paylaşın"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-[#5bffa7] px-6 py-3 font-semibold text-[#02131f] transition hover:bg-white"
              >
                Gönder
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#01050b] py-10 text-sm text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-400">
            © {new Date().getFullYear()} AVAX Savunma. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="mailto:info@avaxsavunma.com?subject=KVKK%20ve%20gizlilik%20bilgisi"
              className="text-slate-400 transition hover:text-white"
            >
              KVKK & Çerez Politikası
            </Link>
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-slate-400 transition hover:text-white"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
