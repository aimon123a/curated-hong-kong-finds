import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  slug?: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  isPR?: boolean;
  isFeatureReview?: boolean;
  isShareArticle?: boolean;
  isComingSoon?: boolean;
}

const ArticleCard = ({
  id,
  slug,
  categorySlug,
  title,
  excerpt,
  imageUrl,
  date,
  isPR = false,
  isFeatureReview = false,
  isShareArticle = false,
  isComingSoon = false,
}: ArticleCardProps) => {
  // Use flat slug URL if available, otherwise fall back to category-based path
  const linkPath = slug ? `/${slug}` : `/category/${categorySlug}/article/${id}`;

  return (
    <Link
      to={linkPath}
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
        {isComingSoon && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
            敬請期待
          </span>
        )}
        {!isComingSoon && isShareArticle && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
            個人分享
          </span>
        )}
        {!isComingSoon && isFeatureReview && !isShareArticle && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground">
            深度評測
          </span>
        )}
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