import { Metadata } from "next";

const SITE_NAME = "RevOps Analytics";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const SITE_DESCRIPTION = "Revenue operations analytics platform connecting Stripe and HubSpot for unified SaaS metrics.";
const DEFAULT_OG_IMAGE = "/og-image.png";

interface PageMetadata {
    title: string;
    description?: string;
    path?: string;
    ogImage?: string;
    noIndex?: boolean;
}

/**
 * Generate comprehensive metadata for a page including SEO, Open Graph, and Twitter Card tags
 */
export function generateMetadata({
    title,
    description = SITE_DESCRIPTION,
    path = "",
    ogImage = DEFAULT_OG_IMAGE,
    noIndex = false,
}: PageMetadata): Metadata {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

    return {
        title: fullTitle,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [ogImageUrl],
        },
    };
}

/**
 * Generate metadata for blog posts or articles
 */
export function generateArticleMetadata({
    title,
    description = SITE_DESCRIPTION,
    path = "",
    ogImage = DEFAULT_OG_IMAGE,
    publishedTime,
    modifiedTime,
    authors = [],
    tags = [],
}: PageMetadata & {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
}): Metadata {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

    return {
        title: fullTitle,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
            locale: "en_US",
            type: "article",
            publishedTime,
            modifiedTime,
            authors,
            tags,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [ogImageUrl],
        },
    };
}

/**
 * Common metadata for all pages (used in root layout)
 */
export const siteConfig = {
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
};
