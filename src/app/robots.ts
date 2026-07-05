import type { MetadataRoute } from "next";

// TODO: Replace with your real production domain
const SITE_URL = "https://spectechnogroup.kg";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
