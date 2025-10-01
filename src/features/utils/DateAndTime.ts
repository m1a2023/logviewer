export const extractDateAndTime = (date: Date): string => {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
