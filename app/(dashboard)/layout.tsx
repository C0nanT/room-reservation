import Sidenav from "@/components/Sidenav";
import TopNav from "@/components/Topbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopNav />
      <div className="flex">
        <Sidenav />
        {children}
      </div>
    </main>
  );
}

export default layout;
