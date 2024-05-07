export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(price);
};
export const formatNumber = (number: number) => {
	return new Intl.NumberFormat("en-IN").format(number);
};
export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat("en-IN", {
		year: "numeric",
		month: "short",
	}).format(date);
};
export const formatDescription = (description: string) => {
	if (description.length <= 30) {
		return description + " " + "...";
	} else {
		const newdescription = description.slice(0, 100);
		return newdescription + " " + "more ...";
	}
};
