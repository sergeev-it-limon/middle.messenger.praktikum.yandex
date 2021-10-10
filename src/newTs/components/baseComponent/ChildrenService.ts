import { getElemsByDataset, TElemsByDataset } from "./getElemsByDataset";

const CHILD_PLACE_ATTR = "[data-component]";

export type TChildren = { [key: string]: HTMLElement };

/** Сервис, отвечающий за рендеринг дочерних компонентов */
export class ChildrenService {
	/** Ссылка на элемент, в котором надо заменять тэги на элементы дочерних компонентов */
	private readonly ref: HTMLElement;

	/** Элементы дочерних компонентов */
	private readonly children: TChildren;

	/** Элементы в компоненте, которые надо заменить на элементы дочерних компонентов */
	private childrenPlacesSet: TElemsByDataset;

	constructor(ref: HTMLElement, children: TChildren) {
		this.ref = ref;
		this.children = children;
	}

	/** Добавить дочерние элементы */
	public bindChildren(): void {
		this.initChildrenPlacesSet();
		this.insertChildren();
	}

	private initChildrenPlacesSet() {
		this.childrenPlacesSet = getElemsByDataset(this.ref, CHILD_PLACE_ATTR);
	}

	private insertChildren() {
		const keys = Object.keys(this.childrenPlacesSet);

		for (const key of keys) {
			this.replaceWithChild(this.childrenPlacesSet[key], this.children[key]);
		}
	}

	private replaceWithChild(places: HTMLElement[], child: HTMLElement) {
		for (const place of places) {
			place.parentNode?.replaceChild(child, place);
		}
	}
}
