import React from 'react';
import { MainArea } from './styles';
import DropDown from 'react-native-paper-dropdown';
import { HelperText, Provider } from 'react-native-paper';

export interface ISelecterOptList {
	label: string;
	value: string;
}

interface ISelecter {
	name: string;
	label: string;
	value: string;
	onChange: (list: string, value: string) => void;
	list: ISelecterOptList[];
	error: string | undefined;
}

export const Selecter = ({
	label,
	list,
	value,
	onChange,
	name,
	error,
}: ISelecter) => {
	const [showDropDown, setShowDropDown] = React.useState(false);
	return (
		<Provider>
			<MainArea>
				<DropDown
					label={label}
					mode="outlined"
					visible={showDropDown}
					dropDownItemTextStyle={{ fontFamily: 'Marvel-Regular' }}
					dropDownItemStyle={{
						display: 'flex',
						width: '100%',
						flexDirection: 'column',
						justifyContent: 'center',

						backgroundColor: 'red',
					}}
					showDropDown={() => setShowDropDown(true)}
					onDismiss={() => setShowDropDown(false)}
					value={value}
					setValue={value => onChange(name, value)}
					list={list}
				/>
				{error !== undefined && (
					<HelperText visible={error !== undefined} type="error">
						{error !== undefined ? error : ' '}
					</HelperText>
				)}
			</MainArea>
		</Provider>
	);
};
