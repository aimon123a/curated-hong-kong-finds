import { Link } from "react-router-dom";
import { Twitter, Instagram, ExternalLink } from "lucide-react";

interface ReviewerProfileProps {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  expertise?: string[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
  };
}

const ReviewerProfile = ({ id, name, title, imageUrl, bio, expertise, socialLinks }: ReviewerProfileProps) => {
  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-border">
        <p className="text-sm font-medium text-primary">這篇文章的作者</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Link to={`/selector/${id}`}>
            <img
              src={imageUrl}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 hover:border-primary transition-colors"
            />
          </Link>
          
          <div className="flex-1">
            <Link 
              to={`/selector/${id}`}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              {name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3">
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <Link
                to={`/selector/${id}`}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                查看所有文章
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mt-4">
          {bio}
        </p>
        
        {expertise && expertise.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {expertise.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerProfile;
