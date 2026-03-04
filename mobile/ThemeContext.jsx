import { createContext, useContext } from "react";
import { useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(false);

  const theme = {
    background: isDark ? "#000" : "#fff",
    text: isDark ? "#fff" : "#000",
    headcolor: isDark ? "light" : "dark",
    dark: isDark ? true : false
  };


  const ToggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ theme, ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )

}



export const useTheme = () => {
  return useContext(ThemeContext)
}
