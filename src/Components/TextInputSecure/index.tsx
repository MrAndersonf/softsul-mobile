import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

interface ITextInputSecure {
	name: string;
	label: string;
	value: string;
	onChange: (field: string, value: string) => void;
	onError: string | undefined;
}

export const TextInputSecure = ({
	label,
	name,
	onChange,
	onError,
	value,
}: ITextInputSecure) => {
	const [showPass, setShowPass] = React.useState(false);

	const onShowPass = () => setShowPass(!showPass);

	return (
		<>
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
				secureTextEntry={!showPass}
				onChangeText={text => onChange(name, text)}
				allowFontScaling={false}
				style={{
					backgroundColor: '#fff',
					width: '100%',
					marginBottom: 5,
					fontFamily: 'Marvel-Regular',
				}}
				right={
					<TextInput.Icon
						name={showPass ? 'eye' : 'eye-off'}
						color="red"
						onPress={onShowPass}
					/>
				}
			/>
			{onError !== undefined && (
				<HelperText type="error" visible={onError !== undefined}>
					{onError}
				</HelperText>
			)}
		</>
	);
};
