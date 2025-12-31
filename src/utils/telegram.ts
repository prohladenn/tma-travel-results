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
 * @param mediaUrl - URL of the media to share (must be accessible)
 * @param text - Optional caption text (0-200 chars for regular users, 0-2048 for premium)
 * @param widgetLink - Optional widget link object
 */
export function shareToStory(
  mediaUrl: string,
  text?: string,
  widgetLink?: { url: string; name?: string }
): void {
  console.log("[Telegram] shareToStory called", {
    mediaUrlLength: mediaUrl?.length,
    hasText: !!text,
  });

  try {
    const params: any = {
      media_url: mediaUrl,
    };

    if (text) {
      params.text = text;
    }

    if (widgetLink) {
      params.widget_link = widgetLink;
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
