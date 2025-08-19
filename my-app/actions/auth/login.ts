'use server';
import { IAttributes } from 'oneentry/dist/base/utils';
import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
interface IErroredResponse {
  statusCode: number;
  message: string;
}

export const getLoginFormData = async (): Promise<IAttributes[]> => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker('users', 'en_US');

    // Filter out the name field for login form
    const filteredAttributes = response?.attributes?.filter(
      (attr: IAttributes) => attr.marker !== 'name'
    );

    return filteredAttributes as unknown as IAttributes[];
  } catch (error: any) {
    console.error(error);
    throw new Error('Fetching form data failed.');
  }
};

export const handleLoginSubmit = async (inputValues: {
  email: string;
  password: string;
}) => {
  try {
    const apiClient = await fetchApiClient();

    const data = {
      authData: [
        { marker: 'email', value: inputValues.email },
        { marker: 'password', value: inputValues.password },
      ],
    };

    const response = await apiClient?.AuthProvider.auth('email', data);

    if (!response?.userIdentifier) {
      const error = response as unknown as IErroredResponse;
      return {
        message: error.message,
      };
    }

    (await cookies()).set('access_token', response.accessToken, {
      maxAge: 60 * 60 * 24, // 24 hours
    });

    (await cookies()).set('refresh_token', response.refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error: any) {
    console.error(error);
    if (error?.statusCode === 401) {
      return { message: error?.message };
    }

    throw new Error('Failed to login. Please try again.');
  }
  redirect('/');
};
