type StringIndexed = { [key in string]: unknown };

export const isObject = (value: unknown): value is StringIndexed => {
	return (
		typeof value === "object" && value !== null && !(value instanceof Array)
	);
};
