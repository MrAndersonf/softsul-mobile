import React from 'react';
import { Area, Title } from './style';

interface IPageTag {
	label: string;
	padding?: number | undefined;
}

export const PageTag = ({ label }: IPageTag) => {
	return (
		<Area>
			<Title>{label}</Title>
		</Area>
	);
};
