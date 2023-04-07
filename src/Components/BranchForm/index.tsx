import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
import { AppBar } from 'Components/AppBar';

import { IAddress, IBranch } from 'Interfaces';

import { Container, Controls, Inputs } from './styles';
import { Button, Checkbox } from 'react-native-paper';
import { Input } from 'Components/Input';
import { Error, Success, Warning } from 'Components/Notify';
import { BranchModel } from 'Model/BranchModel';
import { TextInputSecure } from 'Components/TextInputSecure';
import { cepMask, cepRegex, cnpjMask, cnpjRegex, delay, sanitize } from 'Utils';
import { AddressModel } from 'Model/AddressModel';
import { InputSearch } from 'Components/InputSearch';
import { Status } from 'Components/Status';
import { ScrollView } from 'react-native';
import axios from 'axios';

export interface IBranchForm {
	onChange: (user: IBranch) => void;
}

export interface IBranchFormHandles {
	open: () => void;
	close: () => void;
	edit: (user: IBranch) => void;
}

const BranchForm: React.ForwardRefRenderFunction<
	IBranchFormHandles,
	IBranchForm
> = ({ onChange }: IBranchForm, ref) => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [updateBranch, setUpdateBranch] = React.useState<string>('');
	const [updateAddress, setUpdateAddress] = React.useState<string>('');
	const [loadingOnSaving, setLoadingOnSaving] = React.useState<boolean>(false);

	const schema = yup.object().shape({
		name: yup.string().required('Campo obrigatório'),
		street: yup.string().required('Campo obrigatório'),
		zip: yup
			.string()
			.required('Campo obrigatório')
			.matches(cepRegex, 'Formato inválido.'),
		complement: yup.string().nullable(),
		neighborhood: yup.string().required('Campo obrigatório'),
		number: yup.string().required('Campo obrigatório'),
		city: yup.string().required('Campo obrigatório'),
		state: yup.string().required('Campo obrigatório'),

		lat: yup.string().required('Campo obrigatório'),
		long: yup.string().required('Campo obrigatório'),

		cnpj: yup
			.string()
			.required('Campo obrigatório')
			.matches(cnpjRegex, 'Formato inválido')
			.max(18),
		active: yup.boolean(),
	});

	const { setFieldValue, resetForm, handleSubmit, errors, values } = useFormik({
		validationSchema: schema,
		validateOnChange: false,
		validateOnBlur: false,
		initialValues: {
			cnpj: '',
			name: '',
			street: '',
			number: '',
			complement: '',
			zip: '',
			neighborhood: '',
			city: '',
			state: '',
			active: true,
			lat: '',
			long: '',
			email: '',
			reference: '',
		},
		onSubmit: async values => {
			try {
				setLoadingOnSaving(true);
				const refAddress = {
					id: '',
					city: values.city,
					complement: values.complement,
					neighborhood: values.neighborhood,
					number: values.number,
					state: values.state,
					street: values.street,
					zipcode: sanitize(values.zip),
					reference: values.reference,
				} as IAddress;

				const address = new AddressModel(refAddress);
				let updated;
				if (updateAddress !== '') {
					updated = await address.update(updateAddress);
				} else {
					updated = await address.create();
				}

				if (updated !== null) {
					const branch = new BranchModel(
						values.name,
						sanitize(values.cnpj),
						values.email,
						updated?.id,
						values.lat,
						values.long,
						values.active,
					);

					if (updateBranch !== '') {
						const branchUpdated = await branch.update(updateBranch);
						if (branchUpdated) {
							Success('Filial atualizada com sucesso!');
							onChange(branchUpdated);
						}
					} else {
						const newBranch = await branch.create();
						if (newBranch) {
							Success('Filial criada com sucesso!');
							onChange(newBranch);
						}
					}

					resetForm();
					setUpdateBranch('');
					setUpdateAddress('');
					setModalOpen(false);
					setLoadingOnSaving(false);
				}
			} catch (error: any) {
				Error('Erro ao executar ' + error);
				setLoadingOnSaving(false);
			}
		},
	});

	const handleClose = () => {
		resetForm();
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
		edit: (user: IBranch) => {
			setUpdateBranch(user?.id);
			setUpdateAddress(user?.addressId);
			setFieldValue('name', user?.name);
			setFieldValue('cnpj', user?.cnpj);
			setFieldValue('email', user?.email);
			setFieldValue('lat', user?.lat);
			setFieldValue('long', user?.long);
			setFieldValue('active', user?.active);
			setFieldValue('street', user?.address?.street);
			setFieldValue('number', user?.address?.number);
			setFieldValue('complement', user?.address?.complement);
			setFieldValue('zip', user?.address?.zipcode);
			setFieldValue('neighborhood', user?.address?.neighborhood);
			setFieldValue('city', user?.address?.city);
			setFieldValue('state', user?.address?.state);
			setFieldValue('reference', user?.address?.reference);
			handleOpen();
		},
	}));

	const handleChangeValue = (field: string, value: string) => {
		setFieldValue(field, value);
	};

	const handleOnSearch = async (cnpj: string) => {
		try {
			if (cnpj === '') {
				Warning('CNPJ não pode estar vazio!');
				return;
			}

			if (cnpj.length < 18 || cnpj.length > 18 || !cnpjRegex.test(cnpj)) {
				Warning('CNPJ com formato inválido!');
				return;
			}
			const response = await axios.get(
				`https://www.receitaws.com.br/v1/cnpj/${sanitize(cnpj)}`,
			);

			if (response.status === 200 && response.data) {
				setFieldValue('name', response?.data?.nome);
				setFieldValue('street', response?.data?.logradouro);
				setFieldValue('number', response?.data?.numero);
				setFieldValue('complement', response?.data?.complemento);
				setFieldValue('zip', response?.data?.cep);
				setFieldValue('neighborhood', response?.data?.bairro);
				setFieldValue('city', response?.data?.municipio);
				setFieldValue('state', response?.data?.uf);
				Success('Dados preenchidos com sucesso!');
			}
			Warning('Informação não encontrada!');
		} catch (error: any) {
			Error('Erro ao executar ' + error);
		}
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
					title="Cadastrar Filial"
					backHandle={() => setModalOpen(false)}
				/>

				<ScrollView style={{ width: '100%' }}>
					<Inputs>
						<InputSearch
							name="cnpj"
							label="CNPJ"
							value={cnpjMask(values.cnpj)}
							onChange={handleChangeValue}
							onError={errors.cnpj}
							onSearch={handleOnSearch}
						/>
						<Input
							name="name"
							label="Nome"
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
						<Input
							name="zip"
							label="CEP"
							value={cepMask(values.zip)}
							onChange={handleChangeValue}
							onError={errors.zip}
						/>
						<Input
							name="street"
							label="Logradouro"
							value={values.street}
							onChange={handleChangeValue}
							onError={errors.street}
						/>
						<Input
							name="number"
							label="Número"
							value={values.number}
							onChange={handleChangeValue}
							onError={errors.number}
						/>
						<Input
							name="reference"
							label="Referência"
							value={values.reference}
							onChange={handleChangeValue}
							onError={errors.reference}
						/>
						<Input
							name="neighborhood"
							label="Bairro"
							value={values.neighborhood}
							onChange={handleChangeValue}
							onError={errors.neighborhood}
						/>
						<Input
							name="complement"
							label="Complemento"
							value={values.complement}
							onChange={handleChangeValue}
							onError={errors.complement}
						/>
						<Input
							name="city"
							label="Cidade"
							value={values.city}
							onChange={handleChangeValue}
							onError={errors.city}
						/>
						<Input
							name="state"
							label="Estado"
							value={values.state}
							onChange={handleChangeValue}
							onError={errors.state}
						/>

						<Checkbox.Item
							style={{
								marginTop: -3,
								marginLeft: -25,
							}}
							labelStyle={{ fontFamily: 'Marvel-Regular' }}
							label="Ativa"
							status={values.active ? 'checked' : 'unchecked'}
							onPress={() => setFieldValue('active', !values.active)}
							position="leading"
						/>
					</Inputs>
				</ScrollView>
				<Controls>
					<Button
						labelStyle={{ fontFamily: 'Marvel-Regular', textTransform: 'none' }}
						mode="contained"
						icon="account-multiple-check"
						style={{ width: 120 }}
						loading={loadingOnSaving}
						onPress={handleSubmit}
					>
						{updateBranch === '' ? 'Cadatrar' : 'Atualizar'}
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
export default React.forwardRef(BranchForm);
