import { currentUser } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
export default async function Home() {
  const user: userInfo | null = await currentUser();

  return (
    <div className="w-full min-h-screen bg-black/75 p-10 mx-auto">
      <Navbar userName={user?.firstName} />
    </div>
  );
}
