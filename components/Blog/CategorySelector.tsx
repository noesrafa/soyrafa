interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          !selectedCategory 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Todas
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === category 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector; 