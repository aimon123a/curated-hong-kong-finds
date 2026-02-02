import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  rating?: number;
  isRecommended?: boolean;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  imageUrl,
  rating,
  isRecommended = false,
}: ProductCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      className="product-card block bg-card group"
    >
      {/* Image */}
      <div className="image-container aspect-product relative bg-background-warm">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isRecommended && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground">
            編輯推薦
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {brand}
        </p>
        <h4 className="font-medium text-foreground text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">
            HKD {price}
          </span>
          {rating && (
            <span className="text-xs text-primary font-medium">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* View details link */}
      <div className="px-4 pb-4">
        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:underline">
          查看詳情
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;