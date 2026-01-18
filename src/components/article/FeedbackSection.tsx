import { useState } from "react";
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react";

const FeedbackSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  if (selected) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-sm p-6 text-center">
        <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="font-medium text-foreground">感謝你的回饋！</p>
        <p className="text-sm text-muted-foreground mt-1">
          你的意見幫助我們創作更好的內容。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted border border-border rounded-sm p-6 text-center">
      <p className="font-medium text-foreground mb-4">這篇文章對你有幫助嗎？</p>
      
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleSelect('helpful')}
          className="flex items-center gap-2 px-5 py-2 bg-card border border-border rounded-sm hover:border-primary hover:text-primary transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">有幫助</span>
        </button>
        
        <button
          onClick={() => handleSelect('not-helpful')}
          className="flex items-center gap-2 px-5 py-2 bg-card border border-border rounded-sm hover:border-muted-foreground transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm">需要改善</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackSection;
