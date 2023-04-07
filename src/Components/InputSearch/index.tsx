import React from 'react';
import { Button } from 'react-native-paper';
import { ActivityIndicator, Dimensions } from 'react-native';

import { HelperText, TextInput } from 'react-native-paper';
import { MainArea } from './style';
import { Success } from 'Components/Notify';

interface IInputSearch {
	name: string;
	label: string;
	value: string;
	onChange: (field: string, value: string) => void;
	onError: string | undefined;
	onSearch: (value: string) => Promise<void>;
}

const { width } = Dimensions.get('window');

export const InputSearch = ({
	label,
	onChange,
	onError,
	value,
	name,
	onSearch,
}: IInputSearch) => {
	const [loadinOnSearch, setLoadinOnSearch] = React.useState<boolean>(false);

	const handleSearch = async () => {
		try {
			setLoadinOnSearch(true);
			await onSearch(value);
			setLoadinOnSearch(false);
		} catch (error) {
			Error('Erro no componente de pesquisa');
		}
	};
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
				onChangeText={text => onChange(name, text)}
				allowFontScaling={false}
				dense
				style={{
					backgroundColor: '#fff',
					width: Math.round(width) - 131,
					marginBottom: 6,
					fontFamily: 'Marvel-Regular',
				}}
				renderToHardwareTextureAndroid
				right={<ActivityIndicator />}
			/>
			<Button
				color="blue"
				labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
				mode="contained"
				icon="cloud-search"
				style={{
					width: 123,
					elevation: 6,
					height: 42,
					borderRadius: 0,
					marginLeft: -5,
					marginRight: 3,
					borderBottomRightRadius: 5,
					borderTopRightRadius: 5,
				}}
				onPress={handleSearch}
				loading={loadinOnSearch}
			>
				Buscar
			</Button>
			{onError !== undefined && (
				<HelperText type="error" visible={onError !== undefined}>
					{onError}
				</HelperText>
			)}
		</MainArea>
	);
};
