import React from 'react';
import { Actions } from './styles';
import { useContextApp } from 'Context';
import { Button } from 'react-native-paper';

export const Logout = () => {
	const { signOut } = useContextApp();

	return (
		<Actions>
			<Button
				onPress={signOut}
				color="red"
				icon="logout"
				mode="contained"
				style={{
					width: '94%',
					marginLeft: '3%',
					marginBottom: '4%',
					elevation: 6,
				}}
			>
				Sair
			</Button>
		</Actions>
	);
};
