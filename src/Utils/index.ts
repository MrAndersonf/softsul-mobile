import axios from 'axios';

export const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
};

export const validatePass = (pass: string) => {
	return pass.length > 4;
};

export const delay = (milliseconds: number) => {
	return new Promise((resolve: any) => {
		setTimeout(resolve, milliseconds);
	});
};

export const sanitize = (raw: string) => {
	return raw.replace(/[^a-zA-Z0-9 ]/g, '').replace(',', '');
};

export const cnpjMask = (text: string | undefined) => {
	if (text !== undefined) {
		return text
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d)/, '$1.$2')
			.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
			.replace(/\.(\d{3})(\d)/, '.$1/$2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(-\d{2})(\d)/, '$1')
			.substring(0, 18);
	}
	return '';
};

export const states = [
	{ code: 12, name: 'Acre' },
	{ code: 27, name: 'Alogoas' },
	{ code: 13, name: 'Amazonas' },
	{ code: 16, name: 'Amapá' },
	{ code: 29, name: 'Bahia' },
	{ code: 23, name: 'Ceará' },
	{ code: 53, name: 'Distrito Federal' },
	{ code: 32, name: 'Espírito Santo' },
	{ code: 52, name: 'Goiás' },
	{ code: 21, name: 'Maranhão' },
	{ code: 31, name: 'Minas Gerais' },
	{ code: 50, name: 'Mato Grosso do Sul' },
	{ code: 51, name: 'Mato Grosso' },
	{ code: 15, name: 'Pará' },
	{ code: 25, name: 'Paraíba' },
	{ code: 26, name: 'Pernambuco' },
	{ code: 22, name: 'Piauí' },
	{ code: 41, name: 'Paraná' },
	{ code: 33, name: 'Rio de Janeiro' },
	{ code: 24, name: 'Rio Grande do Norte' },
	{ code: 11, name: 'Rondônia' },
	{ code: 14, name: 'Roraima' },
	{ code: 43, name: 'Rio Grando do Sul' },
	{ code: 42, name: 'Santa Catarina' },
	{ code: 28, name: 'Sergipe' },
	{ code: 35, name: 'São Paulo' },
	{ code: 17, name: 'Tocantins' },
];

export const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;

export const cnpjRegex =
	/^(([0-9]{2}.[0-9]{3}.[0-9]{3}\/[0-9]{4}-[0-9]{2})|([0-9]{14}))$/;

export const retrieveCitiesByState = async (state: number | undefined) => {
	try {
		if (state === undefined) {
			return [];
		}
		const response = await axios.get(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
		);
		if (response.status === 200 && response.data.length > 0) {
			return response.data;
		}
		return [];
	} catch (error) {
		Error('Erro ao buscar cidades');
	}
};

export const cepMask = (text: string | undefined) => {
	if (text !== undefined) {
		return text
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1-$2')
			.replace(/(-\d{3})\d+?$/, '$1');
	}
	return '';
};
