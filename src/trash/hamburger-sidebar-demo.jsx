import { SidebarProvider, SidebarInset} from "../components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import { HamburgerButton } from "../components/hamburger-button"


export default function HamburgerSidebarDemo() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b-3 border-black p-6">
          <HamburgerButton />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">My App</h1>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
