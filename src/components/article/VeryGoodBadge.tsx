interface VeryGoodBadgeProps {
  rating?: string;
  className?: string;
}

const VeryGoodBadge = ({ rating = "Very Good!", className = "" }: VeryGoodBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-4 py-2 rounded-sm shadow-sm">
        <span className="font-bold text-sm tracking-wide">{rating}</span>
      </div>
    </div>
  );
};

export default VeryGoodBadge;
