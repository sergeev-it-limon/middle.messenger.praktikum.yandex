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
	public bindChildren(ref: Node): void {
		if (!(ref instanceof Node)) {
			console.error("ref is not instance of Node");
			return;
		}
		this.initChildrenPlacesSet(ref);
		this.insertChildren();
	}

	private initChildrenPlacesSet(ref: Node) {
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
			if (place instanceof Node && child instanceof Node) {
				place.parentNode?.replaceChild(child, place);
			} else {
				console.error(
					"error occured in ChildrenService, place or child is not instance of Node"
				);
				console.log("place:");
				console.log(place);
				console.log("child:");
				console.log(child);
			}
		}
	}
}
