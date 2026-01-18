interface SectionHeaderProps {
  englishTitle: string;
  chineseTitle: string;
  description?: string;
}

const SectionHeader = ({ englishTitle, chineseTitle, description }: SectionHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-xs font-semibold tracking-editorial uppercase text-primary">
          {englishTitle}
        </h2>
        <div className="h-px flex-1 bg-border max-w-16" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {chineseTitle}
      </h3>
      {description && (
        <p className="text-muted-foreground text-sm max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;