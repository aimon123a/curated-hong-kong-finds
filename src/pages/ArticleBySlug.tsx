import { useParams, Navigate } from "react-router-dom";
import { getArticleBySlug } from "@/data/sampleData";
import FeatureArticle from "./FeatureArticle";
import FeatureArticleV2 from "./FeatureArticleV2";
import Article from "./Article";
import NotFound from "./NotFound";

/**
 * Resolves a flat /:slug URL to the correct article renderer
 * based on article type flags (isShareArticle, isFeatureReview, etc.)
 */
const ArticleBySlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return <NotFound />;
  }

  // Render the appropriate component based on article type
  if ((article as any).isShareArticle) {
    return (
      <FeatureArticleV2
        fixedCategorySlug={article.categorySlug}
        fixedArticleId={article.id}
      />
    );
  }

  if ((article as any).isFeatureReview) {
    return (
      <FeatureArticle
        fixedCategorySlug={article.categorySlug}
        fixedArticleId={article.id}
      />
    );
  }

  // Default article renderer - pass as props if supported, or redirect
  return <Navigate to={`/category/${article.categorySlug}/article/${article.id}`} replace />;
};

export default ArticleBySlug;
