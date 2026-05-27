import { siteConfig } from "@/data/config";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: siteConfig.name,
    alternateName: "BASE Wilmington",
    description: siteConfig.longDescription,
    url: "https://basewilmington.com",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.stateAbbr,
      addressCountry: "US",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ],
    keywords: siteConfig.seoKeywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
