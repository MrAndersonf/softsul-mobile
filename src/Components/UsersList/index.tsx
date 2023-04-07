import React from 'react';
import { IUser } from 'Interfaces';
import { MainArea } from './styles';
import { ScrollView, Dimensions } from 'react-native';
import { CardUser } from 'Components/CardUser';

const { height } = Dimensions.get('screen');

interface IUserList {
	users: IUser[];
	onEdit: (data: IUser) => void;
}

export const UsersList = ({ users, onEdit }: IUserList) => {
	const [data, setData] = React.useState<IUser[]>([]);

	React.useEffect(() => {
		setData(users);
	}, [users]);

	return (
		<MainArea height={height}>
			<ScrollView>
				{data.map(item => (
					<CardUser data={item} key={item.id} />
				))}
			</ScrollView>
		</MainArea>
	);
};
