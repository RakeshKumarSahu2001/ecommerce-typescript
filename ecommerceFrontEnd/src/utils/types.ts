//Authentication
export interface userAuthData{
  email:string,
  id?:string,
  password?:string
}

export interface emailValidationData{
  otp:string,
  id:string
}

//updated product info
export type updatedProductInfoType ={
  ProductName?: string,
  Description?: string,
  Price?: number,
  Discount?: number,
  Rating?: number,
  StockQuantity?: number,
  Brand?: string,
  Category?: string,
}

// product details
export type product= {
  ProductID: string,
  ThumbnailImage: string,
  Images: string[],
} & updatedProductInfoType



//user Info
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface userProfileInfoType {
  UserID?: string,
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

