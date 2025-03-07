export function formatCurrency(amount: number, currencyCode: string = "KES") {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Invalid currency code", error);
    // Fallback to a default format if there's an error
    return `Ksh ${amount.toLocaleString("en-KE")}`;
  }
}