import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/home-view";
import { caller } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const page = async() => {
const greeting = await caller.hello({text: "Deepak"});

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      {greeting.greeting}
    </div>
    
  );

  return <HomeView />;
};

export default page;
