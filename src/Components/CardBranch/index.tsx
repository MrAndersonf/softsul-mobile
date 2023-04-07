import React from 'react';
import axios from 'service/axios';
import {
	MainArea,
	InfoArea,
	Name,
	Line,
	Status,
	Actions,
	Centered,
	Section,
	SectionText,
} from './style';
import Icon from 'react-native-vector-icons/Entypo';
import { IBranch } from 'Interfaces';
import { Button, Divider } from 'react-native-paper';
import { Alert } from 'react-native';
import { Error, Success } from 'Components/Notify';
import { cepMask, delay } from 'Utils';
import { useNavigation } from '@react-navigation/native';
import OpenMap from 'react-native-open-maps';

interface ICardBranch {
	data: IBranch;
	onDelete: (id: string) => void;
	onEdit: (branch: IBranch) => void;
}

export const CardBranch = ({ data, onDelete, onEdit }: ICardBranch) => {
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
						const response = await axios.delete(`/api/branch/${data.id}`);
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

	const handleOpenMap = () => {
		OpenMap({
			latitude: Number(data?.lat),
			longitude: Number(data?.long),
			zoom: 15,
			provider: 'google',
			navigate: true,
			end: `${data?.address?.street}, ${data?.address?.number}, ${data?.address?.neighborhood}, ${data?.address?.city} - ${data?.address?.state}`,
		});
	};

	return (
		<MainArea>
			<InfoArea>
				<Centered>
					<Divider
						style={{
							display: 'flex',
							alignSelf: 'center',
							backgroundColor: '#000',
							width: '96%',
						}}
					/>
					<Section>
						<SectionText>Filial</SectionText>
					</Section>
				</Centered>
				<Line>
					<Icon
						name="users"
						color="#000"
						size={20}
						style={{ paddingRight: 5, paddingLeft: 5 }}
					/>
					<Name>{data?.name}</Name>
				</Line>
				<Centered>
					<Divider
						style={{
							display: 'flex',
							alignSelf: 'center',
							backgroundColor: '#000',
							width: '96%',
						}}
					/>
					<Section>
						<SectionText>Contato</SectionText>
					</Section>
				</Centered>
				<Line>
					<Icon
						name="email"
						color="#000"
						size={20}
						style={{ paddingRight: 5, paddingLeft: 5 }}
					/>
					<Name>{data?.email}</Name>
				</Line>

				<Centered>
					<Divider
						style={{
							display: 'flex',
							alignSelf: 'center',
							backgroundColor: '#000',
							width: '96%',
						}}
					/>
					<Section>
						<SectionText>Endereço</SectionText>
					</Section>
				</Centered>
				<Line>
					<Icon
						name="pin"
						color="#000"
						size={20}
						style={{ paddingRight: 5, paddingLeft: 5 }}
					/>
					<Name>
						{data?.address?.street} - {data?.address?.number}
					</Name>
				</Line>
				<Line>
					<Icon
						name="pin"
						color="#000"
						size={20}
						style={{ paddingRight: 5, paddingLeft: 5 }}
					/>
					<Name>
						{data?.address?.neighborhood} - {cepMask(data?.address?.zipcode)}
					</Name>
				</Line>
				<Line>
					<Icon
						name="pin"
						color="#000"
						size={20}
						style={{ paddingRight: 5, paddingLeft: 5 }}
					/>
					<Name>
						{data?.address?.city} - {data?.address?.state}
					</Name>
				</Line>
				<Centered>
					<Divider
						style={{
							display: 'flex',
							alignSelf: 'center',
							backgroundColor: '#000',
							width: '96%',
						}}
					/>
					<Section>
						<SectionText>Situação</SectionText>
					</Section>
				</Centered>
				<Line>
					<Icon
						name="check"
						color="#000"
						size={20}
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
					icon="account-multiple-check"
					style={{ width: 120, elevation: 6 }}
					onPress={() => onEdit(data)}
				>
					Editar
				</Button>
				<Button
					color="red"
					labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
					mode="contained"
					icon="delete"
					style={{ width: 120, elevation: 6 }}
					onPress={AlertDelete}
					loading={loadinOnDelete}
				>
					Apagar
				</Button>
				<Button
					color="green"
					labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
					mode="contained"
					icon="map-marker-radius-outline"
					style={{ width: 120, elevation: 6 }}
					onPress={handleOpenMap}
				>
					Mapa
				</Button>
			</Actions>
		</MainArea>
	);
};
