declare module "*.tmpl.js" {
	export const template: (...args: unknown[]) => string;
}
