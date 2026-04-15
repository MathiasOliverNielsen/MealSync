interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", isLoading = false, children, className = "", disabled = false, ...props }: ButtonProps) {
  const baseStyles =
    "font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 focus:ring-blue-500 active:shadow-md",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 focus:ring-gray-400 border border-gray-300",
    outline: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 focus:ring-blue-500 active:bg-blue-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:-translate-y-0.5 focus:ring-gray-300",
  };

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
    xl: "px-12 py-5 text-lg",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
