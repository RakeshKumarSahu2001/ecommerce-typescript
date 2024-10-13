const data = {
    mainImage: [
        {
            fieldname: 'mainImage',
            originalname: 'Rakesh Image.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp',
            filename: '1728841715523-mainImage-Rakesh Image.jpeg',
            path: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp\\1728841715523-mainImage-Rakesh Image.jpeg',
            size: 138485
        }
    ],
    image1: [
        {
            fieldname: 'image1',
            originalname: 'Rakesh Image.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp',
            filename: '1728841715529-image1-Rakesh Image.jpeg',
            path: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp\\1728841715529-image1-Rakesh Image.jpeg',
            size: 138485
        }
    ],
    image2: [
        {
            fieldname: 'image2',
            originalname: 'Rakesh Image.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp',
            filename: '1728841715534-image2-Rakesh Image.jpeg',
            path: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp\\1728841715534-image2-Rakesh Image.jpeg',
            size: 138485
        }
    ],
    image3: [
        {
            fieldname: 'image3',
            originalname: 'Rakesh Image.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp',
            filename: '1728841715538-image3-Rakesh Image.jpeg',
            path: 'E:\\Backend Learning\\full-stack-ecommerce\\ecommerceBackend\\src\\public\\temp\\1728841715538-image3-Rakesh Image.jpeg',
            size: 138485
        }
    ]
};

// Extracting paths from the data object
const newdata = Object.values(data).map(element => element[0].path);

console.log(newdata);
