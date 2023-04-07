import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
import { AppBar } from 'Components/AppBar';
import { IUser } from 'Interfaces';

import { Container, Controls, Inputs } from './styles';
import { Button, Checkbox } from 'react-native-paper';
import { Input } from 'Components/Input';
import { Error, Success, Warning } from 'Components/Notify';
import { UserModel } from 'Model/UserModel';
import { TextInputSecure } from 'Components/TextInputSecure';
import { delay } from 'Utils';

export interface IUserForm {
	onChange: (user: IUser) => void;
}

export interface IUserFormHandles {
	open: () => void;
	close: () => void;
	edit: (user: IUser) => void;
}

const UserForm: React.ForwardRefRenderFunction<IUserFormHandles, IUserForm> = (
	{ onChange }: IUserForm,
	ref,
) => {
	const [data, setData] = React.useState<IUser[]>([]);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [updateUser, setUpdateUser] = React.useState<string>('');
	const [loadingOnSaving, setLoadingOnSaving] = React.useState<boolean>(false);

	const schema = yup.object().shape({
		name: yup.string().required('Nome é obrigatório'),
		email: yup.string().email('Email inválido').required('Email é obrigatório'),
		password: yup.string().required('Campo obrigatório'),
		active: yup.boolean(),
	});

	const { setFieldValue, resetForm, handleSubmit, errors, values } = useFormik({
		validationSchema: schema,
		validateOnChange: false,
		validateOnBlur: false,
		initialValues: {
			name: '',
			email: '',
			password: '',
			active: true,
		},
		onSubmit: async values => {
			try {
				setLoadingOnSaving(true);
				const refUser = {
					id: '',
					name: values.name,
					email: values.email,
					active: values.active,
					password: values.password,
				} as IUser;

				const address = new UserModel(refUser);

				if (updateUser !== '') {
					let updated = await address.update(updateUser);

					if (updated !== null) {
						const users = data.map(e =>
							e.id === updateUser && updated !== null ? updated : e,
						);
						setData(users);
						resetForm();
						setUpdateUser('');
						Success('Usuário atualizado com sucesso.');
						await delay(1000);
						onChange(updated);
						setModalOpen(false);
						setLoadingOnSaving(false);
					}
				} else {
					let created = await address.create();
					if (created) {
						setData([...data, created]);
						resetForm();
						setUpdateUser('');
						Success('Usuário criado com sucesso.');
						await delay(1000);
						onChange(created);
						setLoadingOnSaving(false);
						setModalOpen(false);
					}
				}
			} catch (error: any) {
				Error('Erro ao executar ' + error.message);
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
		edit: (user: IUser) => {
			setUpdateUser(user?.id);
			setFieldValue('name', user?.name);
			setFieldValue('email', user?.email);
			setFieldValue('password', user?.password);
			setFieldValue('active', user?.active);
			handleOpen();
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
					title="Cadastrar Usuário"
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
					<TextInputSecure
						name="password"
						label="Senha"
						value={values.password}
						onChange={handleChangeValue}
						onError={errors.password}
					/>

					<Checkbox.Item
						style={{
							marginTop: -3,
							marginLeft: -25,
						}}
						labelStyle={{ fontFamily: 'Marvel-Regular' }}
						label="Ativo"
						status={values.active ? 'checked' : 'unchecked'}
						onPress={() => setFieldValue('active', !values.active)}
						position="leading"
					/>
				</Inputs>
				<Controls>
					<Button
						labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
						mode="contained"
						icon="account-multiple-check"
						style={{ width: 120 }}
						loading={loadingOnSaving}
						onPress={handleSubmit}
					>
						{updateUser === '' ? 'Cadatrar' : 'Atualizar'}
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
export default React.forwardRef(UserForm);
