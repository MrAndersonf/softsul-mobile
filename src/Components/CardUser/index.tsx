import React from 'react';
import axios from 'service/axios';
import { MainArea, InfoArea, Name, Line, Status, Actions } from './style';
import Icon from 'react-native-vector-icons/Entypo';
import { IUser } from 'Interfaces';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { Error, Success } from 'Components/Notify';
import { delay } from 'Utils';

interface ICardUser {
	data: IUser;
	onDelete: (id: string) => void;
	onEdit: (user: IUser) => void;
}

export const CardUser = ({ data, onDelete, onEdit }: ICardUser) => {
	const [loadinOnDelete, setLoadinOnDelete] = React.useState<boolean>(false);

	const AlertDelete = () =>
		Alert.alert('Atenção', 'Deseja realmente excluir o registro?', [
			{
				text: 'Cancelar',
				onPress: () => {
					Success('Operação cancelada!');
				},
				style: 'cancel',
			},
			{
				text: 'Confirmar',
				onPress: async () => {
					try {
						setLoadinOnDelete(true);
						const response = await axios.delete(`/api/user/${data.id}`);
						if (response.status === 200) {
							Success('Registro excluído com sucesso!');
							await delay(1000);
							onDelete(data.id);
							setLoadinOnDelete(false);
						}
					} catch (error) {
						Error('Erro ao excluir o registro!');
						setLoadinOnDelete(false);
					}
				},
			},
		]);

	return (
		<MainArea>
			<InfoArea>
				<Line>
					<Icon
						name="users"
						color="#000"
						size={16}
						style={{ paddingRight: 5 }}
					/>
					<Name>{data?.name}</Name>
				</Line>
				<Line>
					<Icon
						name="email"
						color="#000"
						size={16}
						style={{ paddingRight: 5 }}
					/>
					<Name>{data?.email}</Name>
				</Line>
				<Line>
					<Icon
						name="check"
						color="#000"
						size={16}
						style={{ paddingRight: 5 }}
					/>
					<Status active={data?.active}>
						{data?.active ? 'Ativo' : 'Inativo'}
					</Status>
				</Line>
			</InfoArea>
			<Actions>
				<Button
					color="blue"
					labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
					mode="contained"
					icon="pen"
					style={{ width: '96%' }}
					onPress={() => onEdit(data)}
				>
					Editar
				</Button>
				<Button
					color="red"
					labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
					mode="contained"
					icon="delete"
					style={{ width: '96%' }}
					onPress={AlertDelete}
					loading={loadinOnDelete}
				>
					Apagar
				</Button>
			</Actions>
		</MainArea>
	);
};
