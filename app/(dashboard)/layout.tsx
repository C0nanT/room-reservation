import Sidenav from "@/components/Sidenav";
import Topbar from "@/components/Topbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Topbar />
      <div className="flex">
        <Sidenav />
        {children}
      </div>
    </main>
  );
}

export default layout;
