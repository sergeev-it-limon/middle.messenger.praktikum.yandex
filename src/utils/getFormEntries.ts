type TFormData = { [key: string]: FormDataEntryValue };

export const getFormEntries = <T extends TFormData>(
	form: HTMLFormElement
): T => {
	const formData = new FormData(form);
	const entries = formData.entries();

	const entriesObj: TFormData = {};
	for (const entry of entries) {
		entriesObj[entry[0]] = entry[1];
	}

	return entriesObj as T;
};
