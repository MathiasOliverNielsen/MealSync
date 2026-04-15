interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ ...props }: SearchInputProps) {
  return <input type="text" placeholder="Search recipes..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />;
}
