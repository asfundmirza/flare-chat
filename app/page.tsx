import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function Home() {
  const user: userInfo | null = await currentUser();

  return (
    <div>
      <UserButton />
      {user && user.id};
    </div>
  );
}
