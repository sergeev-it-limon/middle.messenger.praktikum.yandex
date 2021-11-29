type TFormData = { [key: string]: FormDataEntryValue };

export const getFormEntries = (form: HTMLFormElement): TFormData => {
	const formData = new FormData(form);
	const entries = formData.entries();

	const entriesObj: TFormData = {};
	for (const entry of entries) {
		entriesObj[entry[0]] = entry[1];
	}

	return entriesObj;
};
