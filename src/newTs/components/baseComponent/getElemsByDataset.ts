export type TElemsByDataset = { [key: string]: HTMLElement[] };

/** Возвращает список элементов, найденых в ref по указанному дата-атрибуту, сгруппированых по значению атрибута */
export function getElemsByDataset(
	ref: HTMLElement,
	datasetAttr: string
): TElemsByDataset {
	const datasetKey = getDatasetKey(datasetAttr);

	const elemsWithAttr = Array.from(ref.querySelectorAll(datasetAttr));

	if (ref.dataset[datasetKey] != null) {
		elemsWithAttr.push(ref);
	}

	const elemsByDataset = elemsWithAttr.reduce(
		(acc: TElemsByDataset, elem: HTMLElement): TElemsByDataset => {
			const datasetValue = elem.dataset[datasetKey];

			if (datasetValue == null) {
				console.error(`Cannot find datasetValue by datasetKey ${datasetKey}`);
				return acc;
			}

			const elems = acc[datasetValue];

			if (elems == null) {
				acc[datasetValue] = [elem];
			} else {
				elems.push(elem);
			}

			return acc;
		},
		{}
	);

	return elemsByDataset;
}

function getDatasetKey(dataSetAttr: string): string {
	const value = dataSetAttr.match(/(?<=\[data-).+(?=\])/)?.[0];

	if (value == null) {
		console.error(`Cannot get datasetKey by datasetAttr ${value}`);
		return "";
	}

	const valueArr = value.split("-");
	const valueNormalized = valueArr.reduce(
		(acc, word) => `${acc}${withFirstUpper(word)}`
	);

	return valueNormalized;
}

const withFirstUpper = (word: string): string => {
	const firstUpper = word[0].toUpperCase();
	return `${firstUpper}${word.slice(1)}`;
};
