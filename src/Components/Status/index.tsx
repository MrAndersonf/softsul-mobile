import React from 'react';
import { StatusBar } from 'react-native';

export const Status = () => {
	return (
		<StatusBar
			networkActivityIndicatorVisible
			animated
			barStyle="dark-content"
			backgroundColor="#fff"
			translucent
			hidden={false}
		/>
	);
};
