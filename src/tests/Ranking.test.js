import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('testes ranking', () => {
  it('1', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    userEvent.click(screen.getByRole('button', { name: /ranking/i }));
    expect(history.location.pathname).toBe('/ranking');

    const rankingTitle = screen.getByRole('heading', { name: /ranking/i});
    expect(rankingTitle).toBeInTheDocument();

    const gravatarImage = screen.getByRole('img', { name: /player/i});
    expect(gravatarImage).toBeInTheDocument();

    const rankingScore = screen.getByRole('heading', { name: /0/i});
    expect(rankingScore).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /início/i});
    expect(homeButton).toBeInTheDocument();

    userEvent.click(homeButton)

    expect(history.location.pathname).toBe('/');
  })
})

// const { history } = renderWithRouterAndRedux(<App />);
// act(() => history.push('/feedback'));
// userEvent.click(screen.getByRole('button', { name: /ranking/i }))
// expect(history.location.pathname).toBe('/ranking')