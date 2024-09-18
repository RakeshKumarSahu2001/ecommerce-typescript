import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
// import CheckOutForm from "../Components/CheckOutForm"

function HomePage() {
  return (
    <div>
        <Navbar />
        <Outlet />
        {/* <CheckOutForm /> */}
        <Footer />
    </div>
  )
}

export default HomePage