const BASE_URL = "https://ya-praktikum.tech/api/v2/resources";

export const getImgSrc = (url: string): string => {
	return `${BASE_URL}${url}`;
};
