declare module "pug-runtime" {
	type TFn = <T>(tmpl: TemplateStringsArray) => (props?: T) => string;
	let fn: TFn;
	export default fn;
}
