import React from 'react';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { IProduct } from '@/types/product';
import useCartStore from '@/stores/cartStore';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: IProduct }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = (product: IProduct) => {
    addToCart({
      id: product.id,
      name: product.attributeValues.p_title.value || 'Product',
      price: product.attributeValues.p_price.value || 0,
      quantity: 1,
      image: product.attributeValues.p_image.value.downloadLink,
    });
    toast('Added to Cart', {
      description: `${product.attributeValues.p_title.value} has been added to your cart.`,
      duration: 5000,
    });
  };
  return (
    <div className='group relative h-full'>
      <div className='relative overflow-hidden h-full flex flex-col rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 hover:border-orange-300 dark:hover:border-orange-600'>
        <Link
          href={`/product/${product.id}`}
          className='relative w-full pt-[75%] bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-t-3xl overflow-hidden cursor-pointer'
        >
          <img
            src={product.attributeValues.p_image.value.downloadLink}
            alt={product.attributeValues.p_title.value}
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </Link>

        <div className='p-6 flex-grow flex flex-col'>
          <Link href={`/product/${product.id}`} className='cursor-pointer'>
            <h3 className='text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 line-clamp-2 leading-tight'>
              {product.attributeValues.p_title.value}
            </h3>
          </Link>

          <div
            className='text-gray-600 dark:text-gray-400 line-clamp-3 text-sm mb-4 flex-grow leading-relaxed'
            dangerouslySetInnerHTML={{
              __html:
                product.attributeValues.p_description.value?.[0]?.htmlValue ||
                product.attributeValues.p_description.value ||
                'No description available',
            }}
          />

          <div className='flex items-center justify-between mb-4'>
            <p className='text-2xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              ${product.attributeValues.p_price.value.toFixed(2)}
            </p>
            <div className='flex items-center space-x-1'>
              {(() => {
                console.log(product.attributeValues.p_available);
                const availableAttr = product.attributeValues.p_available;

                return (
                  <>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        availableAttr === 'Available'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-semibold ${
                        availableAttr === 'Available'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {availableAttr}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className='p-6 pt-0'>
          {(() => {
            const availableAttr = product.attributeValues.p_available;

            return (
              <Button
                className={`w-full h-12 font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border-0 cursor-pointer text-base ${
                  availableAttr === 'Available'
                    ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white'
                    : 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed opacity-60'
                }`}
                disabled={availableAttr !== 'Available'}
                onClick={() => {
                  if (availableAttr === 'Available') {
                    handleAddToCart(product);
                  } else {
                    toast.error('This product is currently unavailable.');
                  }
                }}
              >
                <ShoppingCart className='w-5 h-5 mr-2' />
                {availableAttr === 'Available'
                  ? 'Add to Cart 🍕'
                  : 'Out of Order ❌'}
              </Button>
            );
          })()}
        </div>

        {/* Simplified decorative gradient bar */}
        <div className='absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-b-3xl'></div>
      </div>
    </div>
  );
};

export default ProductCard;
