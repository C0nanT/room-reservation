import Sidenav from "@/components/Sidenav";
import TopNav from "@/components/Topbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <TopNav />
      <Sidenav />
      {children}
    </main>
  );
}

export default layout;
