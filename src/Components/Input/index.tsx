import React from 'react';

import { HelperText, TextInput } from 'react-native-paper';
import { MainArea } from './style';

interface IInput {
	name: string;
	label: string;
	value: string;
	onChange: (field: string, value: string) => void;
	onError: string | undefined;
}

export const Input = ({ label, onChange, onError, value, name }: IInput) => {
	return (
		<MainArea>
			<TextInput
				theme={{
					roundness: 5,
					colors: {
						text: '#49514E',
						primary: '#49514E',
						placeholder: '#49514E',
						accent: '#49514E',
					},
					mode: 'exact',
				}}
				underlineColor="#49514E"
				label={label}
				value={value}
				mode="outlined"
				dense
				onChangeText={text => onChange(name, text)}
				allowFontScaling={false}
				style={{
					backgroundColor: '#fff',
					width: '100%',
					marginBottom: 5,
					fontFamily: 'Marvel-Regular',
				}}
			/>
			{onError !== undefined && (
				<HelperText type="error" visible={onError !== undefined}>
					{onError}
				</HelperText>
			)}
		</MainArea>
	);
};
