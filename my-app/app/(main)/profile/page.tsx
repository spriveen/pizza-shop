'use client';

import { useState, useEffect } from 'react';

import { Package, DollarSign, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import getUserSession from '@/actions/auth/getUserSession';
import { getOrders } from '@/actions/orders/get-orders';
import { IUserEntity } from 'oneentry/dist/users/usersInterfaces';
import { redirect } from 'next/navigation';

interface UserStats {
  lifetimeOrders: number;
  lifetimeSpent: number;
  yearlyOrders: number;
  yearlySpent: number;
  monthlyOrders: number;
  monthlySpent: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<IUserEntity | null>(null);

  const [stats, setStats] = useState<UserStats>({
    lifetimeOrders: 0,
    lifetimeSpent: 0,
    yearlyOrders: 0,
    yearlySpent: 0,
    monthlyOrders: 0,
    monthlySpent: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserSession();
      if (userData) setUser(userData as IUserEntity);
      if (!userData) {
        setUser(null);
        setIsLoading(false);
        redirect('/auth?type=login');
      }
      const orders = await getOrders();
      if (orders) {
        let lifetimeOrders = 0;
        let lifetimeSpent = 0;
        let yearlyOrders = 0;
        let yearlySpent = 0;
        let monthlyOrders = 0;
        let monthlySpent = 0;

        orders.items.forEach(
          (order: {
            createdDate: string | number | Date;
            totalSum: string;
          }) => {
            const orderDate = new Date(order.createdDate);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth() + 1;
            const totalSum = parseFloat(order.totalSum);
            const currentYear = new Date().getFullYear(); // Define current year here
            const currentMonth = new Date().getMonth() + 1; // Define current month here

            // Lifetime
            lifetimeOrders += 1;
            lifetimeSpent += totalSum;

            // Yearly
            if (orderYear === currentYear) {
              yearlyOrders += 1;
              yearlySpent += totalSum;
            }

            // Monthly
            if (orderYear === currentYear && orderMonth === currentMonth) {
              monthlyOrders += 1;
              monthlySpent += totalSum;
            }
          }
        );

        setStats({
          lifetimeOrders,
          lifetimeSpent,
          yearlyOrders,
          yearlySpent,
          monthlyOrders,
          monthlySpent,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-4xl mx-auto p-4 sm:p-8'>
        <div className='text-center mb-6 sm:mb-8 lg:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight px-4'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              My Pizza Profile 🍕
            </span>
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4'>
            Your delicious journey with us
          </p>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center h-48 sm:h-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50'>
            <div className='text-center px-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4'></div>
              <p className='text-base sm:text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                Loading your pizza profile...
              </p>
            </div>
          </div>
        ) : (
          <div className='space-y-6 sm:space-y-8'>
            {/* Profile Card */}
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-4 sm:p-6 lg:p-8'>
              <div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8'>
                <div className='relative flex-shrink-0'>
                  <Avatar className='h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 text-4xl sm:text-5xl lg:text-6xl ring-4 ring-orange-200 dark:ring-orange-700'>
                    <AvatarFallback className='bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white text-2xl sm:text-3xl lg:text-4xl font-black'>
                      {user?.formData[0]?.value?.charAt(0) || 'P'}
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full p-1.5 sm:p-2'>
                    <span className='text-lg sm:text-xl lg:text-2xl'>🍕</span>
                  </div>
                </div>

                <div className='flex-1 text-center sm:text-left'>
                  <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black mb-2'>
                    <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                      {user?.formData[1]?.value || 'Pizza Lover'}
                    </span>
                  </h2>
                  <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium mb-3 sm:mb-4 break-all sm:break-normal'>
                    {user?.identifier || 'pizza.lover@example.com'}
                  </p>

                  {/* Member badge */}
                  <div className='inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800'>
                    <span className='text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200'>
                      🏆 Premium Pizza Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-4 sm:p-6 lg:p-8'>
              <div className='text-center mb-6 sm:mb-8'>
                <h3 className='text-xl sm:text-2xl lg:text-3xl font-black mb-2'>
                  <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    Pizza Stats 📊
                  </span>
                </h3>
                <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>
                  Your delicious achievements
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                <StatCard
                  icon={
                    <Package className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                  }
                  title='Lifetime Orders'
                  value={stats.lifetimeOrders}
                  emoji='🍕'
                />
                <StatCard
                  icon={
                    <DollarSign className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                  }
                  title='Total Spent'
                  value={`$${stats.lifetimeSpent.toFixed(2)}`}
                  emoji='💰'
                />
                <StatCard
                  icon={
                    <Calendar className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                  }
                  title='This Year'
                  value={`${stats.yearlyOrders} orders`}
                  subvalue={`$${stats.yearlySpent.toFixed(2)} spent`}
                  emoji='📅'
                />
              </div>

              {/* Additional stats row */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6'>
                <div className='p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-700/50 text-center'>
                  <div className='text-2xl sm:text-3xl mb-2'>📈</div>
                  <h4 className='text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mb-1'>
                    This Month
                  </h4>
                  <p className='text-xl sm:text-2xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    {stats.monthlyOrders}
                  </p>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    ${stats.monthlySpent.toFixed(2)} spent
                  </p>
                </div>

                <div className='p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-700/50 text-center'>
                  <div className='text-2xl sm:text-3xl mb-2'>⭐</div>
                  <h4 className='text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mb-1'>
                    Status
                  </h4>
                  <p className='text-base sm:text-lg font-bold text-orange-700 dark:text-orange-300'>
                    {stats.lifetimeOrders >= 10
                      ? 'Pizza Master'
                      : stats.lifetimeOrders >= 5
                      ? 'Pizza Enthusiast'
                      : 'Pizza Starter'}
                  </p>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    {stats.lifetimeOrders >= 10
                      ? "You're a legend!"
                      : `${10 - stats.lifetimeOrders} more orders to Master`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  subvalue,
  emoji,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subvalue?: string;
  emoji?: string;
}) {
  return (
    <div className='p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105'>
      <div className='flex items-center justify-between mb-3 sm:mb-4'>
        <div className='p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
          {icon}
        </div>
        {emoji && <div className='text-2xl sm:text-3xl'>{emoji}</div>}
      </div>
      <div>
        <h4 className='text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1'>
          {title}
        </h4>
        <p className='text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-1'>
          {value}
        </p>
        {subvalue && (
          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium'>
            {subvalue}
          </p>
        )}
      </div>
    </div>
  );
}
