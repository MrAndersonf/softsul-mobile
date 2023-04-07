import { RoutesRootParams } from 'Interfaces';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RoutesRootParams {}
	}
}
