import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Selector } from "@/data/sampleData";

interface SelectorCardProps {
  selector: Selector;
}

const SelectorCard = ({ selector }: SelectorCardProps) => {
  return (
    <Link
      to={`/selector/${selector.id}`}
      className="group block bg-card border border-border rounded-sm overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={selector.imageUrl}
          alt={selector.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold tracking-editorial uppercase text-primary block mb-1">
          {selector.englishName}
        </span>
        <h3 className="font-bold text-foreground mb-1">
          {selector.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {selector.title}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {selector.expertise.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {selector.articleCount} 篇文章
          </span>
          <span className="text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            查看更多 <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SelectorCard;
