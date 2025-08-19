import React from 'react';
import ProductCard from './productCard';
import { IProduct } from '@/types/product';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';

const ProductCatalog = ({
  title,
  products,
}: {
  title: string;
  products: IProductsEntity[];
}) => {
  return (
    <section className='mb-16 sm:mb-20'>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4'>
          <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
            {title}
          </span>
        </h2>
        <div className='w-24 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mx-auto rounded-full'></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'>
        {products?.map((product) => {
          try {
            const transformedProduct: IProduct = {
              id: product.id,
              localizeInfos: {
                title: product.localizeInfos?.title || {},
              },
              price: product.price,
              attributeValues: {
                p_description: (() => {
                  const desc = product.attributeValues?.p_description;
                  if (!desc) return { value: [] };
                  return desc;
                })(),
                p_price: (() => {
                  const price = product.attributeValues?.p_price;
                  if (!price) return { value: 0 };
                  // Handle OneEntry structure
                  if (typeof price === 'object' && 'value' in price) {
                    return {
                      value: typeof price.value === 'number' ? price.value : 0,
                    };
                  }
                  return { value: 0 };
                })(),
                p_image: (() => {
                  const image = product.attributeValues?.p_image;
                  if (!image) return { value: { downloadLink: '' } };
                  // Handle OneEntry structure
                  if (typeof image === 'object' && 'value' in image) {
                    return {
                      value: { downloadLink: image.value?.downloadLink || '' },
                    };
                  }
                  return { value: { downloadLink: '' } };
                })(),
                p_title: (() => {
                  const title = product.attributeValues?.p_title;
                  if (!title) return { value: '' };
                  // Handle OneEntry structure
                  if (typeof title === 'object' && 'value' in title) {
                    return { value: String(title.value || '') };
                  }
                  return { value: '' };
                })(),
                p_available: (() => {
                  const availableAttr =
                    product.attributeValues?.p_available.value[0]?.title;

                  // Handle simple {value} structure
                  return availableAttr;
                })(),
              },
            };

            return (
              <ProductCard product={transformedProduct} key={product.id} />
            );
          } catch (error) {
            console.error('Error transforming product:', product, error);
            return null; // Skip problematic products
          }
        })}
      </div>
    </section>
  );
};

export default ProductCatalog;
