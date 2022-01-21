import { TParams } from "./types";

export class ParamsParser {
	private readonly template: string;
	private regExp: RegExp;

	constructor(template: string) {
		this.template = template;
		this.initRegExp();
	}

	public match(pathname: string): boolean {
		return this.regExp.test(pathname);
	}

	public getParams(pathname: string): TParams {
		return pathname.match(this.regExp)?.groups;
	}

	private initRegExp(): void {
		const pattern = this.template
			.replace(/\//g, "\\/")
			.replace(/:(\w+)/g, "(?<$1>\\w+)")
			.replace(/\*/g, ".*");
		this.regExp = new RegExp(`^${pattern}$`);
	}
}
