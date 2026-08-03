
import { createContext, useState } from "react";



const ThemeContext = createContext()


function ThemeContextProvider ({children}){
    const [theme, setTheme] = useState('dark')
    let nombre = 'pepe'



    const provider_values = {
        theme: theme,
        nombre: nombre,
        setTheme: setTheme
    }
    return (
        <ThemeContext.Provider
            value={provider_values}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContextProvider, ThemeContext}