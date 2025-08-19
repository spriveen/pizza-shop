'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  XSquareIcon,
} from 'lucide-react';
import { getOrders } from '@/actions/orders/get-orders';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number | null;
}

interface OrderItem {
  id: number;
  createdDate: string;
  statusIdentifier: string;
  totalSum: string;
  products: Product[];
}

interface IOrder {
  items: OrderItem[];
  total: number;
}

const orderStatusIcons = {
  processing: <Package className='w-5 h-5 text-yellow-500' />,
  shipped: <Truck className='w-5 h-5 text-blue-500' />,
  delivered: <CheckCircle className='w-5 h-5 text-green-500' />,
  cancelled: <AlertCircle className='w-5 h-5 text-red-500' />,
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<IOrder>({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating API call to fetch orders
    const fetchOrders = async () => {
      const data = await getOrders();
      console.log({ data });
      if (data !== undefined)
        setOrders({ items: data.items.reverse(), total: data.total });
      else setOrders({ total: 0, items: [] });
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-4xl mx-auto p-4 sm:p-8'>
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              My Pizza Orders 🍕
            </span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Track your delicious pizza journey
          </p>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center h-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4'></div>
              <p className='text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                Loading your pizza orders...
              </p>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders?.items?.map((order) => (
              <div
                key={order.id}
                className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 hover:shadow-xl transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-600 overflow-hidden'
              >
                <div className='p-6 sm:p-8'>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
                    <div className='mb-4 sm:mb-0'>
                      <h2 className='text-2xl sm:text-3xl font-black mb-2'>
                        <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                          Order #{order.id} 🍕
                        </span>
                      </h2>
                      <p className='text-gray-600 dark:text-gray-400 font-medium'>
                        Ordered on {order.createdDate.split('T').shift()}
                      </p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end space-y-2'>
                      <Badge className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-4 py-2 rounded-2xl font-bold text-sm'>
                        {
                          orderStatusIcons[
                            order.statusIdentifier as keyof typeof orderStatusIcons
                          ]
                        }
                        <span className='ml-2 capitalize'>
                          {order.statusIdentifier}
                        </span>
                      </Badge>
                      <div className='text-right'>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          Total Amount
                        </p>
                        <p className='text-2xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                          ${order.totalSum}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='border-t-2 border-orange-200/50 dark:border-orange-700/50 pt-6'>
                    <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center'>
                      <Package className='w-5 h-5 mr-2 text-orange-600 dark:text-orange-400' />
                      Order Items
                    </h3>
                    <div className='space-y-4'>
                      {order.products.map((item) => (
                        <div
                          key={item.id}
                          className='flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-700/50'
                        >
                          <div className='flex items-center space-x-4'>
                            <div className='w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl flex items-center justify-center'>
                              <span className='text-2xl'>🍕</span>
                            </div>
                            <div>
                              <h4 className='font-bold text-gray-800 dark:text-gray-200 text-lg'>
                                {item.title}
                              </h4>
                              <p className='text-gray-600 dark:text-gray-400 font-medium'>
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <p className='text-lg font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && orders?.total === 0 && (
          <div className='text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-8'>
            <div className='mb-6'>
              <XSquareIcon className='mx-auto h-20 w-20 text-orange-400 mb-4' />
              <div className='text-6xl mb-4'>🍕❓</div>
            </div>
            <h2 className='text-3xl font-black mb-4'>
              <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                No pizza orders yet!
              </span>
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto'>
              You haven&apos;t placed any delicious pizza orders yet. Time to
              treat yourself!
            </p>
            <Button
              className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'
              onClick={() => router.push('/')}
            >
              Order Your First Pizza! 🍕
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
