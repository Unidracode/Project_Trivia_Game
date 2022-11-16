import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const playTrivia = async () => {
  
  await waitFor(
    () => expect(screen.queryByTestId('correct-answer')).toBeInTheDocument(),
    { timeout: 3000 }
  );

    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);
}

describe('testes do game', () => {
  it('1', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const playButton = screen.getByRole('button', { name: 'Play' });

    userEvent.type(inputName, 'tryber');
    userEvent.type(inputEmail, 'tryber@teste.com');
    userEvent.click(playButton);

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 2000);
    });

    await playTrivia()
    .then(async () => await playTrivia())
    .then(async () => await playTrivia())
    .then(async () => await playTrivia())
    .then(async () => await playTrivia())

    expect(history.location.pathname).toBe('/feedback');

  })
  it('2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const playButton = screen.getByRole('button', { name: 'Play' });

    userEvent.type(inputName, 'tryber');
    userEvent.type(inputEmail, 'tryber@teste.com');
    userEvent.click(playButton);

    await new Promise((response) => {
      setTimeout(() => {
          response();
      }, 2000);
  });

    expect(screen.getByRole('img', { name: /foto do usuário/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /tryber/i })).toBeInTheDocument();

    
  })
})

// screen.getByRole('img', {  name: /foto do usuário/i})
// screen.getByRole('heading', {  name: /marcello/i})
//
