import { ExternalLink } from "lucide-react";

interface ProductCTABoxProps {
  productName: string;
  brand: string;
  imageUrl: string;
  price?: string;
  buyLinks?: Array<{
    name: string;
    url: string;
    price: string;
  }>;
  note?: string;
}

const ProductCTABox = ({ 
  productName, 
  brand, 
  imageUrl, 
  price, 
  buyLinks,
  note
}: ProductCTABoxProps) => {
  return (
    <div className="bg-card border-2 border-primary/30 rounded-sm overflow-hidden my-8">
      <div className="bg-primary/5 px-5 py-3 border-b border-primary/20">
        <p className="text-sm font-medium text-primary">商品概要</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="sm:w-1/3">
            <div className="bg-background rounded-sm p-4">
              <img
                src={imageUrl}
                alt={productName}
                className="w-full max-w-[200px] mx-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="sm:w-2/3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {brand}
            </p>
            <h4 className="text-lg font-bold text-foreground mb-2">
              {productName}
            </h4>
            
            {price && (
              <p className="text-xl font-bold text-primary mb-4">
                HKD {price}
              </p>
            )}
            
            {note && (
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {note}
              </p>
            )}
            
            {/* Buy Links */}
            <div className="flex flex-col gap-2">
              {buyLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    px-5 py-3 rounded-sm font-medium text-sm inline-flex items-center justify-center gap-2 transition-all
                    ${index === 0 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'border border-border text-foreground hover:border-primary hover:text-primary'
                    }
                  `}
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.name}で購入 - HKD {link.price}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCTABox;
