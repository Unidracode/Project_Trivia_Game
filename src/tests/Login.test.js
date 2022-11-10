import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes de login.', () => {
    it('1', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByPlaceholderText('Nome');
        expect(inputName).toBeInTheDocument()
        const inputEmail = screen.getByPlaceholderText('Email');
        expect(inputEmail).toBeInTheDocument()
        const playButton = screen.getByRole('button',{ name:'Play' });
        expect(playButton).toBeInTheDocument()
        const configButton = screen.getByRole('button',{ name:'Configurações' });
        expect(configButton).toBeInTheDocument()
    })
})
