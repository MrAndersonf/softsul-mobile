import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

interface IFabOptions {
	small?: boolean;
	icon: string;
	label: string;
	onPress: () => void;
}

interface IButtons {
	options: IFabOptions[];
}

export const Buttons = ({ options }: IButtons) => {
	const [state, setState] = React.useState({ open: false });

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	return (
		<Provider>
			<Portal>
				<FAB.Group
					visible={true}
					open={open}
					fabStyle={{ elevation: 6, backgroundColor: '#3B8BF5' }}
					icon={open ? 'close' : 'plus'}
					actions={[...options]}
					onStateChange={onStateChange}
					onPress={() => {
						if (open) {
							// do something if the speed dial is open
						}
					}}
				/>
			</Portal>
		</Provider>
	);
};
