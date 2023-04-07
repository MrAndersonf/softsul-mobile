import Snackbar,{SnackBarOptions} from 'react-native-snackbar';

export const Success = (text: string) => {

	Snackbar.show({
		text: text,

		duration: Snackbar.LENGTH_SHORT,
		fontFamily: 'Marvel-Regular',
		action: {
			text: 'Fechar',
			textColor: 'green',
			onPress: () => {},
		},
  
	});
};

export const Error = (text: string) => {
	Snackbar.show({
		text: text,
    
		duration: Snackbar.LENGTH_SHORT,
		fontFamily: 'Marvel-Regular',
		action: {
			text: 'Fechar',
			textColor: 'red',

			onPress: () => {},
		},
	});
};

export const Warning = (text: string) => {
	Snackbar.show({
		text: text,
		duration: Snackbar.LENGTH_SHORT,
		fontFamily: 'Marvel-Regular',
		action: {
			text: 'Fechar',
			textColor: 'yellow',
			onPress: () => {},
		},
	});
};
