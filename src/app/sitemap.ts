import type { MetadataRoute } from "next";
import { routing } from "@/src/i18n/routing";

// TODO: Replace with your real production domain
const SITE_URL = "https://spectechnogroup.kg";

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = routing.locales;
    const lastModified = new Date();

    const alternateLanguages = Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
    );

    return locales.map((locale) => ({
        url: `${SITE_URL}/${locale}`,
        lastModified,
        changeFrequency: "monthly",
        priority: locale === routing.defaultLocale ? 1.0 : 0.8,
        alternates: { languages: alternateLanguages },
    }));
}
