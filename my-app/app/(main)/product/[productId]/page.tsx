'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cartStore';
import { getProductDetails } from '@/actions/catalog/getProductDetails';
import ProductCatalog from '@/components/productCatalog';
import { getRelatedProducts } from '@/actions/catalog/getRelatedProducts';
import { toast } from 'sonner';
import { IProduct } from '@/types/product';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';

export default function ProductDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    Array<Record<string, unknown>>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const unwrapParams = async () => {
      const { productId } = await paramsPromise;
      setProductId(productId);
    };
    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      try {
        const productData = await getProductDetails(parseInt(productId));
        setProduct(productData as unknown as IProduct);

        if (productData?.productPages?.[0]?.pageId && productId) {
          const relatedProductsData = await getRelatedProducts(
            parseInt(productData.productPages[0].pageId, 10),
            parseInt(productId, 10)
          );
          setRelatedProducts(relatedProductsData);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const availableAttr = (() => {
        try {
          // Try multiple possible structures for availability
          const available = product.attributeValues?.p_available;

          if (typeof available === 'string') {
            return available;
          }

          if (available?.value?.[0]?.title) {
            return available.value[0].title;
          }

          if (available?.value) {
            return available.value;
          }

          return 'Available';
        } catch (error) {
          console.error('Error extracting availability:', error);
          return 'Available';
        }
      })();

      // Only add to cart if available
      if (availableAttr === 'Available') {
        addToCart({
          id: product.id,
          name: product.attributeValues.p_title.value || 'Product',
          price: product.attributeValues.p_price.value,
          quantity: 1,
          image: product.attributeValues.p_image.value.downloadLink,
        });
        toast('Added to Cart', {
          description: `${product.attributeValues.p_title.value} has been added to your cart.`,
          duration: 5000,
        });
      } else {
        toast('Product Unavailable', {
          description: `${product.attributeValues.p_title.value} is currently not available.`,
          duration: 5000,
        });
      }
    }
  };

  // Extract availability for use in JSX
  const getAvailability = () => {
    if (!product) return 'Available';

    try {
      const available = product.attributeValues?.p_available;

      if (typeof available === 'string') {
        return available;
      }

      if (available?.value?.[0]?.title) {
        return available.value[0].title;
      }

      if (available?.value) {
        return available.value;
      }

      return 'Available';
    } catch (error) {
      console.error('Error extracting availability:', error);
      return 'Available';
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10 flex items-center justify-center p-4'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-white border-t-transparent'></div>
          </div>
          <p className='text-base sm:text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center'>
            Loading delicious details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <main className='relative container mx-auto px-4 py-6 sm:py-8 lg:py-12'>
        <button
          className='mb-4 xs:mb-5 sm:mb-6 lg:mb-8 inline-flex items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all duration-200 hover:scale-105 cursor-pointer group active:scale-[0.95]'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 mr-1.5 xs:mr-2 sm:mr-3 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors' />
          <span className='text-xs xs:text-sm sm:text-base font-semibold text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300'>
            Back to Menu
          </span>
        </button>

        {/* Product details */}
        <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 mb-6 sm:mb-8 lg:mb-12'>
          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12'>
            {/* Mobile-first image section */}
            <div className='w-full'>
              <div className='relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-3 sm:p-4 md:p-6 lg:p-8 group'>
                <img
                  src={
                    product?.attributeValues?.p_image?.value?.downloadLink || ''
                  }
                  alt={
                    product?.attributeValues?.p_title?.value || 'Product Image'
                  }
                  className='object-cover w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl transition-transform duration-500 group-hover:scale-105 shadow-lg'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl'></div>

                {/* Floating availability badge */}
                <div className='absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg p-1.5 sm:p-2 lg:p-3'>
                  <div className='flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2'>
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full ${
                        getAvailability() === 'Available'
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <span
                      className={`text-xs sm:text-xs lg:text-sm font-bold ${
                        getAvailability() === 'Available'
                          ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {getAvailability() === 'Available'
                        ? 'Fresh & Hot'
                        : 'Out of Order'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-optimized content section */}
            <div className='w-full space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8'>
              <div className='px-1'>
                <div className='inline-flex items-center px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 mb-2 sm:mb-3 md:mb-4'>
                  <span className='text-xs sm:text-sm font-semibold text-orange-800 dark:text-orange-200'>
                    🍕 SahandPizza Special
                  </span>
                </div>

                <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 md:mb-4 leading-tight'>
                  <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    {product?.attributeValues?.p_title?.value ||
                      'Delicious Pizza'}
                  </span>
                </h1>
              </div>

              <div className='flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 p-3 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 border border-orange-200/50 dark:border-orange-800/50'>
                <div className='space-y-1'>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Price
                  </p>
                  <p className='text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    $
                    {product?.attributeValues?.p_price?.value?.toFixed(2) ||
                      '0.00'}
                  </p>
                </div>
                <div className='flex items-center space-x-1.5 sm:space-x-2'>
                  <div
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                      getAvailability() === 'Available'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      getAvailability() === 'Available'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {getAvailability() === 'Available'
                      ? 'Available Now'
                      : getAvailability()}
                  </span>
                </div>
              </div>

              <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none px-1'>
                <div
                  className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm xs:text-base sm:text-lg lg:text-xl'
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.attributeValues?.p_description?.value?.[0]
                        ?.htmlValue ||
                      'A delicious pizza made with the finest ingredients.',
                  }}
                />
              </div>

              <div className='space-y-3 xs:space-y-4 sm:space-y-6 px-1'>
                <Button
                  className={`w-full h-12 xs:h-13 sm:h-14 lg:h-16 font-bold rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 border-0 text-sm xs:text-base sm:text-lg lg:text-xl ${
                    getAvailability() === 'Available'
                      ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer active:scale-[0.98]'
                      : 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed opacity-60'
                  }`}
                  onClick={handleAddToCart}
                  disabled={getAvailability() !== 'Available'}
                >
                  <ShoppingCart className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                  {getAvailability() === 'Available'
                    ? 'Add to Cart - Hot & Ready! 🍕'
                    : 'Out of Order ❌'}
                </Button>

                {/* Features */}
                <div className='grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 mt-4 xs:mt-5 sm:mt-6 lg:mt-8'>
                  <div className='text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-orange-200/30 dark:border-orange-700/30'>
                    <div className='text-lg xs:text-xl sm:text-2xl mb-1 sm:mb-2'>
                      🔥
                    </div>
                    <div className='text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300'>
                      Wood Fired
                    </div>
                  </div>
                  <div className='text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-orange-200/30 dark:border-orange-700/30'>
                    <div className='text-lg xs:text-xl sm:text-2xl mb-1 sm:mb-2'>
                      🚚
                    </div>
                    <div className='text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300'>
                      Fast Delivery
                    </div>
                  </div>
                  <div className='text-center p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-orange-200/30 dark:border-orange-700/30'>
                    <div className='text-lg xs:text-xl sm:text-2xl mb-1 sm:mb-2'>
                      🌟
                    </div>
                    <div className='text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300'>
                      Premium
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-12'>
            <div className='text-center mb-6 xs:mb-8 sm:mb-12'>
              <h2 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 xs:mb-3 sm:mb-4 leading-tight'>
                <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  You Might Also Love 🍕
                </span>
              </h2>
              <p className='text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 xs:px-4'>
                More delicious pizzas crafted with the same passion and premium
                ingredients
              </p>
            </div>

            <ProductCatalog
              title=''
              products={relatedProducts as unknown as IProductsEntity[]}
            />

            <div className='text-center mt-6 xs:mt-8 sm:mt-12'>
              <p className='text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-3 xs:mb-4 sm:mb-6 px-2 xs:px-4'>
                Can&apos;t decide? Try our chef&apos;s special combo!
              </p>
              <div className='inline-flex items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800'>
                <span className='text-xs sm:text-sm font-semibold text-orange-800 dark:text-orange-200 text-center'>
                  🔥 Limited Time: Buy 2 Get 1 Free on Select Pizzas!
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
