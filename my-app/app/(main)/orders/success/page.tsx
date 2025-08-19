'use client';

import { CheckCheckIcon, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrderSuccess() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10 flex items-center justify-center p-4'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-8 sm:p-12'>
        <div className='text-center mb-8'>
          {/* Success icons */}
          <div className='relative mb-6'>
            <div className='mx-auto w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 rounded-full flex items-center justify-center mb-4 border-4 border-green-200 dark:border-green-700'>
              <CheckCheckIcon className='w-12 h-12 text-green-600 dark:text-green-400' />
            </div>
            <div className='text-6xl mb-4'>🍕✅</div>
          </div>

          <h1 className='text-4xl sm:text-5xl font-black mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              Pizza Order Successful! 🎉
            </span>
          </h1>

          <p className='text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto'>
            Your delicious pizza order has been placed and is being prepared by
            our master chefs!
          </p>

          {/* Order status card */}
          <div className='bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-green-950/20 border border-green-200 dark:border-green-700 rounded-2xl p-6 mb-8'>
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <Pizza className='w-6 h-6 text-orange-600 dark:text-orange-400' />
              <span className='text-lg font-bold text-gray-800 dark:text-gray-200'>
                Order Status: Confirmed
              </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-center'>
              <div className='p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>👨‍🍳</div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Preparing
                </div>
              </div>
              <div className='p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>🔥</div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Baking
                </div>
              </div>
              <div className='p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>🚚</div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Delivery
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center space-y-6'>
          <p className='text-lg text-gray-600 dark:text-gray-300 font-semibold'>
            Thank you for choosing SahandPizza! 🙏
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/orders'>
              <Button className='bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'>
                View My Orders 📋
              </Button>
            </Link>

            <Link href='/'>
              <Button className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'>
                Order More Pizza! 🍕
              </Button>
            </Link>
          </div>

          {/* Fun message */}
          <div className='mt-8 p-4 rounded-2xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800'>
            <p className='text-sm font-semibold text-orange-800 dark:text-orange-200'>
              🔥 Estimated delivery time: 25-35 minutes | Track your order in
              real-time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
