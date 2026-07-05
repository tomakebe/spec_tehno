import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navigation from "./components/header";
import Footer from "./components/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";

// TODO: Replace with your real production domain (no trailing slash)
const SITE_URL = "https://spectechnogroup.kg";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const meta: Record<string, { title: string; description: string; ogLocale: string }> = {
        ru: {
            title: "СпецТехноГрупп — Аренда спецтехники в Бишкеке",
            description:
                "Аренда спецтехники в Бишкеке: экскаваторы, автокраны, самосвалы, бетононасосы. Полный цикл от аренды до управления проектом. Работаем Пн–Пт 9:00–18:00.",
            ogLocale: "ru_RU",
        },
        en: {
            title: "SpecTechnoGroup — Construction Equipment Rental in Bishkek",
            description:
                "Construction equipment rental in Bishkek: excavators, truck cranes, dump trucks, concrete pumps. Full cycle from rental to project management.",
            ogLocale: "en_US",
        },
        kg: {
            title: "СпецТехноГрупп — Бишкекте атайын техника ижарасы",
            description:
                "Бишкекте атайын техника ижарасы: экскаваторлор, автокрандар, самосвалдар, бетон насостору. Ижарадан долбоорду башкарууга чейин.",
            ogLocale: "ky_KG",
        },
    };

    const current = meta[locale] ?? meta.ru;
    const canonicalUrl = `${SITE_URL}/${locale}`;

    return {
        title: current.title,
        description: current.description,
        metadataBase: new URL(SITE_URL),
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/apple-touch-icon.png",
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ru: `${SITE_URL}/ru`,
                en: `${SITE_URL}/en`,
                kg: `${SITE_URL}/kg`,
            },
        },
        openGraph: {
            title: current.title,
            description: current.description,
            url: canonicalUrl,
            siteName: "СпецТехноГрупп",
            locale: current.ogLocale,
            type: "website",
            // TODO: Create a 1200×630 px banner and place it at /public/og-image.jpg
            // images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "СпецТехноГрупп" }],
        },
        robots: { index: true, follow: true },
        // TODO: Add verification tokens after connecting Google Search Console / Yandex Webmaster
        // verification: { google: "XXXX", yandex: "XXXX" },
    };
}

// JSON-LD structured data — helps Google show rich results (address, phone, hours)
function LocalBusinessSchema({ locale }: { locale: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        // TODO: Confirm legal business name
        name: "СпецТехноГрупп",
        // TODO: Replace with your real URL once deployed
        url: `${SITE_URL}/${locale}`,
        // TODO: Replace with real phone number
        telephone: "+996312000000",
        // TODO: Replace with real email
        email: "info@spectechnogroup.kg",
        // TODO: Fill in real address details
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Манаса, 42",
            addressLocality: "Бишкек",
            addressCountry: "KG",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Saturday"],
                opens: "09:00",
                closes: "14:00",
            },
        ],
        // TODO: Add real logo image URL
        // logo: `${SITE_URL}/logo.png`,
        // TODO: Add real social profiles
        // sameAs: ["https://instagram.com/spectechnogroup", "https://wa.me/996XXXXXXXXX"],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <head>
                <LocalBusinessSchema locale={locale} />
            </head>
            <body className="min-h-full flex flex-col">
                <NextIntlClientProvider>
                    <Navigation />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
