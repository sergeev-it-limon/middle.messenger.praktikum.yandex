import { getElemsByDataset, TElemsByDataset } from "./getElemsByDataset";

const CHILD_PLACE_ATTR = "[data-component]";

export type TChildren = { [key: string]: Node };

/** Сервис, отвечающий за рендеринг дочерних компонентов */
export class ChildrenService {
	/** Элементы дочерних компонентов */
	private readonly children: TChildren;

	/** Элементы в компоненте, которые надо заменить на элементы дочерних компонентов */
	private childrenPlacesSet: TElemsByDataset;

	constructor(children: TChildren) {
		this.children = children;
	}

	/** Добавить дочерние элементы */
	public bindChildren(ref: HTMLElement): void {
		this.initChildrenPlacesSet(ref);
		this.insertChildren();
	}

	private initChildrenPlacesSet(ref: HTMLElement) {
		this.childrenPlacesSet = getElemsByDataset(ref, CHILD_PLACE_ATTR);
	}

	private insertChildren() {
		const keys = Object.keys(this.childrenPlacesSet);

		for (const key of keys) {
			this.replaceWithChild(this.childrenPlacesSet[key], this.children[key]);
		}
	}

	private replaceWithChild(places: Node[], child: Node) {
		for (const place of places) {
			place.parentNode?.replaceChild(child, place);
		}
	}
}
