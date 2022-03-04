import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SidebarProvider from './contexts/NavbarContext'

import Login from './pages/Login'
import Navbar from './components/Navbar'
import Initial from "./pages/Initial"
import News from "./pages/News"
import NewNews from "./pages/NewNews"
import Tags from "./pages/Tags"
import Topics from "./pages/Topics"
import Menus from "./pages/Menus"

export default function AppRoutes() {

  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Navbar />}>
            <Route path="/dashboard/initial" element={<Initial />} />
            <Route path="/dashboard/news" element={<News />} />
            <Route path="/dashboard/newNews" element={<NewNews />} />
            <Route path="/dashboard/tags" element={<Tags />} />
            <Route path="/dashboard/topics" element={<Topics />} />
            <Route path="/dashboard/menus" element={<Menus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider >
  )
}