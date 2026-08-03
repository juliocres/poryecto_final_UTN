import { Route, Routes } from 'react-router'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import ContactChatScreen from './Screens/ContactChatScreen/ContactChatScreen'
import { ThemeContextProvider } from './Context/ThemeContext'
import { ContactContextProvider } from './Context/ContactContext'

function App() {
  return (
    <ThemeContextProvider>
      <div className="app-container">
        <Routes>
          <Route element={<ContactContextProvider/>}>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/contact/:contact_id' element={<ContactChatScreen />} />
          </Route>
          <Route path='/login' element={<LoginScreen />} />
        </Routes>
      </div>
    </ThemeContextProvider>
  )
}

export default App
