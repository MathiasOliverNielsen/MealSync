import Link from "next/link";

type AuthSectionProps = {
  isLoggedIn: boolean;
  mobile?: boolean;
  onLinkClick?: () => void;
};

const AuthSection = ({ isLoggedIn, mobile = false, onLinkClick }: AuthSectionProps) => {
  if (mobile) {
    return (
      <div className="border-t border-gray-200 pt-3 mt-2">
        {isLoggedIn ? (
          <button onClick={onLinkClick} className="w-full text-left px-2 py-2 text-gray-600 hover:text-gray-900">
            User Menu
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={onLinkClick} className="px-2 py-2 text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/signup" onClick={onLinkClick} className="bg-blue-600 text-white px-2 py-2 rounded text-center hover:bg-blue-700 transition-colors">
              Sign up
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-4">
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          {/* User avatar placeholder */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">[A]</span>
          </div>
          <button className="text-gray-600 hover:text-gray-900">Menu</button>
        </div>
      ) : (
        <>
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthSection;
