import Link from "next/link";

export default function Linka({href, text}: { href: string; text: string}){
  return (
    <Link href={href} className="link link-hover">{text}</Link>
  )
}