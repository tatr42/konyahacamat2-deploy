import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/**
 * AI arama/asistan botları açıkça serbest bırakılır — AI cevaplarında
 * alıntılanmak marka görünürlüğü için kritik. (.net'teki desenle aynı.)
 */
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
  };
}
