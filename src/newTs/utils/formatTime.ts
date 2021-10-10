export const formatTime = (hours: number, minutes: number): string => {
	return `${hours}:${minutes}`.replace(/^\d(?=:)|(?<=:)\d$/g, "0$&");
};
