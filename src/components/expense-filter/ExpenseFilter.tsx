import categories from "../categories";

interface Props {
  onSelectCategory: (categories: string) => void;
}

export default function ExpenseFilter({ onSelectCategory }: Props) {
  return (
    <div className="mx-3">
      <select
        className="form-select"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
