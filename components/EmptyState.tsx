interface EmptyStateProps {
  title: string;
  message?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      {message && <p className="text-gray-600 mb-6">{message}</p>}
      {children}
    </div>
  );
}
