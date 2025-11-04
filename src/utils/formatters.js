export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  // Handle null, undefined, or empty inputs
  if (!date) {
    return "Invalid Date";
  }
  
  try {
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }
    
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObj);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};