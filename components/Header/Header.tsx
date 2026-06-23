import Link from "next/link";

const groups = [
  { label: "Group A", href: "/groupa" },
  { label: "Group B", href: "/groupb" },
  { label: "Group C", href: "/groupc" },
  { label: "Group D", href: "/groupd" },
  { label: "Group E", href: "/groupe" },
  { label: "Group F", href: "/groupf" },
  { label: "Group G", href: "/groupg" },
  { label: "Group H", href: "/grouph" },
  { label: "Group I", href: "/groupi" },
  { label: "Group J", href: "/groupj" },
  { label: "Group K", href: "/groupk" },
  { label: "Group L", href: "/groupl" },
];

export default function Header() {
  return (
    <header>
      {groups.map((group) => (
        <Link key={group.href} href={group.href}>
          {group.label}
        </Link>
      ))}
    </header>
  );
}
