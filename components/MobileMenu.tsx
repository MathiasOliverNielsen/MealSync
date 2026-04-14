import NavLinks from "./NavLinks";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4 border-t border-gray-200">
      <NavLinks mobile onLinkClick={onClose} />
    </div>
  );
};

export default MobileMenu;
