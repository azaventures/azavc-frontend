import { format, parseISO } from 'date-fns';

/**
 * Format a currency value with the specified currency symbol
 */
export const formatCurrency = (
  value: number | string,
  currency = 'USD',
  maximumFractionDigits = 2
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(numValue);
};

/**
 * Format a crypto value (e.g., ETH, BTC) with the specified token symbol
 */
export const formatCrypto = (
  value: number | string,
  symbol = 'ETH',
  maximumFractionDigits = 6
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return `${numValue.toLocaleString('en-US', {
    maximumFractionDigits,
  })} ${symbol}`;
};

/**
 * Format a date string to a human-readable date
 */
export const formatDate = (dateString: string, dateFormat = 'PPP'): string => {
  try {
    return format(parseISO(dateString), dateFormat);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string to a human-readable date and time
 */
export const formatDateTime = (dateString: string, dateTimeFormat = 'PPp'): string => {
  try {
    return format(parseISO(dateString), dateTimeFormat);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return dateString;
  }
};

/**
 * Truncate a string to a specified length
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Format an Ethereum address to a shortened version
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format a percentage value
 */
export const formatPercentage = (
  value: number | string,
  maximumFractionDigits = 2
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return `${numValue.toLocaleString('en-US', {
    maximumFractionDigits,
  })}%`;
};