import React from 'react';
import { SafeArea } from './styles';

interface IContainer {
	children: React.ReactNode;
}

export const Container = ({ children }: IContainer) => {
	return <SafeArea>{children}</SafeArea>;
};
