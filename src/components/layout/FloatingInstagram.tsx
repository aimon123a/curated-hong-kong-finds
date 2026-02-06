import { useState } from "react";
import { Instagram } from "lucide-react";

const FloatingInstagram = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`bg-card border border-border rounded-lg p-3 shadow-lg max-w-[220px] text-sm leading-relaxed transition-all duration-200 origin-bottom-right ${
          isHovered
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-1 pointer-events-none"
        }`}
      >
        <p className="text-foreground">
          如需更多資訊、現貨查詢，歡迎瀏覽{" "}
          <span className="font-semibold text-primary">@jaag_select</span>
        </p>
      </div>

      {/* Icon Button */}
      <a
        href="https://www.instagram.com/jaag_select"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[hsl(330,70%,50%)] via-[hsl(350,80%,55%)] to-[hsl(30,90%,55%)] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        aria-label="Instagram @jaag_select"
      >
        <Instagram className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingInstagram;
