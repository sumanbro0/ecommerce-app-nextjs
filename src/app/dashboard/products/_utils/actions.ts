'use server';

import { db } from '@/db';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { revalidatePath } from 'next/cache';

import type { SaveProduct, GetTotalProduct, GetProducts, DeleteProduct } from './types';

import type { Category, Color, Size } from '@prisma/client';

import { getFileKey } from '@/lib/utils';
import { utapi } from '@/lib/utapi';

export const getTotalProduct = async (): Promise<GetTotalProduct> => {
  try {
    const totalProduct = await db.product.count({});
    return totalProduct;
  } catch (err) {
    console.error(`[ERROR_GET_TOTAL_PRODUCT]: ${err}`);
  }
}

export const getProducts = async ({
  page = 0,
  per_page = 10
}: {
  page?: number;
  per_page?: number;
}): Promise<GetProducts> => {
  try {
    const skip = per_page * page;

    const whereFilter = {
      include: {
        category: true,
        size: true,
        color: true,
      },
      skip,
      take: per_page
    }

    const products = await db.product.findMany(whereFilter);
    const totalCount = await db.product.count();
    const hasNext = Boolean(totalCount - skip - products.length);

    return { data: products, hasNext };
  } catch (err) {
    console.error(`[ERROR_GET_PRODUCTS]: ${err}`);
  }
}

export const saveProduct = async ({
  title,
  price,
  description,
  categoryId,
  colorId,
  sizeId,
  isFeatured,
  isArchived,
}: {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
}): Promise<SaveProduct> => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const newProduct = await db.product.create({
      data: {
        title,
        price: Number(price),
        description,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived
      }
    })

    return { data: newProduct, success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const deleteProduct = async ({
  id
}: {
  id: string;
}): Promise<DeleteProduct> => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingProduct = await db.product.findUnique({
      where: { id }
    });
    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    const imagesDb = await db.image.findMany({
      where: {
        productId: existingProduct.id
      }
    });
    const images = imagesDb.map(img => img.url && getFileKey(img.url));
    await utapi.deleteFiles(images);

    await db.product.delete({
      where: { id }
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
  try {
    const categories = await db.category.findMany({});
    return categories;
  } catch (err) {
    console.error(`[ERROR_GET_CATEGORIES]: ${err}`);
  }
}

export const getColors = async (): Promise<Color[] | undefined> => {
  try {
    const colors = await db.color.findMany({});
    return colors;
  } catch (err) {
    console.error(`[ERROR_GET_COLORS]: ${err}`);
  }
}

export const getSizes = async (): Promise<Size[] | undefined> => {
  try {
    const sizes = await db.size.findMany({});
    return sizes;
  } catch (err) {
    console.error(`[ERROR_GET_SIZES]: ${err}`);
  }
}