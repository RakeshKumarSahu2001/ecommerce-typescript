export type userAuthData = {
    email: string,
    password: string,
  }


// product details
export interface product{
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[],
  deleted: boolean
}