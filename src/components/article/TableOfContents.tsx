interface TOCItem {
  id: string;
  rank: number;
  name: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
}

const TableOfContents = ({ items, activeId }: TableOfContentsProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-24 bg-card border border-border rounded-sm p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        產品排名
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left flex items-center gap-3 px-2 py-1.5 rounded-sm transition-colors ${
                activeId === item.id
                  ? "bg-primary-light text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center bg-muted text-xs font-bold rounded-sm">
                {item.rank}
              </span>
              <span className="text-sm line-clamp-1">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;