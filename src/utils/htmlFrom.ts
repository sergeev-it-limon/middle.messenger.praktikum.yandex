export const htmlFromStr = (str: string): HTMLElement => {
	const div = document.createElement("div");
	div.innerHTML = str;
	return div.children[0] as HTMLElement;
};
