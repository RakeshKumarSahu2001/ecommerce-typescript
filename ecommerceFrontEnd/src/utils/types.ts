export type userAuthData = {
  email: string,
  password: string,
}

// product details

export interface product {
  ProductID: string,
  ProductName: string,
  Description: string,
  Price: number,
  Discount: number,
  Rating: string,
  StockQuantity: number,
  Brand: string,
  Category: string,
  ThumbnailImage: string,
  Images: string[],
}

//updated product info

export interface updatedProductInfoType {
  productName?: string,
  productDescription?: string,
  productRating?: string,
  productPrice?: string,
  discount?: string,
  stock?: string,
  brand?: string,
  productCategory?: string

}

//user Info
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface userProfileInfoType {
  UserID: string,
  FullName: string,
  Phone: number,
  Street: string,
  PostalCode: number,
  City: string,
  State: string,
  Country: string,
  DateOfBirth: Date,
  Gender: Gender
}


