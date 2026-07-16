/* 
La idea es centralizar el manejo de estado de tema de color de la aplicacion en este archivo
*/

import { createContext, useState } from "react";


//Sirve para declarar contextos
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