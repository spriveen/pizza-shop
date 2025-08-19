'use client';

import { useState, useEffect, Suspense } from 'react';
import { searchProductsAction } from '@/actions/catalog/searchProducts';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/productCard';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';
import { IProduct } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Clock,
  TrendingUp,
  Pizza,
} from 'lucide-react';

interface FilterState {
  priceRange: [number, number];
  availability: string;
  sortBy: string;
  showFilters: boolean;
}

function SearchComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const urlSearchTerm = params.get('searchTerm');
  const [products, setProducts] = useState<IProductsEntity[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProductsEntity[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm || '');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 30],
    availability: 'all',
    sortBy: 'relevance',
    showFilters: false,
  });

  useEffect(() => {
    const searchProducts = async () => {
      if (urlSearchTerm) {
        setIsLoading(true);
        const data = await searchProductsAction({ query: urlSearchTerm });
        console.log('data', data);
        if (Array.isArray(data)) {
          setProducts(data as IProductsEntity[]);
          setFilteredProducts(data as IProductsEntity[]);
        } else {
          console.error('Error fetching products:', data);
        }
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [urlSearchTerm]);

  useEffect(() => {
    setSearchTerm(urlSearchTerm || '');
  }, [urlSearchTerm]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price =
        product.price || product.attributeValues?.p_price?.value || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filter by availability
    if (filters.availability !== 'all') {
      filtered = filtered.filter((product) => {
        const available =
          product.attributeValues?.p_available?.value?.[0]?.title ||
          'Available';
        return filters.availability === 'available'
          ? available.toLowerCase().includes('available')
          : !available.toLowerCase().includes('available');
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.price || a.attributeValues?.p_price?.value || 0;
          const priceB = b.price || b.attributeValues?.p_price?.value || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.price || a.attributeValues?.p_price?.value || 0;
          const priceB = b.price || b.attributeValues?.p_price?.value || 0;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => {
          const nameA =
            a.attributeValues?.p_title?.value ||
            a.localizeInfos?.title?.en_US ||
            '';
          const nameB =
            b.attributeValues?.p_title?.value ||
            b.localizeInfos?.title?.en_US ||
            '';
          return nameA.localeCompare(nameB);
        });
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleNewSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    const data = await searchProductsAction({ query: searchTerm });
    if (Array.isArray(data)) {
      setProducts(data as IProductsEntity[]);
      setFilteredProducts(data as IProductsEntity[]);
    }
    setIsLoading(false);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 30],
      availability: 'all',
      sortBy: 'relevance',
      showFilters: filters.showFilters,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-7xl mx-auto p-4 sm:p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              Pizza Search 🔍
            </span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-6'>
            Find your perfect slice
          </p>

          {/* Search Bar */}
          <div className='max-w-2xl mx-auto mb-6'>
            <div className='flex gap-3'>
              <div className='flex-1 relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <Input
                  type='text'
                  placeholder='Search for delicious pizzas...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewSearch()}
                  className='pl-12 h-14 rounded-2xl border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-lg'
                />
              </div>
              <Button
                onClick={handleNewSearch}
                className='h-14 px-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold rounded-2xl'
              >
                <Search className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className='flex justify-center gap-4 mb-6'>
            <Button
              variant='outline'
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showFilters: !prev.showFilters,
                }))
              }
              className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl'
            >
              <SlidersHorizontal className='mr-2 h-4 w-4' />
              Filters
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  filters.showFilters ? 'rotate-180' : ''
                }`}
              />
            </Button>
            {(filters.priceRange[0] > 0 ||
              filters.priceRange[1] < 30 ||
              filters.availability !== 'all' ||
              filters.sortBy !== 'relevance') && (
              <Button
                variant='outline'
                onClick={clearFilters}
                className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl'
              >
                <X className='mr-2 h-4 w-4' />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {filters.showFilters && (
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 p-6 mb-8 max-w-4xl mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Price Range */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <Pizza className='inline mr-2 h-4 w-4' />
                    Price Range
                  </label>
                  <div className='space-y-3'>
                    <div className='flex gap-2'>
                      <Input
                        type='number'
                        placeholder='Min'
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              Number(e.target.value),
                              prev.priceRange[1],
                            ],
                          }))
                        }
                        className='rounded-xl border-orange-200 dark:border-orange-700'
                      />
                      <Input
                        type='number'
                        placeholder='Max'
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              prev.priceRange[0],
                              Number(e.target.value),
                            ],
                          }))
                        }
                        className='rounded-xl border-orange-200 dark:border-orange-700'
                      />
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <Clock className='inline mr-2 h-4 w-4' />
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className='w-full rounded-xl border border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3'
                  >
                    <option value='all'>All Items</option>
                    <option value='available'>Available Only</option>
                    <option value='unavailable'>Out of Stock</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <TrendingUp className='inline mr-2 h-4 w-4' />
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className='w-full rounded-xl border border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3'
                  >
                    <option value='relevance'>Relevance</option>
                    <option value='price-low'>Price: Low to High</option>
                    <option value='price-high'>Price: High to Low</option>
                    <option value='name'>Name A-Z</option>
                    <option value='newest'>Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className='mb-6 text-center'>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Found{' '}
              <span className='font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                {filteredProducts.length}
              </span>{' '}
              delicious results {urlSearchTerm && `for "${urlSearchTerm}"`}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {isLoading ? (
            <div className='flex justify-center items-center h-64 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4'></div>
                <p className='text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  Searching for delicious pizzas...
                </p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              key='products'
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full`}
            >
              {filteredProducts?.map((product) => {
                const transformedProduct: IProduct = {
                  id: product.id,
                  localizeInfos: {
                    title: product.localizeInfos?.title || {},
                  },
                  price: product.price,
                  attributeValues: {
                    p_description: product.attributeValues?.p_description || {
                      value: [],
                    },
                    p_price: product.attributeValues?.p_price || { value: 0 },
                    p_image: product.attributeValues?.p_image || {
                      value: { downloadLink: '' },
                    },
                    p_title: product.attributeValues?.p_title || { value: '' },
                    p_available: (() => {
                      const availableAttr =
                        product.attributeValues?.p_available.value[0]?.title;

                      // Handle simple {value} structure
                      return availableAttr || 'Available';
                    })(),
                  },
                };
                return (
                  <ProductCard product={transformedProduct} key={product.id} />
                );
              })}
            </div>
          ) : (
            <div className='text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 p-8 w-full'>
              <div className='mb-6'>
                <Search className='mx-auto h-20 w-20 text-orange-400 mb-4' />
                <div className='text-6xl mb-4'>🍕</div>
              </div>
              <h2 className='text-3xl font-black mb-4'>
                <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  No pizzas found!
                </span>
              </h2>
              <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto'>
                We couldn&apos;t find any pizzas matching your search. Try
                adjusting your filters or search term.
              </p>
              <Button
                onClick={clearFilters}
                className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
              >
                Clear All Filters 🍕
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
