import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

const NavLink = ({ href, label, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick} className={`transition-colors ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}>
      {label}
    </Link>
  );
};

export default NavLink;
