export default defineEventHandler((event) => {
  const { id } = event.context.params as { id: string }
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 1000000,
      description: 'Description for Product 1',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731516207/hoka_2.webp',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 2000000,
      description: 'Description for Product 2',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731516208/hoka_1.webp',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 3000000,
      description: 'Description for Product 3',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731516208/hoka_3.webp',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 4000000,
      description: 'Description for Product 4',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731516208/hoka_4.webp',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 5000000,
      description: 'Description for Product 5',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517515/1147910-BCQ_1.webp',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 6000000,
      description: 'Description for Product 6',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517515/1123157-WBLC_1.webp',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 7000000,
      description: 'Description for Product 7',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517515/1147910-CSSL_1.webp',
    },
    {
      id: 8,
      name: 'Product 8',
      price: 8000000,
      description: 'Description for Product 8',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517515/1147910-ENN_1.webp',
    },
    {
      id: 9,
      name: 'Product 9',
      price: 9000000,
      description: 'Description for Product 9',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517516/1147910-FSTC_1.webp',
    },
    {
      id: 10,
      name: 'Product 10',
      price: 10000000,
      description: 'Description for Product 10',
      imgUrl:
        'https://res.cloudinary.com/rizfirman/image/upload/v1731517516/1147910-WHTV_1.webp',
    },
  ]

  const product = products.find((p) => p.id === parseInt(id))
  if (!product) {
    throw createError({ statusCode: 404, message: 'Product not found' })
  }

  return product
})
