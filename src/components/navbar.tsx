import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import ThemeToggle from './theme-toggle'
import StoreSwitcher from './store-switcher'
import { Store } from '@/interfaces'

const Navbar = ({ stores }: { stores: Store[] }) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <StoreSwitcher className="flex items-center pl-3" items={stores} />
      <div className="flex w-full justify-end items-center gap-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
