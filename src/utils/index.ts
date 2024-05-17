import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function priceFormatter(number: number, withZeroDecimal?: boolean) {
  const numberStr = number.toString();

  const formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if(withZeroDecimal) return formattedStr + ",00";
  return formattedStr;
}

function ratingToPrice(rating: number) {
  let price = 0;
  if (rating >= 1 && rating <= 3) {
    price = 3500;
  } else if (rating >= 3 && rating <= 6) {
    price = 8250;
  } else if (rating >= 6 && rating <= 8) {
    price = 16350;
  } else if (rating >= 8 && rating <= 10) {
    price = 21250;
  } else if (rating > 10) {
    price = 25000;
  } else if (rating === 0) {
    price = 1000;
  }

  return price;
}

export { cn, priceFormatter, ratingToPrice };
