import NavLink from "./NavLink";

type NavLinksProps = {
  mobile?: boolean;
  onLinkClick?: () => void;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/meal-plan", label: "Meal Plan" },
  { href: "/shopping-list", label: "Shopping List" },
];

const NavLinks = ({ mobile = false, onLinkClick }: NavLinksProps) => (
  <div className={mobile ? "flex flex-col gap-3 pt-4" : "hidden md:flex items-center gap-8"}>
    {NAV_LINKS.map((link) => (
      <NavLink key={link.href} href={link.href} label={link.label} onClick={onLinkClick} />
    ))}
  </div>
);

export default NavLinks;
