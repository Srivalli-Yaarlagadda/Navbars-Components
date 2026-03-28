export type NavItem = {
  label: string;
  href: string;
  tag?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type Navbar1Props = {
  // ❌ remove logo image
  // logo: string;

  // ✅ NEW
  logoText: string;

  leftSections: NavSection[];
  rightSections: NavSection[];

  socials: {
    label: string;
    href: string;
    iconSrc: string; // e.g. "/linkedin.svg"
  }[];

  featured: {
    badge?: string;
    title: string;
    buttonText: string;
  };

  auth: {
    login: { label: string; href: string };
    join: { label: string; href: string };
  };

  menu: {
    openLabel: string;
    closeLabel: string;
  };
};