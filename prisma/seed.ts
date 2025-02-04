import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.image.deleteMany()
  await prisma.product.deleteMany()
  await prisma.color.deleteMany()
  await prisma.size.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Clothing',
      billboard: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      title: 'Latest Fashion Trends'
    }
  })

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
      billboard: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      title: 'Trending Footwear'
    }
  })

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessories',
      billboard: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48',
      title: 'Complete Your Look'
    }
  })

  // Create colors
  const blackColor = await prisma.color.create({
    data: {
      name: 'Black',
      color: '#000000'
    }
  })

  const whiteColor = await prisma.color.create({
    data: {
      name: 'White',
      color: '#FFFFFF'
    }
  })

  const redColor = await prisma.color.create({
    data: {
      name: 'Red',
      color: '#FF0000'
    }
  })

  const blueColor = await prisma.color.create({
    data: {
      name: 'Navy Blue',
      color: '#000080'
    }
  })

  // Create sizes
  const clothingSizes = await Promise.all([
    prisma.size.create({ data: { name: 'Small', value: 'S' } }),
    prisma.size.create({ data: { name: 'Medium', value: 'M' } }),
    prisma.size.create({ data: { name: 'Large', value: 'L' } }),
    prisma.size.create({ data: { name: 'X-Large', value: 'XL' } })
  ])

  const shoeSizes = await Promise.all([
    prisma.size.create({ data: { name: 'US 8', value: '8' } }),
    prisma.size.create({ data: { name: 'US 9', value: '9' } }),
    prisma.size.create({ data: { name: 'US 10', value: '10' } })
  ])

  const oneSize = await prisma.size.create({
    data: { name: 'One Size', value: 'OS' }
  })

  // Create products
  await prisma.product.create({
    data: {
      title: 'Premium Cotton T-Shirt',
      price: 599.99,
      isFeatured: true,
      categoryId: clothingCategory.id,
      colorId: blackColor.id,
      sizeId: clothingSizes[0].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
          { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Designer Denim Jeans',
      price: 889.99,
      isFeatured: true,
      categoryId: clothingCategory.id,
      colorId: blueColor.id,
      sizeId: clothingSizes[2].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d' },
          { url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Running Sneakers',
      price: 720.00,
      categoryId: shoesCategory.id,
      colorId: whiteColor.id,
      sizeId: shoeSizes[1].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
          { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Leather Dress Shoes',
      price: 950.00,
      isFeatured: true,
      categoryId: shoesCategory.id,
      colorId: blackColor.id,
      sizeId: shoeSizes[2].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1' },
          { url: 'https://images.unsplash.com/photo-1614252370352-c4c70e01de0d' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Silk Scarf',
      price: 545.50,
      categoryId: accessoriesCategory.id,
      colorId: redColor.id,
      sizeId: oneSize.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26' },
          { url: 'https://images.unsplash.com/photo-1584030373081-f37b019b2d15' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Designer Leather Belt',
      price: 565.00,
      isArchived: true,
      categoryId: accessoriesCategory.id,
      colorId: blackColor.id,
      sizeId: oneSize.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931' }
        ]
      }
    }
  })

  // New Products
  await prisma.product.create({
    data: {
      title: 'Cashmere Sweater',
      price: 1299.99,
      isFeatured: true,
      categoryId: clothingCategory.id,
      colorId: redColor.id,
      sizeId: clothingSizes[1].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9' },
          { url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Leather Jacket',
      price: 2499.99,
      isFeatured: true,
      categoryId: clothingCategory.id,
      colorId: blackColor.id,
      sizeId: clothingSizes[2].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5' },
          { url: 'https://images.unsplash.com/photo-1520975954732-35dd22299614' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Designer Sunglasses',
      price: 750.00,
      categoryId: accessoriesCategory.id,
      colorId: blackColor.id,
      sizeId: oneSize.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083' },
          { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Luxury Watch',
      price: 4999.99,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
      colorId: blackColor.id,
      sizeId: oneSize.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314' },
          { url: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'High-Top Basketball Shoes',
      price: 895.00,
      categoryId: shoesCategory.id,
      colorId: redColor.id,
      sizeId: shoeSizes[2].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c' },
          { url: 'https://images.unsplash.com/photo-1597248881519-d8a5a71d0f79' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Designer Handbag',
      price: 3299.99,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
      colorId: whiteColor.id,
      sizeId: oneSize.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3' },
          { url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Wool Dress Coat',
      price: 1799.99,
      categoryId: clothingCategory.id,
      colorId: blueColor.id,
      sizeId: clothingSizes[1].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543' },
          { url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3' }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      title: 'Suede Chelsea Boots',
      price: 879.99,
      categoryId: shoesCategory.id,
      colorId: blackColor.id,
      sizeId: shoeSizes[0].id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76' },
          { url: 'https://images.unsplash.com/photo-1638247223886-f57fdaa26359' }
        ]
      }
    }
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })