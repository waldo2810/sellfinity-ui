import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import ThemeToggle from './theme-toggle'

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end items-center gap-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
