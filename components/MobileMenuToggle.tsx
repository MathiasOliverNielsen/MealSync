type MobileMenuToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MobileMenuToggle = ({ isOpen, onClick }: MobileMenuToggleProps) => (
  <button onClick={onClick} className="md:hidden flex flex-col gap-1.5" aria-label="Toggle menu">
    <div className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
    <div className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "opacity-0" : ""}`} />
    <div className={`w-6 h-0.5 bg-gray-900 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
  </button>
);

export default MobileMenuToggle;
