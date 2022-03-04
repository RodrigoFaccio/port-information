import { createContext, useState, useContext } from 'react'

const NavbarContext = createContext();

export default function SidebarProvider({ children }) {
  const [sidebar, setSidebar] = useState(false)

  return (
    <NavbarContext.Provider value={{
      sidebar,
      setSidebar
    }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(NavbarContext)
  const { sidebar, setSidebar } = context;
  return { sidebar, setSidebar }
}