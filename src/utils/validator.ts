import { EventBus } from "./buildEventBus";
import { getFormEntries } from "./getFormEntries";

type TRuleConfig = { message?: string };
type TRuleFn = (value: string) => boolean;
type TRuleInner = { rule: TRuleFn; message: string };

type TMinConfig = TRuleConfig & { count: number };

export const rules = {
	/** Латиница */
	latin: (config?: TRuleConfig): TRuleInner => {
		const { message = "Только латиница" } = config ?? {};
		return { rule: (value) => /^[A-Za-z]*$/.test(value), message };
	},
	/** Кириллица */
	cyrillic: (config?: TRuleConfig): TRuleInner => {
		const { message = "Только кириллица" } = config ?? {};
		return { rule: (value) => /^[А-Яа-я]*$/.test(value), message };
	},
	/** Числа */
	numbers: (config?: TRuleConfig): TRuleInner => {
		const { message = "Только числа" } = config ?? {};
		return { rule: (value) => /^\d*$/.test(value), message };
	},
	/** Обязательное поле */
	required: (config?: TRuleConfig): TRuleInner => {
		const { message = "Обязательно" } = config ?? {};
		return { rule: (value) => /^.+$/.test(value), message };
	},
	/** Может содержать дефис */
	hyphen: (config?: TRuleConfig): TRuleInner => {
		const { message = "" } = config ?? {};
		return { rule: (value) => /-/.test(value), message };
	},
	/** Может содержать нижнее подчеркивание */
	underscore: (config?: TRuleConfig): TRuleInner => {
		const { message = "" } = config ?? {};
		return { rule: (value) => /_/.test(value), message };
	},
	/** Минимальное кол-во символов */
	min: minOrMax(true),
	/** Максимальное кол-во символов */
	max: minOrMax(false),
	/** Начинается с заглавной буквы */
	capitalFirst: (config?: TRuleConfig): TRuleInner => {
		const { message = "Должно начинаться с заглавной буквы" } = config ?? {};
		return { rule: (value) => /^[A-ZА-Я]/.test(value), message };
	},
	/** Регулярное выражение */
	regExp: (config: TRuleConfig & { exp: RegExp }): TRuleInner => {
		const { message = "", exp } = config ?? {};
		return { rule: (value) => exp.test(value), message };
	},
	/** Принимает массив правил, если любое из них проходит, значит значение удовлетворяет правилу */
	or: (config: TRuleConfig & { rules: TRuleInner[] }): TRuleInner => {
		const { message = "", rules } = config;
		return {
			rule: (value) => {
				return rules.some(({ rule }) => rule(value));
			},
			message: message,
		};
	},
};

export const appRules = {
	login: [
		rules.required(),
		rules.regExp({
			message: "Латиница или цифры (допустимо нижнее подчеркивание или дефис)",
			exp: /^[a-zA-Z0-9\-_]*$/,
		}),
		rules.regExp({
			message: "Не может состоять только из цифр",
			exp: /\d\D|\D\d|\D|^$/,
		}),
		rules.min({ message: "Минимум 3 символа", count: 3 }),
		rules.max({ message: "Максимум 20 символов", count: 20 }),
	],
	name: [
		rules.required(),
		rules.regExp({
			message: "Латиница или кириллица (допустим дефис)",
			exp: /^[a-zA-Zа-яА-Я-]*$/,
		}),
		rules.capitalFirst(),
	],
	password: [
		rules.required(),
		rules.regExp({ message: "Хотя бы 1 заглавная буква", exp: /[A-ZА-Я]/ }),
		rules.regExp({ message: "Хотя бы 1 цифра", exp: /\d/ }),
		rules.min({ message: "Минимум 8 символов", count: 8 }),
		rules.max({ message: "Максимум 40 символов", count: 40 }),
	],
	phone: [
		rules.required(),
		rules.min({ message: "Минимум 10 символов", count: 10 }),
		rules.max({ message: "Максимум 15 символов", count: 15 }),
		rules.regExp({
			message: "Только цифры (допустим + в начале)",
			exp: /^(\+|\d*)\d*$/,
		}),
	],
	email: [
		rules.required(),
		rules.regExp({
			message: "Невалидная почта",
			exp: /(\w|-)+@(\w|-)+\.\w+/,
		}),
	],
};

function minOrMax(isMin: boolean) {
	return (config: TMinConfig): TRuleInner => {
		const { message = "", count } = config;

		return {
			rule: (value) => (isMin ? value.length >= count : value.length <= count),
			message,
		};
	};
}

type TRuleList = typeof rules;
type TRule = ReturnType<TRuleList[keyof TRuleList]>;
type TInputRules = { [key in string]: TRule[] };

type Errors<T extends TInputRules> = { [key in keyof T]: string[] };

