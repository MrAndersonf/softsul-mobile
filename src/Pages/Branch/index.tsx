import React from 'react';
import { IBranch, RoutesRootParams } from 'Interfaces';
import { Container } from 'Components/Container';
import { AppBar } from 'Components/AppBar';
import { BottomGap, MainArea } from './styles';
import { ScrollView } from 'react-native';
import { Buttons } from 'Components/Buttons';
import BranchFilter, { IBranchFilterHandles } from 'Components/BranchFilter';
import BranchForm, { IBranchFormHandles } from 'Components/BranchForm';
import { CardBranch } from 'Components/CardBranch';
import { DrawerScreenProps } from '@react-navigation/drawer';

type BranchScreenProps = DrawerScreenProps<RoutesRootParams, 'Branch'>;

export const Branch = ({ route, navigation }: BranchScreenProps) => {
	const [data, setData] = React.useState<IBranch[]>([]);
	const referenceFilter = React.useRef<IBranchFilterHandles>(
		null,
	) as React.MutableRefObject<IBranchFilterHandles>;

	const referenceForm = React.useRef<IBranchFormHandles>(
		null,
	) as React.MutableRefObject<IBranchFormHandles>;

	const handleOpenFilter = () => {
		referenceFilter.current?.open();
	};

	const handleOpenForm = () => {
		referenceForm.current?.open();
	};

	const handleDeleteOnUserBranch = (id: string) => {
		setData(data.filter(item => item?.id !== id));
	};

	const handleChangeOnUserForm = (user: IBranch) => {
		const list = data.map(item => (item?.id === user?.id ? user : item));
		setData(list);
	};

	const handleEditOnUserBranch = (user: IBranch) => {
		referenceForm.current?.edit(user);
	};

	return (
		<Container>
			<AppBar
				backHandle={navigation.openDrawer}
				title="Filiais"
				rightIcon="filter"
				rightHandle={handleOpenFilter}
			/>
			<MainArea>
				<ScrollView>
					{data.map(item => (
						<CardBranch
							data={item}
							key={item?.id}
							onDelete={handleDeleteOnUserBranch}
							onEdit={handleEditOnUserBranch}
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
			<BranchForm onChange={handleChangeOnUserForm} ref={referenceForm} />
			<BranchFilter onFilter={setData} ref={referenceFilter} />
		</Container>
	);
};
