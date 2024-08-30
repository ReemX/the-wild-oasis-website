import SideNavigation from "../_components/SideNavigation";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

export default AccountLayout;
