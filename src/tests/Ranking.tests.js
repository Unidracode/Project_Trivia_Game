import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('testes ranking', () => {
  it('1', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    userEvent.click(screen.getByRole('button', { name: /ranking/i }))
    expect(history.location.pathname).toBe('/ranking')
  })
})