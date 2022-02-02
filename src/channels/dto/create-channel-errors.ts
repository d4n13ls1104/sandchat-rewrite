import { ApiError } from '../../types/api-error';

export const GENERIC_ERROR: ApiError = {
  code: 'GENERIC_ERROR',
  message: 'Something went wrong. Please try again later.',
};
