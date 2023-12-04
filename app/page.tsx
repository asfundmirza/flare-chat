import { currentUser } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Division from "./components/Division";
export default async function Home() {
  const user: userInfo | null = await currentUser();

  return (
    <div className="min-h-screen      bg-black">
      <Navbar userName={user?.firstName} />
      <Division />
    </div>
  );
}
