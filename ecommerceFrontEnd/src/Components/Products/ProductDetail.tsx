import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useECommerceStoreDispatch, useECommerceStoreSelector } from '../../Hooks/ecommerceStoreHooks'
import { FetchProductDetailsApi } from '../../EcommerceStore/productsOpt/FetchProductDetailsApi'
import { useParams } from 'react-router-dom'
import { BoltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { addToCartApi } from '../../EcommerceStore/cartOpt/AddToCartApi'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  // fetching product details
  const  productID  = useParams()?.id
  const dispatch = useECommerceStoreDispatch()

  useEffect(() => {
    if (productID) {
      dispatch(FetchProductDetailsApi(productID))
    }
  }, [dispatch, productID])

  let product = useECommerceStoreSelector((state) => state.productDetails.productInfo)
  const images = product ? [product.ThumbnailImage ?? "", ...(product.Images ?? [])] : [];

  const [selectedImg, setSelectedImg] = useState(images[0])
  const AuthID = localStorage.getItem("Id")

  console.log("user id",AuthID)

  useEffect(() => {
    if (product?.Images?.length) {
      setSelectedImg(product.Images[0])
    }
  }, [product])

  type catInfoType={
    productID:string,
    quantity:number,
    AuthID:string
  }

  // add to cart start
  const handleAddToCart = () => {
   console.log("hello from cart",productID)
   const cartInfo:catInfoType={
    productID:productID || "",
    quantity:1,
    AuthID:AuthID || ""
   }
    dispatch(addToCartApi(cartInfo))
  }


  return (
    product && <div className="bg-white pb-8">
      <div className="pt-20">
        <nav aria-label="Breadcrumb" className='py-[10px]'>
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
            {/* {product.tags.map((tag, i) => (
              <li key={i}>
                <div className="flex items-center">
                  <p className="mr-2 text-sm font-medium text-gray-900">
                    {tag}
                  </p>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))} */}
            <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {
                product?.ProductName
              }
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto lg:grid lg:max-w-7xl grid-cols-[400px_minmax(850px,_1fr)] lg:gap-x-6">
          <div className='flex flex-col gap-3'>

            <div className="sticky rounded-lg flex flex-row justify-center gap-2">
              <div className='flex flex-col lg:w-[15em]'>
                {
                  images?.map((image, i) => <div className="max-w-28 h-20" key={i} onClick={() => {
                    setSelectedImg(image)
                  }}><img src={image} alt={product.ProductName} className='aspect-square w-auto' /></div>)
                }
              </div>
              <div>
                <img
                  alt={product.ProductName}
                  src={selectedImg}
                  className="object-center aspect-square" />
              </div>
            </div>
            <div className='flex flex-row gap-4 justify-center'>
              <button onClick={() => handleAddToCart()} className='flex items-center text-white bg-[#ff9f00] border border-[#ff9f00] py-2 px-6 gap-2 rounded'>
                  <span>
                    Add To Cart
                  </span>
                  <ShoppingCartIcon className="size-6" />
              </button>

              <button className="flex items-center text-white bg-[#fb641b] border border-[#fb641b] py-2 px-6 gap-2 rounded ">
                  <span>
                    Buy Now
                  </span>
                  <BoltIcon className="size-6" />
              </button>
            </div>
          </div>

          <div className="px-4 pt-10 lg:pt-0 ">
            <div className=" lg:border-r lg:border-gray-200">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.ProductName}</h1>
            </div>

            <div className="py-10 lg:col-start-1 lg:pt-6">
              {/* Description and details */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="">
                  {
                    product?.Description?.split(".").map(data=><p className="text-base text-justify text-gray-900">{data+"."}</p>)
                  }
                  {/* <p className="text-base text-justify text-gray-900">{product.Description}</p> */}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.Price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          parseInt(product?.Rating) > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 fl20x-shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product?.Rating} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}