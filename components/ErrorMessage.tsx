interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Something went wrong" }: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 text-lg">{message}</p>
    </div>
  );
}
