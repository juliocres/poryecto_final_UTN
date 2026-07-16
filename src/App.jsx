import React, { useState } from 'react'

import Contador from './Components/Contador/Contador'
import Modal from './Components/Modal/Modal'
import useModal from './hooks/useModal'
import Messages from './Components/Messages/Messages'

import HomeScreen from './Screens/HomeScreen/HomeScreen'

import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen'
import ContactChatScreen from './Screens/ContactChatScreen/ContactChatScreen'
import { ThemeContextProvider } from './Context/ThemeContext'
import { ContactContextProvider } from './Context/ContactContext'

//Las funciones que devuelven HTML se llaman componentes
function App() {




  return (
    <ThemeContextProvider>
      <div>
        <Routes>
          <Route element={<ContactContextProvider/>}>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/contact/:contact_id' element={<ContactChatScreen />} />
          </Route>
          <Route
            path='/products/:product_id'
            element={<ProductDetailScreen />}
          />
          <Route path='/login' element={<LoginScreen />} />
        </Routes>
      </div>
    </ThemeContextProvider>
  )
}



export default App