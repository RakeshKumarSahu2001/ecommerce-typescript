import { useNavigate } from "react-router-dom"
import Cart from "../../Components/Cart"
import CheckOutForm from "../../Components/Cart/CheckOutForm"

function CartPage() {
  const navigate=useNavigate()
  const submit=()=>{
    alert("order placed successfully.")
    navigate("/shopnow/allproduct")
  }
  const handleMoveToProducts=()=>{
    navigate("/shopnow/allproduct")
  }
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <CheckOutForm
          submit={submit} />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-4xl  my-5 font-bold tracking-tight text-gray-900">
            shopnow
          </h2>
          <Cart
          handleMoveToProducts={handleMoveToProducts} />
        </div>
      </div>
    </div>

  )
}

export default CartPage