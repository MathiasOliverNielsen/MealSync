import { ShoppingListItem } from "@/lib/types";

interface ShoppingListItemComponentProps {
  item: ShoppingListItem;
  checked: boolean;
  onCheck: (id: string) => void;
}

export function ShoppingListItemComponent({ item, checked, onCheck }: ShoppingListItemComponentProps) {
  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded">
      <input type="checkbox" checked={checked} onChange={() => onCheck(item.name)} className="w-4 h-4 accent-blue-600" />
      <div className="flex-1">
        <p className={`font-medium capitalize ${checked ? "line-through text-gray-500" : "text-gray-900"}`}>{item.name}</p>
        <p className="text-sm text-gray-600">{item.count > 1 ? `${item.count}x ${item.measure}` : item.measure}</p>
      </div>
    </div>
  );
}
