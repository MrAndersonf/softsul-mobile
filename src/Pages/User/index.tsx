import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { IUser, RoutesRootParams } from 'Interfaces';
import UserFilter, { IUserFilterHandles } from 'Components/UserFilter';
import { Container } from 'Components/Container';
import { Buttons } from 'Components/Buttons';
import { AppBar } from 'Components/AppBar';
import { BottomGap, MainArea } from './styles';
import { ScrollView } from 'react-native';
import UserForm, { IUserFormHandles } from 'Components/UserForm';
import { CardUser } from 'Components/CardUser';

type UserScreenProps = DrawerScreenProps<RoutesRootParams, 'User'>;

export const User = ({ route, navigation }: UserScreenProps) => {
	const [data, setData] = React.useState<IUser[]>([]);
	const referenceFilter = React.useRef<IUserFilterHandles>(
		null,
	) as React.MutableRefObject<IUserFilterHandles>;

	const referenceForm = React.useRef<IUserFormHandles>(
		null,
	) as React.MutableRefObject<IUserFormHandles>;

	const handleOpenFilter = () => {
		referenceFilter.current?.open();
	};

	const handleOpenForm = () => {
		referenceForm.current?.open();
	};

	const handleDeleteOnUserCard = (id: string) => {
		setData(data.filter(item => item?.id !== id));
	};

	const handleChangeOnUserForm = (user: IUser) => {
		const list = data.map(item => (item?.id === user?.id ? user : item));
		setData(list);
	};

	const handleEditOnUserCard = (user: IUser) => {
		referenceForm.current?.edit(user);
	};

	return (
		<Container>
			<AppBar
				backHandle={navigation.openDrawer}
				title="Usuários"
				rightIcon="filter"
				rightHandle={handleOpenFilter}
			/>
			<MainArea>
				<ScrollView>
					{data.map(item => (
						<CardUser
							data={item}
							key={item?.id}
							onDelete={handleDeleteOnUserCard}
							onEdit={handleEditOnUserCard}
						/>
					))}
					<BottomGap />
				</ScrollView>

				<Buttons
					options={[
						{
							icon: 'filter',
							label: 'Filtrar',
							small: true,
							onPress: () => handleOpenFilter(),
						},
						{
							icon: 'plus',
							label: 'Cadastrar',
							small: true,
							onPress: () => handleOpenForm(),
						},
					]}
				/>
			</MainArea>
			<UserForm onChange={handleChangeOnUserForm} ref={referenceForm} />
			<UserFilter onFilter={setData} ref={referenceFilter} />
		</Container>
	);
};
