"use client";

import Script from "next/script";
import { siteConfig } from "@/data/config";

// =============================================================================
// GHL Chat Widget
// Loads the GoHighLevel support chat widget on every page.
// Widget ID lives in src/data/config.ts (siteConfig.ghl.chatWidgetId).
// =============================================================================
export function GHLChatWidget() {
  return (
    <Script
      id="ghl-chat-widget"
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={siteConfig.ghl.chatWidgetId}
      strategy="afterInteractive"
    />
  );
}
