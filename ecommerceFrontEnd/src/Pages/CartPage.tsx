import Cart from "../Components/Cart"
import CheckOutForm from "../Components/CheckOutForm"

function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <CheckOutForm />
        </div>
        <div className="lg:col-span-2">
          <Cart />
        </div>
      </div>
    </div>

  )
}

export default CartPage