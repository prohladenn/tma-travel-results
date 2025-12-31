import html2canvas from "html2canvas";
import { ArrowLeft, Download, MapPin, Share2 } from "lucide-react";
import { useRef } from "react";
import { themes, ThemeType } from "./themes";

interface TravelEntry {
  country: string;
  flag: string;
  month: string;
}

interface BasedInData {
  country: string;
  flag: string;
}

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

  // Calculate unique countries
  const uniqueCountries = new Set(travels.map((t) => t.country)).size;

  // Calculate months of travel (approximate)
  const monthsOfTravel = Math.min(12, Math.ceil(travels.length * 0.75));
  const rowCount = Math.max(1, Math.ceil(travels.length / 3));

  const generateImage = async () => {
    if (!recapRef.current) return null;

    const canvas = await html2canvas(recapRef.current, {
      backgroundColor: null,
      scale: 2, // Higher quality
      useCORS: true,
    });

    return canvas.toDataURL("image/png");
  };

  const handleSave = async () => {
    const imageData = await generateImage();
    if (!imageData) return;

    const link = document.createElement("a");
    link.download = `travel-recap-2025.png`;
    link.href = imageData;
    link.click();
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
          text: "Check out my 2025 travel recap!",
        });
      } catch (error) {
        // User cancelled or error occurred, fallback to download
        handleSave();
      }
    } else {
      // Fallback to download if share is not supported
      handleSave();
    }
  };

  return (
    <div
      className={`h-screen w-full bg-gradient-to-br ${currentTheme.background} flex items-center justify-center p-4 overflow-hidden`}
    >
      <div
        className={`w-full max-w-md aspect-[9/16] ${
          theme === "midnight" ? "bg-slate-900/95" : "bg-white/95"
        } backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col relative`}
        ref={recapRef}
      >
        <div className="relative z-10 flex flex-col flex-1">
          {/* Back button */}
          <button
            onClick={onBack}
            className={`absolute top-4 left-4 z-10 ${
              theme === "midnight"
                ? "bg-slate-800/80 hover:bg-slate-800"
                : "bg-white/80 hover:bg-white"
            } backdrop-blur-sm rounded-full p-2 shadow-md transition-colors`}
          >
            <ArrowLeft
              className={`size-5 ${
                theme === "midnight" ? "text-gray-200" : "text-gray-700"
              }`}
            />
          </button>

          {/* Header */}
          <div
            className={`bg-gradient-to-r ${currentTheme.header} px-4 py-4 text-center text-white relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1 left-1 text-3xl">✈️</div>
              <div className="absolute bottom-1 right-1 text-3xl">🌍</div>
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
              <div className="stat-number">{uniqueCountries}</div>
              <div className="stat-label">countries</div>
            </div>
            <div className="text-center">
              <div className="stat-number">{travels.length}</div>
              <div className="stat-label">trips</div>
            </div>
            <div className="text-center">
              <div className="stat-number">{monthsOfTravel}</div>
              <div className="stat-label">months</div>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="flex-1 px-4 py-2 overflow-hidden min-h-0 flex">
            <div
              className="grid grid-cols-3 gap-1.5 w-full h-full"
              style={{
                gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
              }}
            >
              {travels.map((travel, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${
                    currentTheme.cardBg
                  } rounded-lg p-1 shadow-sm border ${
                    currentTheme.cardBorder
                  } flex flex-col items-center justify-center h-full ${
                    theme === "midnight" ? "text-gray-200" : ""
                  }`}
                >
                  <div className="text-xl leading-none">{travel.flag}</div>
                  <div className="country-name">{travel.country}</div>
                  <div className="month-label">{travel.month}</div>
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
              <MapPin className={`size-3 ${currentTheme.accentColor}`} />
              <span className="based-label text-gray-600">Based in</span>
              <span className="based-flag">{basedIn.flag}</span>
              <span className="based-country">{basedIn.country}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className={`flex-1 bg-gradient-to-r ${currentTheme.button1} text-white py-2 rounded-xl shadow-md text-base transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                <Download className="size-4" />
                Save
              </button>
              <button
                onClick={handleShare}
                className={`flex-1 bg-gradient-to-r ${currentTheme.button2} text-white py-2 rounded-xl shadow-md text-base transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                <Share2 className="size-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
