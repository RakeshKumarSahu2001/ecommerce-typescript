import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, StarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import isAdmin from '../../Hooks/isAdmin';

type propsType={
  ProductID:string,
  ProductName:string,
  ThumbnailImage:string,
  Rating:string,
  Price:number,
  Discount:number,
  handleDeleteProduct:(productID:string)=>void
}

function ProductCard({ProductID,ProductName,ThumbnailImage,Rating,Price,Discount,handleDeleteProduct}:propsType) {
    const isAdminObj = new isAdmin();
  return (
    <div key={ProductID} className="group relative border-solid border-2 min-h-[21.5rem] border-r-gray-200 rounded-md p-2">
    {isAdminObj.access &&

      <Menu as="div" className="absolute z-20 h-8 right-1">
        <div>
          <MenuButton className="relative w-[100%] h-8 gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
            <EllipsisVerticalIcon aria-hidden="true" className="absolute z-20 h-8 top-0 right-0" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute -right-12 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                to={`/shopnow/admin/edit-product/${ProductID}`}
                className="block px-4 py-2 text-sm text-start font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Edit
              </Link>
            </MenuItem>
          </div>

          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => handleDeleteProduct(ProductID)}
                className="block px-4 w-32 text-start py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    }


    <div className=" min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-72">
      <img
        alt={ProductName}
        src={ThumbnailImage}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href={ThumbnailImage}>
            <span
              aria-hidden="true"
              className="absolute inset-0 text-xs md:text-base"
            />
            {ProductName}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500 flex">
          <StarIcon className="w-5 h-5 inline" /><span className="px-2 align-bottom">{Rating}</span>
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">
        ₹ {Math.round(Price * (1 - Discount / 100))}
        </p>
        <p className="text-sm font-medium line-through text-gray-400">
        ₹ {Price}
        </p>
      </div>
    </div>
  </div>
  )
}

export default ProductCard