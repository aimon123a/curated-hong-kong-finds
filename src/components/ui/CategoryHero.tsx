interface CategoryHeroProps {
  englishTitle: string;
  chineseTitle: string;
  description: string;
  imageUrl: string;
}

const CategoryHero = ({
  englishTitle,
  chineseTitle,
  description,
  imageUrl,
}: CategoryHeroProps) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={chineseTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-editorial relative h-full flex flex-col justify-end pb-8 md:pb-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-editorial uppercase text-primary-light mb-2 block">
            {englishTitle}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-3">
            {chineseTitle}
          </h1>
          <p className="text-background/80 text-sm md:text-base max-w-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;