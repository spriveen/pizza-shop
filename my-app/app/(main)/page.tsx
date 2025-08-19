'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock,
  Star,
  Award,
  Pizza,
  Flame,
  Heart,
  MapPin,
  Phone,
  Mail,
  ChefHat,
  Users,
  Quote,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCatalogWithProducts } from '@/actions/catalog/getCatalogWithProducts';
import Link from 'next/link';

import ProductCatalog from '@/components/productCatalog';
import { ICatalog } from '@/types/catalog';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';

export default function HomePage() {
  const [products, setProducts] = useState<ICatalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const catalogs = await getCatalogWithProducts();

      if (catalogs?.length) {
        const transformedCatalogs = catalogs.map((catalog) => ({
          ...catalog,
          catalogProducts: {
            items: catalog.catalogProducts.items.map(
              (item: { localizeInfos: { title: string } }) => ({
                ...item,
                localizeInfos: {
                  title: item.localizeInfos?.title || 'Default Title',
                },
              })
            ),
          },
        }));
        setProducts(transformedCatalogs);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-red-600/10 via-orange-500/10 to-yellow-500/10 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

        <div className='relative container mx-auto px-4 py-16 sm:py-20 lg:py-32'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            {/* Hero Content */}
            <div className='text-center lg:text-left space-y-6 lg:space-y-8'>
              <div className='space-y-4'>
                <div className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800'>
                  <Flame className='w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400 mr-1.5 sm:mr-2' />
                  <span className='text-xs sm:text-sm font-semibold text-orange-800 dark:text-orange-200'>
                    Fresh • Hot • Delicious
                  </span>
                </div>

                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight'>
                  <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    Authentic
                  </span>
                  <br />
                  <span className='text-gray-900 dark:text-gray-100'>
                    Italian Pizza
                  </span>
                  <br />
                  <span className='bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 bg-clip-text text-transparent'>
                    Delivered Hot! 🍕
                  </span>
                </h1>

                <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0'>
                  Experience the taste of Italy with our wood-fired pizzas made
                  from the finest ingredients. Fresh dough, premium toppings,
                  and melted mozzarella in every bite.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
                <Link href='/auth?type=signup'>
                  <Button
                    size='lg'
                    className='w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0 text-base sm:text-lg'
                  >
                    Order Now - Free Delivery! 🚚
                    <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
                  </Button>
                </Link>

                <Button
                  size='lg'
                  variant='outline'
                  className='w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border-2 border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-orange-50 dark:hover:bg-orange-900/40 transition-all duration-200 hover:scale-105 font-semibold text-orange-700 dark:text-orange-300 text-base sm:text-lg'
                >
                  View Menu
                </Button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-orange-200/50 dark:border-orange-800/50'>
                <div className='text-center'>
                  <div className='text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent'>
                    1000+
                  </div>
                  <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Happy Customers
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    25min
                  </div>
                  <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Avg Delivery
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent'>
                    4.9★
                  </div>
                  <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium'>
                    Customer Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className='relative mt-8 lg:mt-0'>
              <div className='relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg'
                  alt='Delicious Pizza'
                  className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent'></div>
              </div>

              {/* Floating Cards */}
              <div className='absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-4'>
                <div className='flex items-center space-x-1.5 sm:space-x-2'>
                  <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full'></div>
                  <span className='text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400'>
                    Live Orders
                  </span>
                </div>
              </div>

              <div className='absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-4'>
                <div className='flex items-center space-x-1.5 sm:space-x-2'>
                  <Star className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current' />
                  <span className='text-xs sm:text-sm font-bold'>
                    4.9/5 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 sm:py-20 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4'>
              <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                Why Choose SahandPizza?
              </span>
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4'>
              We&apos;re not just another pizza place. We&apos;re passionate
              about delivering authentic Italian flavors right to your door.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {[
              {
                icon: Pizza,
                title: 'Wood-Fired Perfection',
                description:
                  'Traditional wood-fired ovens for that authentic crispy crust and smoky flavor.',
                color: 'red',
              },
              {
                icon: Clock,
                title: 'Lightning Fast',
                description:
                  '25-minute average delivery time. Hot, fresh pizza when you want it.',
                color: 'orange',
              },
              {
                icon: Heart,
                title: 'Premium Ingredients',
                description:
                  'Only the finest Italian ingredients, imported mozzarella, and fresh herbs.',
                color: 'yellow',
              },
              {
                icon: Award,
                title: 'Award Winning',
                description:
                  'Voted #1 Pizza in the city for 3 consecutive years by food critics.',
                color: 'red',
              },
            ].map((feature, index) => (
              <div key={index} className='group'>
                <div className='bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border border-gray-100 dark:border-gray-800'>
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 dark:from-${feature.color}-900/30 dark:to-${feature.color}-800/30 flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-200 group-hover:scale-105`}
                  >
                    <feature.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 text-${feature.color}-600 dark:text-${feature.color}-400`}
                    />
                  </div>
                  <h3 className='font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900 dark:text-gray-100'>
                    {feature.title}
                  </h3>
                  <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 sm:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-yellow-950/20'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4'>
              <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                What Our Customers Say
              </span>
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4'>
              Don&apos;t just take our word for it - hear from our satisfied
              pizza lovers!
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {[
              {
                name: 'Sarah Johnson',
                role: 'Food Blogger',
                image:
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
                rating: 5,
                text: "The best pizza I've ever had! The wood-fired crust is perfection and the ingredients taste so fresh. Will definitely order again!",
              },
              {
                name: 'Mike Chen',
                role: 'Regular Customer',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                rating: 5,
                text: "Fast delivery, hot pizza, and amazing flavors. SahandPizza has become our family's go-to for pizza nights!",
              },
              {
                name: 'Emma Wilson',
                role: 'Local Resident',
                image:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                rating: 5,
                text: 'Authentic Italian taste that reminds me of my trip to Naples. The margherita pizza is absolutely divine!',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-800'
              >
                <div className='flex items-center mb-4 sm:mb-6'>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4'
                  />
                  <div>
                    <h4 className='font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className='flex mb-3 sm:mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current'
                    />
                  ))}
                </div>
                <Quote className='w-6 h-6 sm:w-8 sm:h-8 text-orange-300 mb-3 sm:mb-4' />
                <p className='text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic'>
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center text-white'>
            {[
              { icon: Users, number: '50,000+', label: 'Happy Customers' },
              { icon: Pizza, number: '100,000+', label: 'Pizzas Delivered' },
              { icon: Award, number: '15+', label: 'Awards Won' },
              { icon: Clock, number: '5', label: 'Years of Excellence' },
            ].map((stat, index) => (
              <div key={index} className='group'>
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-white/20 transition-all duration-200'>
                  <stat.icon className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200' />
                  <div className='text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-xs sm:text-sm lg:text-lg font-medium opacity-90'>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className='py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            <div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6'>
                <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  Visit Our Kitchen
                </span>
              </h2>
              <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed'>
                Come see our master chefs in action! Watch as we hand-toss fresh
                dough and fire up our traditional wood-burning ovens.
              </p>

              <div className='space-y-4 sm:space-y-6'>
                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center'>
                    <MapPin className='w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400' />
                  </div>
                  <div>
                    <div className='font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100'>
                      123 Pizza Street
                    </div>
                    <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                      Downtown, NY 10001
                    </div>
                  </div>
                </div>

                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center'>
                    <Phone className='w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400' />
                  </div>
                  <div>
                    <div className='font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100'>
                      +1 (555) 123-PIZZA
                    </div>
                    <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                      Open 11AM - 11PM Daily
                    </div>
                  </div>
                </div>

                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center'>
                    <Mail className='w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400' />
                  </div>
                  <div>
                    <div className='font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100'>
                      hello@sahandpizza.com
                    </div>
                    <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                      We&apos;d love to hear from you!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative mt-8 lg:mt-0'>
              <div className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl'>
                <img
                  src='https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop'
                  alt='Pizza Kitchen'
                  className='w-full h-64 sm:h-80 lg:h-96 object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>
                <div className='absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white'>
                  <div className='flex items-center space-x-2 mb-1 sm:mb-2'>
                    <ChefHat className='w-4 h-4 sm:w-6 sm:h-6' />
                    <span className='font-semibold text-sm sm:text-base'>
                      Master Chef Antonio
                    </span>
                  </div>
                  <p className='text-xs sm:text-sm opacity-90'>
                    25+ years of authentic Italian cooking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {isLoading && (
          <div className='flex flex-col justify-center items-center h-48 sm:h-64 space-y-4'>
            <div className='relative'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-orange-200 dark:border-orange-800'></div>
              <div className='absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin'></div>
            </div>
            <p className='text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 text-center'>
              Loading delicious pizzas...
            </p>
          </div>
        )}

        {products.map((catalog) => (
          <ProductCatalog
            key={catalog?.id}
            title={catalog?.localizeInfos?.title as string}
            products={
              catalog.catalogProducts.items as unknown as IProductsEntity[]
            }
          />
        ))}
      </main>
    </div>
  );
}
