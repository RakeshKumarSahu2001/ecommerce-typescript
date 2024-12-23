import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"

function HomePage() {
  return (
    <div className="!w-[100%] flex flex-col">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default HomePage