type THandlers = {
	submit: (e: SubmitEvent) => void;
	focusIn: (e: FocusEvent) => void;
	focusOut: (e: FocusEvent) => void;
	input: (e: InputEvent) => void;
};

type TValidator<T extends TInputRules> = {
	handlers: THandlers;
	subscribe: (fn: (errors: TEventData<T>) => void) => void;
};

type TEventData<T extends TInputRules> = {
	name: keyof T;
	errors: Errors<T>[keyof T];
};

type TBuildConfig<T extends TInputRules> = {
	submit: (e: SubmitEvent) => void;
	rules: T;
};

class ValidatorEventBus<T extends TInputRules> extends EventBus<{
	validate: TEventData<T>;
}> {}

export const buildValidator = <T extends TInputRules>(
	config: TBuildConfig<T>
): TValidator<T> => {
	const { rules, submit } = config;

	const validatorEventBus = new ValidatorEventBus<T>();
	const errors = initErrors(rules);

	const errorsProxy = new Proxy(errors, {
		set(target, prop, val) {
			if (rules[prop as keyof T] == null) return false;
			if (typeof prop !== "string") return false;

			target[prop as keyof T] = val;
			validatorEventBus.emit("validate", { name: prop, errors: val });
			return true;
		},
	});

	const validator: TValidator<T> = {
		subscribe: initSubscribe(validatorEventBus),
		handlers: initHandlers(rules, errorsProxy, submit),
	};

	return validator;
};

const initSubscribe = <T extends TInputRules>(
	validatorEventBus: ValidatorEventBus<T>
) => {
	return (fn: (errors: TEventData<T>) => void) =>
		validatorEventBus.subscribe("validate", fn);
};

const initErrors = <T extends TInputRules>(rules: T): Errors<T> => {
	const inputNames = Object.keys(rules);

	const errorsEntries = inputNames.map((name) => [name, []]);

	return Object.fromEntries(errorsEntries);
};

const initHandlers = <T extends TInputRules>(
	rules: T,
	errors: Errors<T>,
	submit: (e: SubmitEvent) => void
): THandlers => {
	const state: { [key in string]: { isBlur: boolean } } = {};
	const validateAll = initValidateAll(rules, errors);

	return {
		focusIn: (e) => {
			const input = e.target;

			if (!(input instanceof HTMLInputElement)) {
				console.error("validator expected HTMLInputElement");
				console.log(input);
				return;
			}

			const name = input.name;

			if (!state[name]?.isBlur) return;
			changeErrors(name, rules, errors, input.value);
		},
		focusOut: (e) => {
			const input = e.target;

			if (!(input instanceof HTMLInputElement)) {
				console.error("validator expected HTMLInputElement");
				console.log(input);
				return;
			}

			const name = input.name;

			state[name] = { isBlur: true };
			changeErrors(name, rules, errors, input.value);
		},
		input: (e) => {
			const input = e.target;

			if (!(input instanceof HTMLInputElement)) {
				console.error("validator expected HTMLInputElement");
				console.log(input);
				return;
			}

			const name = input.name;

			if (!state[name]?.isBlur) return;
			changeErrors(name, rules, errors, input.value);
		},
		submit: (e: SubmitEvent) => {
			e.preventDefault();

			const formData = getFormEntriesFromEvent(e);
			const names = Object.keys(formData);
			for (const name of names) {
				state[name] = { isBlur: true };
			}

			if (validateAll(e)) submit(e);
		},
	};
};

const changeErrors = <T extends TInputRules>(
	name: keyof T,
	rules: T,
	errors: Errors<T>,
	value: string
): void => {
	const inputRules = rules[name];

	if (inputRules == null) {
		console.error(`Not found rules for input with name ${name}`);
		return;
	}

	errors[name] = inputRules
		.map(({ rule, message }) => {
			if (rule(value)) return "";
			return message;
		})
		.filter((mes) => mes !== "");
};

const initValidateAll = <T extends TInputRules>(
	rules: T,
	errors: Errors<T>
) => {
	return (e: SubmitEvent) => {
		const formData = getFormEntriesFromEvent(e);

		for (const name of Object.keys(rules)) {
			const value = formData[name];

			if (typeof value !== "string") {
				console.error("validator expected only string in inputs");
				console.log(`inputName: ${name}`);
				console.log(`inputValue: ${value}`);
				return false;
			}

			changeErrors(name, rules, errors, value);
		}

		return !isError(errors);
	};
};

const getFormEntriesFromEvent = (e: Event) => {
	const form = e.currentTarget;

	if (!(form instanceof HTMLFormElement)) {
		console.error("validator expected HTMLFormElement");
		console.log(form);
		return {};
	}

	return getFormEntries(form);
};

const isError = <T extends TInputRules>(rules: Errors<T>) => {
	const values = Object.values(rules);
	return values.some((value) => value.length > 0);
};