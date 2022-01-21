import { IBuildableComponent } from "../components/baseComponent";
import { TParams } from "../controllers/Router";

type TBuildGetComponent = <TComponent extends IBuildableComponent>(
	component: TComponent
) => (params: TParams) => HTMLElement;

export const buildGetComponent: TBuildGetComponent = (component) => {
	return (params) => {
		component.build(params);
		return component.getRef();
	};
};
