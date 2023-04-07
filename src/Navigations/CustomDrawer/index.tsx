import React from 'react';
import {
	DrawerItemList,
	DrawerContentScrollView,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Area } from './styles';
import { Logout } from 'Components/Logout';

interface ICustomDrawer {
	Props: DrawerContentComponentProps;
}

export const CustomDrawer = ({ Props }: ICustomDrawer) => {
	const { descriptors, navigation, state } = Props;
	return (
		<Area>
			<DrawerContentScrollView {...Props}>
				<DrawerItemList {...Props} />
			</DrawerContentScrollView>
			<Logout />
		</Area>
	);
};
