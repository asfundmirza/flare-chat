import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
export default function Home() {
  return <UserButton />;
}
