import { Navbar1 } from "../components/Navbar1";

export default function Page() {
  return (
    <Navbar1
      logoText="osmo" // ✅ here
      menu={{
        openLabel: "Menu",
        closeLabel: "Menu",
      }}
      leftSections={[
        {
          title: "OUR PRODUCTS",
          items: [
            { label: "The Vault", href: "/" },
            { label: "Page Transition Course", href: "/", tag: "NEW" },
            { label: "Icon Library", href: "/" },
            { label: "Community", href: "/" },
          ],
        },
      ]}
      rightSections={[
        {
          title: "EXPLORE",
          items: [
            { label: "Osmo Showcase", href: "/" },
            { label: "Collection", href: "/" },
            { label: "Pricing", href: "/" },
          ],
        },
      ]}
      socials={[
        {
          label: "in",
          href: "/linkedin",
          iconSrc: "/linkedin.svg",
        },
        {
          label: "ig",
          href: "/instagram",
          iconSrc: "/instagram.svg",
        },
        {
          label: "x",
          href: "/twitter",
          iconSrc: "/twitter.svg",
        },
      ]}
      featured={{
        badge: "AVAILABLE TODAY",
        title: "Page Transition Course",
        buttonText: "More info",
      }}
      auth={{
        login: { label: "Login", href: "/" },
        join: { label: "Join", href: "/" },
      }}
    />
  );
}