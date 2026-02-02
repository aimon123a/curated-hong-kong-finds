import { Link } from "react-router-dom";
import { ExternalLink, Check, Star } from "lucide-react";

interface ProductSectionProps {
  id: string;
  productId: string;
  rank: number;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  rating: number;
  description: string;
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
}

const ProductSection = ({
  id,
  productId,
  rank,
  name,
  brand,
  price,
  imageUrl,
  rating,
  description,
  pros,
  cons,
  specs,
}: ProductSectionProps) => {
  return (
    <section id={id} className="scroll-mt-24 py-8 border-b border-border last:border-b-0">
      {/* Rank badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg rounded-sm">
          {rank}
        </span>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {brand}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {name}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-background-warm rounded-sm p-8 aspect-square flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Details */}
        <div>
          {/* Price and Rating */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-foreground">
              HKD {price}
            </span>
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          {/* Pros */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">優點</h4>
            <ul className="space-y-1">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-2">缺點</h4>
            <ul className="space-y-1">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-0.5 flex-shrink-0">−</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/product/${productId}`}
              className="btn-primary px-6 py-3 text-center font-medium rounded-sm inline-flex items-center justify-center gap-2"
            >
              查看詳細規格
              <ExternalLink className="w-4 h-4" />
            </Link>
            <a
              href="#"
              className="btn-outline px-6 py-3 text-center font-medium rounded-sm"
            >
              官方網站購買
            </a>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-foreground mb-3">基本規格</h4>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {specs.map((spec, index) => (
                <tr key={index} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-2 bg-muted font-medium text-foreground w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;