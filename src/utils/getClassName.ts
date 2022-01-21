type TClassNameByCond = [string, boolean];
type TClassName = string | TClassNameByCond | undefined;

export const getClassName = (...classNames: TClassName[]): string => {
	return classNames.reduce<string>((acc, className) => {
		if (className === undefined) return acc;
		if (typeof className === "string") return addStr(acc, className);
		return addByCond(acc, className);
	}, "");
};

const addStr = (classNames: string, className: string): string => {
	if (classNames === "") return className;
	return `${classNames} ${className}`;
};

const addByCond = (classNames: string, cnByCond: TClassNameByCond): string => {
	const [className, cond] = cnByCond;
	const getResult = getStrByCond(className, cond);

	if (classNames === "") return getResult();
	if (cond) return `${classNames} ${getResult()}`;
	return classNames;
};

const getStrByCond = (className: string, cond: boolean) => (): string => {
	return cond ? className : "";
};
