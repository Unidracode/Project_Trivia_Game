import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { click } from '@testing-library/user-event/dist/click';

describe('Testes de login.', () => {
    it('1 - Testa se os compontentes estão sendo renderizados.', () => {
        renderWithRouterAndRedux(<App />);
        const inputName = screen.getByPlaceholderText('Nome');
        expect(inputName).toBeInTheDocument()
        const inputEmail = screen.getByPlaceholderText('Email');
        expect(inputEmail).toBeInTheDocument()
        const playButton = screen.getByRole('button', { name: 'Play' });
        expect(playButton).toBeInTheDocument()
        const configButton = screen.getByRole('button', { name: 'Configurações' });
        expect(configButton).toBeInTheDocument()
    })
    it('2 - Testa se o Botão Play só habilita com os dois campos preenchidos.', () => {
        renderWithRouterAndRedux(<App />);
        const inputName = screen.getByPlaceholderText('Nome');
        const inputEmail = screen.getByPlaceholderText('Email');
        const playButton = screen.getByRole('button', { name: 'Play' });
        userEvent.type(inputName, 'Simulação de Nome')
        expect(playButton).toBeDisabled()
        userEvent.type(inputEmail, 'Simulação de Email')
        expect(playButton).toBeEnabled()
    })
    it('3 - Testa se o Botão play leva para o local desejado.', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByPlaceholderText('Nome');
        const inputEmail = screen.getByPlaceholderText('Email');
        const playButton = screen.getByRole('button', { name: 'Play' });
        userEvent.type(inputName, 'Simulação de Nome');
        userEvent.type(inputEmail, 'Simulação de Email');
        userEvent.click(playButton);
        await waitFor(() => {
          expect(history.location.pathname).toBe('/game');
        })
    })
    it('4 - Testa se o Botão Configurações leva para o local desejado.', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const configButton = screen.getByRole('button', { name: 'Configurações' });
        userEvent.click(configButton);
        expect(history.location.pathname).toBe('/settings');
    })
})