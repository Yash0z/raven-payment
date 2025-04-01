export const formatDate = (dateString: string) => {
	if (!dateString) return "Not specified";

	const date = new Date(dateString);
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};
