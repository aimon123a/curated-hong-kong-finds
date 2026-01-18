import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  isPR?: boolean;
}

const ArticleCard = ({
  id,
  categorySlug,
  title,
  excerpt,
  imageUrl,
  date,
  isPR = false,
}: ArticleCardProps) => {
  return (
    <Link
      to={`/category/${categorySlug}/article/${id}`}
      className="article-card block bg-card rounded-sm overflow-hidden group"
    >
      {/* Image */}
      <div className="image-container aspect-editorial relative">
        <img
          src={imageUrl}
          alt={title}
          className="article-image w-full h-full object-cover"
          loading="lazy"
        />
        {isPR && <span className="pr-label">PR</span>}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <time className="text-xs text-muted-foreground mb-2 block">
          {date}
        </time>
        <h4 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;