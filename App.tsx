import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { ContextApp } from 'Context';

import { Routes } from 'Routes';
import SplashScreen from 'react-native-splash-screen';

import { Status } from 'Components/Status';

const App = () => {
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<ContextApp>
					<Status />
					<Routes />
				</ContextApp>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default App;
