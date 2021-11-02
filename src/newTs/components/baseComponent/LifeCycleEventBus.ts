import { buildEventBus } from "../../utils/buildEventBus";

export const buildLifeCycleEventBus = <TProps>() => {
	type TEvents = {
		componentWillInit: null;
		render: null;
		initServices: null;
		update: TProps;
	};

	return buildEventBus<TEvents>();
};
