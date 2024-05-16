import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatNumberWithDots(number: number) {
  const numberStr = number.toString();

  let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  formattedStr += ",00";

  return formattedStr;
}

function priceFormatter(rating: number) {
  let price = 0;
  if (rating >= 1 && rating <= 3) {
    price = 3500;
  } else if (rating >= 3 && rating >= 6) {
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

  return price + ",00";
}

export { cn, formatNumberWithDots, priceFormatter };
