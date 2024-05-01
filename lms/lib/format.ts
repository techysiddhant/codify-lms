export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(price);
};
export const formatNumber = (number: number) => {
	return new Intl.NumberFormat("en-IN").format(number);
  };