import { postEvent } from "@tma.js/sdk";

/**
 * Checks if the app is running inside Telegram Mini App
 */
export function isTelegramWebApp(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.parent !== window ||
      "TelegramWebviewProxy" in window ||
      "external" in window)
  );
}

/**
 * Shares content to Telegram Story
 * @param mediaUrl - HTTPS URL or blob URL of the media to share
 * @param text - Optional caption text (max 200 chars for regular users, 2048 for premium)
 */
export function shareToStory(mediaUrl: string, text?: string): void {
  console.log("[Telegram] shareToStory called", {
    mediaUrlLength: mediaUrl?.length,
    hasText: !!text,
    textLength: text?.length,
  });

  try {
    const params: any = {
      media_url: mediaUrl,
    };

    if (text) {
      // Truncate to 200 chars for regular users (safe limit)
      const truncatedText =
        text.length > 200 ? text.substring(0, 197) + "..." : text;
      params.text = truncatedText;

      if (text.length > 200) {
        console.warn(
          "[Telegram] Caption truncated from",
          text.length,
          "to 200 chars"
        );
      }
    }

    postEvent("web_app_share_to_story", params);
    console.log("[Telegram] postEvent completed");
  } catch (error) {
    console.error("[Telegram] Failed to share to story:", error);
    throw error;
  }
}

/**
 * Opens a link in Telegram's browser
 * @param url - Full URL with https protocol
 */
export function openLink(url: string): void {
  try {
    postEvent("web_app_open_link", { url });
  } catch (error) {
    console.error("Failed to open link:", error);
    throw error;
  }
}

/**
 * Shows haptic feedback
 * @param type - Type of haptic feedback
 * @param style - Optional style for impact type
 */
export function triggerHaptic(
  type: "impact" | "notification" | "selection_change",
  style?: "light" | "medium" | "heavy" | "rigid" | "soft",
  notificationType?: "error" | "success" | "warning"
): void {
  try {
    const params: any = { type };

    if (type === "impact" && style) {
      params.impact_style = style;
    }

    if (type === "notification" && notificationType) {
      params.notification_type = notificationType;
    }

    postEvent("web_app_trigger_haptic_feedback", params);
  } catch (error) {
    console.error("[Telegram] Failed to trigger haptic:", error);
  }
}
