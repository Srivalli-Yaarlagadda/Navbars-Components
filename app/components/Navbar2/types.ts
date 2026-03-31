export interface NavLink {
  label: string;
  href: string;
  number: number;
  kanjiNumber: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
}

export interface LegalLinks {
  privacyPolicy: string;
  termsOfService: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  officeLines: string[];
  officeHours: string;
  social: SocialLinks;
  legal: LegalLinks;
}

export interface NavbarProps {
  brandName: string;
  establishedYear: string;
  logoKanji: string;
  links: NavLink[];
  contact: ContactInfo;
  disclaimer?: string;
  copyrightYear?: string;
}