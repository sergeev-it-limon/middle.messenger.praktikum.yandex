import { EventBus } from "../../utils/buildEventBus";

type TEvents<TProps> = {
	initServices: null;
	componentWillInit: null;
	render: null;
	bindServices: null;
	update: TProps;
};

export class LifeCycleEventBus<TProps> extends EventBus<TEvents<TProps>> {}
