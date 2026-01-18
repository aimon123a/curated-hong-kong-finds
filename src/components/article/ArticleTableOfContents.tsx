interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  items: TocItem[];
}

const ArticleTableOfContents = ({ items }: ArticleTableOfContentsProps) => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-secondary/5 border border-secondary/20 rounded-sm overflow-hidden">
      <div className="bg-secondary/10 px-5 py-3 border-b border-secondary/20">
        <p className="font-bold text-foreground">目錄</p>
      </div>
      
      <nav className="p-5">
        <ol className="space-y-2">
          {items.map((item, index) => (
            <li 
              key={item.id}
              className={`${item.level === 2 ? '' : 'pl-4'}`}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="text-left text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed flex items-start gap-2"
              >
                <span className="text-primary font-medium shrink-0">
                  {item.level === 2 ? `${index + 1}.` : '・'}
                </span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ArticleTableOfContents;
