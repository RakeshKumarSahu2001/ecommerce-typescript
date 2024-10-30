import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
// import { Radio, RadioGroup } from '@headlessui/react'
import { useECommerceStoreDispatch, useECommerceStoreSelector } from '../EcommerceStore/ecommerceStoreHooks'
import { FetchProductDetailsApi } from '../EcommerceStore/FetchProductDetailsApi'
import { useParams } from 'react-router-dom'
import { CartApi } from '../EcommerceStore/CartApi'
import { product } from '../utils/types'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  // fetching product details
  const { id } = useParams()
  const dispatch = useECommerceStoreDispatch()

  useEffect(() => {
    if (id) {
      dispatch(FetchProductDetailsApi(Number(id)))
    }
  }, [dispatch, id])
  let product = useECommerceStoreSelector((state) => state.productDetails.productInfo)
  const [selectedImg, setSelectedImg] = useState(product?.images?.[0])
  const user=useECommerceStoreSelector((state)=>state.authSlice.loggedInUser)
  // const [selectedSize, setSelectedSize] = useState(sizes[2])
  
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImg(product.images[0])
    }
  }, [product])


  // add to cart start
  const handleAddToCart=(e:React.MouseEvent<HTMLButtonElement>,product:product)=>{
    e.preventDefault()
    dispatch(CartApi({...product,quantity:1,userId:user?.id}))
  }


  return (
    product && <div className="bg-white pb-8">
      <div className="pt-20">
        <nav aria-label="Breadcrumb" className='py-[10px]'>
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
            {product.tags.map((tag, i) => (
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
            ))}
            <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {
                product.title
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
                  product.images.map((image, i) => <div className="max-w-28 h-20" key={i} onClick={() => {
                    setSelectedImg(image)
                  }}><img src={image} alt={product.title} className='aspect-square w-auto' /></div>)
                }
              </div>
              <div>
                <img
                  alt={product.title}
                  src={selectedImg}
                  className="object-center aspect-square" />
              </div>
            </div>
            <div className='flex flex-row gap-4 justify-center'>
              <button onClick={(e) => handleAddToCart(e, product)}>
                <a href="" className="flex items-center text-white bg-[#ff9f00] border border-[#ff9f00] py-2 px-6 gap-2 rounded">
                  <span>
                    Add To Cart
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>

                </a>
              </button>

              <button>
                <a href="" className="flex items-center text-white bg-[#fb641b] border border-[#fb641b] py-2 px-6 gap-2 rounded ">
                  <span>
                    Buy Now
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                  </svg>


                </a>
              </button>
            </div>
          </div>

          <div className="px-4 pt-10 lg:pt-0 ">
            <div className=" lg:border-r lg:border-gray-200">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            <div className="py-10 lg:col-start-1 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-justify text-gray-900">{product.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                {/* <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                {/* 
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-justify text-gray-600">{product.details}</p>
                </div> */}
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

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
                          reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 fl20x-shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              {/* <form className="mt-10">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                            <fieldset aria-label="Choose a color" className="mt-4">
                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                                    {product.colors.map((color) => (
                                        <Radio
                                            key={color.name}
                                            value={color}
                                            aria-label={color.name}
                                            className={classNames(
                                                color.selectedClass,
                                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    color.class,
                                                    'h-8 w-8 rounded-full border border-black border-opacity-10',
                                                )}
                                            />
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </fieldset>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Size guide
                                </a>
                            </div>

                            <fieldset aria-label="Choose a size" className="mt-4">
                                <RadioGroup
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                >
                                    {product.sizes.map((size) => (
                                        <Radio
                                            key={size.name}
                                            value={size}
                                            disabled={!size.inStock}
                                            className={classNames(
                                                size.inStock
                                                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                            )}
                                        >
                                            <span>{size.name}</span>
                                            {size.inStock ? (
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                />
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                >
                                                    <svg
                                                        stroke="currentColor"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                    >
                                                        <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            )}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </fieldset>
                        </div>

                        <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to bag
                        </button>
                    </form> */}
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}