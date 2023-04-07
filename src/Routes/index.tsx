import React from 'react';
import { RoutesRootParams } from 'Interfaces';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { CustomDrawer } from 'Navigations/CustomDrawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Login } from 'Pages/Login';
import { useContextApp } from 'Context';

import { Branch } from 'Pages/Branch';
import { User } from 'Pages/User';
import Profile from 'Components/Profile';

const Drawer = createDrawerNavigator<RoutesRootParams>();
const Stack = createNativeStackNavigator<RoutesRootParams>();

type RootProps = NativeStackScreenProps<RoutesRootParams, 'Drawer'>;

const DrawerNav = ({ navigation, route }: RootProps) => {
	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawer Props={props} />}
			screenOptions={{
				headerShown: false,
				drawerActiveBackgroundColor: '#dbdcdc',
				drawerInactiveBackgroundColor: '#fff',
				drawerLabelStyle: {
					marginLeft: -25,
					fontFamily: 'Marvel-Regular',
					fontSize: 14,
					color: '#000',
				},
				drawerAllowFontScaling: false,
			}}
		>
			<Drawer.Screen
				name="Branch"
				component={Branch}
				options={{
					drawerLabel: 'Filiais',
					drawerIcon: ({ color }) => (
						<Icon name="home" size={22} color="#000" />
					),
				}}
			/>
			<Drawer.Screen
				name="User"
				component={User}
				options={{
					drawerLabel: 'Usuarios',
					drawerIcon: ({ color }) => (
						<Icon name="order-bool-descending" size={22} color="#000" />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export const Routes = () => {
	const { signed } = useContextApp();
	return (
		<Stack.Navigator>
			{!signed ? (
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
			) : (
				<>
					<Stack.Screen
						name="Drawer"
						component={DrawerNav}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Profile"
						component={Profile}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};
