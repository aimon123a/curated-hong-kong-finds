interface HighlightedHeadingProps {
  id?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  as?: 'h2' | 'h3' | 'h4';
}

const HighlightedHeading = ({ 
  id, 
  children, 
  variant = 'primary',
  as: Component = 'h2'
}: HighlightedHeadingProps) => {
  const variantClasses = {
    primary: 'border-l-4 border-primary bg-primary/5 pl-4 py-2',
    secondary: 'border-l-4 border-secondary bg-secondary/5 pl-4 py-2',
    accent: 'border-b-2 border-accent pb-2',
  };

  const sizeClasses = {
    h2: 'text-xl md:text-2xl font-bold',
    h3: 'text-lg md:text-xl font-bold',
    h4: 'text-base md:text-lg font-semibold',
  };

  return (
    <Component 
      id={id}
      className={`text-foreground ${sizeClasses[Component]} ${variantClasses[variant]} mb-6`}
    >
      {children}
    </Component>
  );
};

export default HighlightedHeading;
