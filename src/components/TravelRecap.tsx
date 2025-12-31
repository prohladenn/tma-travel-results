import html2canvas from "html2canvas-pro";
import { ArrowLeft, MapPin, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MONTHS, TG_APP_LINK } from "../constants";
import { BasedInData, TravelEntry } from "../types";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import {
  isTelegramWebApp,
  shareToStory,
  triggerHaptic,
} from "../utils/telegram";
import { themes, ThemeType } from "./themes";

interface TravelRecapProps {
  travels: TravelEntry[];
  basedIn: BasedInData;
  theme: ThemeType;
  onBack: () => void;
}

export function TravelRecap({
  travels,
  basedIn,
  theme,
  onBack,
}: TravelRecapProps) {
  const recapRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes[theme];
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const isTG = isTelegramWebApp();
    console.log("[TravelRecap] Environment check:", {
      isTelegram: isTG,
      showStoryButton: isTG,
    });
    setIsTelegram(isTG);
  }, []);

  // Calculate unique countries
  const uniqueCountries = new Set(travels.map((t) => t.country)).size;

  // Calculate unique months of travel
  const uniqueMonths = new Set<string>();
  travels.forEach((travel) => {
    const fromIndex = MONTHS.indexOf(travel.month.split("-")[0]);
    const toIndex = MONTHS.indexOf(
      travel.month.split("-").pop() || travel.month
    );

    if (toIndex >= fromIndex) {
      // Normal range (e.g., Jan to Mar)
      for (let i = fromIndex; i <= toIndex; i++) {
        uniqueMonths.add(MONTHS[i]);
      }
    } else {
      // Wraps around year (e.g., Nov to Jan)
      for (let i = fromIndex; i < MONTHS.length; i++) {
        uniqueMonths.add(MONTHS[i]);
      }
      for (let i = 0; i <= toIndex; i++) {
        uniqueMonths.add(MONTHS[i]);
      }
    }
  });
  const monthsOfTravel = uniqueMonths.size;
  const rowCount = Math.max(1, Math.ceil(travels.length / 3));

  const generateImage = async () => {
    if (!recapRef.current) return null;

    // Wait a bit for styles to be fully applied
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(recapRef.current, {
      scale: 2,
      backgroundColor: theme === "midnight" ? "#0f172a" : "#ffffff",
      useCORS: true,
      logging: false,
      allowTaint: false,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        // Exclude the back button and action buttons from the capture
        return (
          element.classList?.contains("exclude-from-capture") ||
          (element.classList?.contains("absolute") &&
            element.tagName === "BUTTON")
        );
      },
    });

    return canvas.toDataURL("image/png");
  };

  const handleShare = async () => {
    const imageData = await generateImage();
    if (!imageData) return;

    // Convert data URL to blob
    const res = await fetch(imageData);
    const blob = await res.blob();
    const file = new File([blob], "travel-recap-2025.png", {
      type: "image/png",
    });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "2025 Travel Recap",
          text: `Check out my 2025 travel recap!\nCreate yours: https://${TG_APP_LINK}`,
        });
      } catch (error) {
        // User cancelled share
        if (import.meta.env.DEV) {
          console.log("Share cancelled");
        }
      }
    } else {
      // Fallback to download if share is not supported
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "travel-recap-2025.png";
      link.href = blobUrl;
      link.click();
      URL.revokeObjectURL(blobUrl);
    }
  };

  const handleShareToStory = async () => {
    console.log("[TravelRecap] Share to Story button clicked");
    try {
      setIsUploading(true);
      triggerHaptic("impact", "light");

      const imageData = await generateImage();
      if (!imageData) {
        console.error("[TravelRecap] Failed to generate image");
        return;
      }
      console.log(
        "[TravelRecap] Image generated, size:",
        imageData.length,
        "bytes"
      );

      // Convert data URL to blob
      const res = await fetch(imageData);
      const blob = await res.blob();
      console.log("[TravelRecap] Blob created:", {
        size: blob.size,
        type: blob.type,
      });

      // Upload to Cloudinary to get HTTPS URL
      const imageUrl = await uploadImageToCloudinary(blob);
      console.log("[TravelRecap] Image uploaded, URL:", imageUrl);

      const caption = `My 2025 travels: ${uniqueCountries} countries, ${travels.length} trips! ✈️🌍\n\nCreate yours: ${TG_APP_LINK}`;
      console.log("[TravelRecap] Caption length:", caption.length);

      shareToStory(imageUrl, caption);
      console.log("[TravelRecap] shareToStory called successfully");

      triggerHaptic("notification", undefined, "success");
    } catch (error) {
      console.error("[TravelRecap] Failed to share to story:", error);
      triggerHaptic("notification", undefined, "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      ref={recapRef}
      className={`h-screen w-full bg-gradient-to-br ${currentTheme.background} flex items-center justify-center p-4 overflow-hidden`}
    >
      <div
        className={`w-full max-w-md aspect-[9/16] ${
          theme === "midnight" ? "bg-slate-900" : "bg-white"
        } rounded-3xl shadow-2xl overflow-hidden flex flex-col relative`}
      >
        <div className="relative z-10 flex flex-col flex-1">
          {/* Back button */}
          <button
            onClick={onBack}
            className={`absolute top-4 left-4 z-10 ${
              theme === "midnight"
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white hover:bg-gray-50"
            } rounded-full p-2 shadow-md transition-colors`}
          >
            <ArrowLeft
              className={`size-5 ${
                theme === "midnight" ? "text-gray-200" : "text-gray-700"
              }`}
            />
          </button>

          {/* Header */}
          <div
            className={`bg-gradient-to-r ${currentTheme.header} px-4 py-3 text-center text-white relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <div className="w-full">
                <div className="grid grid-cols-7 gap-4 text-3xl mb-1">
                  <div>✈️</div>
                  <div>🌍</div>
                  <div>🗺️</div>
                  <div> </div>
                  <div>🌍</div>
                  <div>🗺️</div>
                  <div>✈️</div>
                </div>
                <div className="grid grid-cols-7 gap-4 text-3xl">
                  <div>🗺️</div>
                  <div> </div>
                  <div> </div>
                  <div> </div>
                  <div> </div>
                  <div> </div>
                  <div>🗺️</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="recap-emoji mb-1">✈️</div>
              <h1 className="story-title">2025 Travel Recap</h1>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className={`grid grid-cols-3 gap-2 px-4 py-2.5 bg-gradient-to-b ${
              currentTheme.statsBar
            } ${theme === "midnight" ? "text-gray-200" : ""}`}
          >
            <div className="text-center">
              <div className={`stat-number ${currentTheme.accentColor}`}>
                {uniqueCountries}
              </div>
              <div
                className={`stat-label ${
                  theme === "midnight" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                countries
              </div>
            </div>
            <div className="text-center">
              <div className={`stat-number ${currentTheme.accentColor}`}>
                {travels.length}
              </div>
              <div
                className={`stat-label ${
                  theme === "midnight" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                trips
              </div>
            </div>
            <div className="text-center">
              <div className={`stat-number ${currentTheme.accentColor}`}>
                {monthsOfTravel}
              </div>
              <div
                className={`stat-label ${
                  theme === "midnight" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                months
              </div>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="flex-1 px-4 py-2 overflow-hidden min-h-0 flex">
            <div
              className="grid grid-cols-3 gap-2 w-full h-full"
              style={{
                gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
              }}
            >
              {travels.map((travel, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${currentTheme.cardBg} rounded-xl p-2.5 shadow-md border ${currentTheme.cardBorder} flex flex-col items-center justify-center h-full gap-0.5`}
                >
                  <div className="text-2xl leading-none">{travel.flag}</div>
                  <div
                    className={`country-name ${
                      theme === "midnight" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {travel.country}
                  </div>
                  <div
                    className={`month-label ${
                      theme === "midnight" ? "text-gray-400" : "text-gray-400"
                    }`}
                  >
                    {travel.month}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`px-4 py-2.5 bg-gradient-to-t ${currentTheme.footer} border-t ${currentTheme.footerBorder}`}
          >
            <div
              className={`flex items-center justify-center gap-1.5 mb-2 ${
                theme === "midnight" ? "text-gray-200" : ""
              }`}
            >
              <MapPin
                className={`size-3 ${currentTheme.accentColor} flex-shrink-0`}
              />
              <span
                className={`based-label leading-none ${
                  theme === "midnight" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Based in
              </span>
              <span className="based-flag leading-none">{basedIn.flag}</span>
              <span
                className={`based-country leading-none ${
                  theme === "midnight" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {basedIn.country}
              </span>
            </div>
            <div
              className={`text-center text-xs mt-1.5 mb-2 ${
                theme === "midnight" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {TG_APP_LINK}
            </div>
            <div className="flex gap-2 exclude-from-capture">
              {isTelegram !== null && (
                <>
                  {isTelegram && (
                    <button
                      onClick={handleShareToStory}
                      disabled={isUploading}
                      className={`flex-1 bg-gradient-to-r ${
                        currentTheme.button2
                      } text-white py-2 rounded-xl shadow-md text-base transition-all duration-200 ${
                        isUploading
                          ? "opacity-70 cursor-not-allowed"
                          : "active:scale-[0.98]"
                      } flex items-center justify-center gap-2`}
                    >
                      {isUploading ? (
                        <>
                          <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          Story
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={handleShare}
                    className={`${
                      isTelegram ? "flex-1" : "w-full"
                    } bg-gradient-to-r ${
                      currentTheme.button1
                    } text-white py-2 rounded-xl shadow-md text-base transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2`}
                  >
                    <Share2 className="size-4" />
                    Share
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
