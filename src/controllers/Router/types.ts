/** Допустимы переменные в пути через ":", например /chat/:id */
export type TPathname = string;

export type TParams = { [key in string]: string } | undefined;
export type TGetComponent = (params: TParams) => HTMLElement;
