import { Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router";

export type WebNav = {};

const links: Array<{
  label: string;
  href: string;
}> = [
  // {
  //   label: "Features",
  //   href: "#features",
  // },
  // {
  //   label: "Pricing",
  //   href: "#pricing",
  // },
  // {
  //   label: "Docs",
  //   href: "/docs",
  // },
];

export default function WebFooter() {
  // const navigate = useNavigate();
  return (
    <footer className="sticky top-0 flex py-12">
      <ul className="flex flex-col gap-5">
        {/* <a href="/" className="text-xl font-bold">
          Invo.dev
        </a> */}
        {links.map((link) => (
          <Link key={link.label} to={link.href} className="text-lg">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="grow" />
      <div>
        {/* <SignedIn>
          <Button onClick={() => navigate("/dashboard")}>
            Dashboard {"->"}
          </Button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut> */}
      </div>
    </footer>
  );
}
