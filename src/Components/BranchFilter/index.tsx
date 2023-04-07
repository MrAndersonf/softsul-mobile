import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
import { AppBar } from 'Components/AppBar';
import axios from 'service/axios';
import { IBranch } from 'Interfaces';
import { Container, Controls, Inputs } from './styles';
import { Button, Checkbox } from 'react-native-paper';
import { Input } from 'Components/Input';
import { Error, Warning } from 'Components/Notify';
import { cnpjMask, retrieveCitiesByState, sanitize, states } from 'Utils';
import { ISelecterOptList, Selecter } from 'Components/Selecter';
import { ISectionListProps } from 'native-base/lib/typescript/components/basic/SectionList/types';

export interface IBranchFilter {
	onFilter: (filter: IBranch[]) => void;
}

export interface IBranchFilterHandles {
	open: () => void;
	close: () => void;
}

const BranchFilter: React.ForwardRefRenderFunction<
	IBranchFilterHandles,
	IBranchFilter
> = ({ onFilter }: IBranchFilter, ref) => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [showDropDown, setShowDropDown] = React.useState(false);
	const [gender, setGender] = React.useState<string>('');
	const [cities, setCities] = React.useState<ISelecterOptList[]>([]);
	const [loadingOnSearch, setLoadingOnSearch] = React.useState<boolean>(false);

	const schema = yup.object().shape({
		name: yup.string(),
		city: yup.string(),
		state: yup.string(),
		cnpj: yup.string().max(18),
		active: yup.boolean(),
	});

	const { setFieldValue, handleChange, handleSubmit, errors, values } =
		useFormik({
			validationSchema: schema,
			initialValues: {
				cnpj: '',
				name: '',
				city: '',
				state: '',
				active: true,
			},
			onSubmit: async values => {
				const { cnpj, name, city, state, active } = values;
				try {
					setLoadingOnSearch(true);

					const response = await axios.post('/api/branch/filter', {
						cnpj: sanitize(cnpj).substring(0, 14),
						name,
						city,
						state,
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
					title="Filtrar Filiais"
					backHandle={() => setModalOpen(false)}
				/>

				<Inputs>
					<Input
						name="cnpj"
						label="CNPJ"
						value={cnpjMask(values.cnpj)}
						onChange={handleChangeValue}
						onError={errors.cnpj}
					/>
					<Input
						name="name"
						label="Nome do Usuário"
						value={values.name}
						onChange={handleChangeValue}
						onError={errors.name}
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
						label="Somentes filiais ativas"
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
export default React.forwardRef(BranchFilter);
