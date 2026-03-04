import { createContext ,  useContext,  useState} from 'react'

const MenuContext = createContext();

export  function MenuProvider({ children }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => 
    {

      
      setMenuOpen(!menuOpen)
      
    }


  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen , toggleMenu}}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  return useContext(MenuContext)
}