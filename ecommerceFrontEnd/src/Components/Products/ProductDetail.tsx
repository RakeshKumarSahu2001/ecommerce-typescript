import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useECommerceStoreDispatch, useECommerceStoreSelector } from '../../Hooks/ecommerceStoreHooks'
import { FetchProductDetailsApi } from '../../EcommerceStore/productsOpt/FetchProductDetailsApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { addToCartApi } from '../../EcommerceStore/cartOpt/AddToCartApi'


function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  // fetching product details
  const  productID  = useParams()?.id
  const dispatch = useECommerceStoreDispatch()
  const navigate=useNavigate();

  useEffect(() => {
    if (productID) {
      dispatch(FetchProductDetailsApi(productID))
    }
  }, [dispatch, productID])

  let product = useECommerceStoreSelector((state) => state.productDetails.productInfo)
  const images = product ? [product.ThumbnailImage ?? "", ...(product.Images ?? [])] : [];

  const [selectedImg, setSelectedImg] = useState(images[0])
  const AuthID = localStorage.getItem("Id")


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
   const cartInfo:catInfoType={
    productID:productID || "",
    quantity:1,
    AuthID:AuthID || ""
   }
    dispatch(addToCartApi(cartInfo))
  }

  const handleBuyNow=()=>{
    const cartInfo:catInfoType={
      productID:productID || "",
      quantity:1,
      AuthID:AuthID || ""
     }
      dispatch(addToCartApi(cartInfo))
    navigate(`/shopnow/cart/${AuthID}`)
  }



  return (
    product && <div className="bg-white pb-8">
      <div className="pt-20">
        <nav aria-label="Breadcrumb" className='py-[10px]'>
            <p className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {
                product?.ProductName
              }
            </p>
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

              <button
              onClick={()=>handleBuyNow()}
              className="flex items-center text-white bg-[#fb641b] border border-[#fb641b] py-2 px-6 gap-2 rounded ">
                  <Link to={`/shopnow/cart/${AuthID}`}>
                    Buy Now
                  </Link>
                  <BoltIcon className="size-6" />
              </button>
            </div>
          </div>

          <div className="px-4 pt-10 lg:pt-0 ">
            <div className=" lg:border-r lg:border-gray-200">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.ProductName}</h1>
            </div>

            <div className="lg:col-start-1 lg:pt-6">
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
                  <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product?.Rating}
                  </a>
                </div>
              </div>
              <p className="text-3xl tracking-tight text-gray-900">
              ₹ {Math.round(product.Price * (1 - product.Discount / 100))}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}