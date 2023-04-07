import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
import { AppBar } from 'Components/AppBar';
import axios from 'service/axios';
import { IUser } from 'Interfaces';

import { Container, Controls, Inputs } from './styles';
import { Button, Checkbox } from 'react-native-paper';
import { Input } from 'Components/Input';
import { Error, Warning } from 'Components/Notify';

export interface IUserFilter {
	onFilter: (filter: IUser[]) => void;
}

export interface IUserFilterHandles {
	open: () => void;
	close: () => void;
}

const UserFilter: React.ForwardRefRenderFunction<
	IUserFilterHandles,
	IUserFilter
> = ({ onFilter }: IUserFilter, ref) => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [loadingOnSearch, setLoadingOnSearch] = React.useState<boolean>(false);

	const schema = yup.object().shape({
		name: yup.string(),
		email: yup.string(),
		active: yup.boolean(),
	});

	const { setFieldValue, handleChange, handleSubmit, errors, values } =
		useFormik({
			validationSchema: schema,
			initialValues: {
				name: '',
				email: '',
				active: true,
			},
			onSubmit: async values => {
				const { email, name, active } = values;
				try {
					setLoadingOnSearch(true);

					const response = await axios.post('/api/user/filter', {
						name,
						email,
						active,
					});

					if (response.data.length === 0) {
						Warning('Nenhum resultado encontrado');
						onFilter([]);
						setLoadingOnSearch(false);
						return;
					}
					setLoadingOnSearch(false);
					onFilter(response.data);
					setModalOpen(false);
				} catch (error: any) {
					Error(error.message);
					setLoadingOnSearch(false);
				}
			},
		});

	const handleClose = () => {
		setModalOpen(false);
	};

	const handleOpen = () => {
		setModalOpen(true);
	};

	React.useImperativeHandle(ref, () => ({
		open: () => {
			handleOpen();
		},
		close: () => {
			handleClose();
		},
	}));

	const handleChangeValue = (field: string, value: string) => {
		setFieldValue(field, value);
	};

	return (
		<Modal
			renderToHardwareTextureAndroid
			animationIn="slideInLeft"
			animationInTiming={400}
			animationOutTiming={400}
			animationOut={'slideOutRight'}
			isVisible={modalOpen}
			style={{
				width: '100%',
				height: 400,
				margin: 0,
				justifyContent: 'flex-start',
			}}
		>
			<Container>
				<AppBar
					title="Filtrar Usuários"
					backHandle={() => setModalOpen(false)}
				/>

				<Inputs>
					<Input
						name="name"
						label="Nome do Usuário"
						value={values.name}
						onChange={handleChangeValue}
						onError={errors.name}
					/>
					<Input
						name="email"
						label="E-mail do Usuário"
						value={values.email}
						onChange={handleChangeValue}
						onError={errors.email}
					/>

					<Checkbox.Item
						style={{
							marginTop: -3,
							marginLeft: -25,
						}}
						labelStyle={{ fontFamily: 'Marvel-Regular' }}
						label="Somentes usuários ativos"
						status={values.active ? 'checked' : 'unchecked'}
						onPress={() => setFieldValue('active', !values.active)}
						position="leading"
					/>
				</Inputs>
				<Controls>
					<Button
						labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
						mode="contained"
						icon="account-search"
						style={{ width: 120 }}
						loading={loadingOnSearch}
						onPress={handleSubmit}
					>
						Buscar
					</Button>
					<Button
						labelStyle={{
							fontFamily: 'Marvel-Regular',
							textTransform: 'none',
						}}
						style={{ width: 120 }}
						mode="contained"
						icon="close"
						color="#E74C3C"
						onPress={handleClose}
					>
						Cancelar
					</Button>
				</Controls>
			</Container>
		</Modal>
	);
};
export default React.forwardRef(UserFilter);
