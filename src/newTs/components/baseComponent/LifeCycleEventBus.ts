import { EventBus } from "../../utils/buildEventBus";

type TEvents<TProps> = {
	initServices: null;
	componentWillInit: null;
	saveRef: null;
	render: null;
	bindServices: null;
	update: TProps;
	remount: null;
};

export class LifeCycleEventBus<TProps> extends EventBus<TEvents<TProps>> {}
