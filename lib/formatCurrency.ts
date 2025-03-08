export function formatCurrency(amount: number, currencyCode: string = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Invalid currency code", error);
    // Fallback to a default format if there's an error
    return `USD ${amount.toLocaleString("en-US")}`;
  }
}