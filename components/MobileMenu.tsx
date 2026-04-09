import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";

type MobileMenuProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, isLoggedIn, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4 border-t border-gray-200">
      <NavLinks mobile onLinkClick={onClose} />
      <AuthSection mobile isLoggedIn={isLoggedIn} onLinkClick={onClose} />
    </div>
  );
};

export default MobileMenu;
