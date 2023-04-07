import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface IAppBar {
	menuAction?: () => void;
	backHandle?: () => void;
	title?: string;
	rightHandle?: () => void;
	rightIcon?: string;
}

export const AppBar = ({
	title,
	menuAction,
	backHandle,
	rightHandle,
	rightIcon,
}: IAppBar) => {
	return (
		<Appbar.Header
			style={{
				display: 'flex',
				width: '100%',
				backgroundColor: '#fff',
				height: 40,
			}}
		>
			{menuAction && (
				<Appbar.Action icon="menu" onPress={menuAction} color={'red'} />
			)}
			{backHandle && <Appbar.BackAction onPress={backHandle} color="#000" />}
			{title && (
				<Appbar.Content
					title={title}
					color="#000"
					titleStyle={{
						fontFamily: 'Marvel-Regular',
						fontSize: 16,
						fontWeight: 'bold',
					}}
				/>
			)}
			{rightIcon && (
				<Appbar.Action icon={rightIcon} onPress={rightHandle} color="#000" />
			)}
		</Appbar.Header>
	);
};
