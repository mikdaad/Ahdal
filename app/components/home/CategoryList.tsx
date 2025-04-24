import Image from "next/image";

interface CategoryItem {
  image: string;
  title: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onCategorySelect: (category: string) => void;
}

export function CategoryList({ categories,onCategorySelect }: CategoryListProps ) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {categories.map((category, index) => (
         <button key={category.title} onClick={() => onCategorySelect(category.title)}>
        <div
          key={index}
          className="flex flex-col items-center gap-2 min-w-[80px]"
        >
          <Image
            src={category.image}
            alt={category.title}
            className="w-14 h-14 rounded-full"
            loading="lazy"
          />
          <span className="text-sm font-medium text-white">{category.title}</span>
        </div>
        </button>
      ))}
    </div>
  );
}
