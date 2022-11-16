import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';


const playTrivia = async () => {
  //Função feita com a ajuda de Melquisedeque e Guilherme Patrick do grupo 21
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);
}

describe('teste do timer', () => {
  
  jest.setTimeout(45000);

it('1', async () => {
  renderWithRouterAndRedux(<App />);
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


  await waitFor( () => {
    const timer = screen.queryByTestId('timer')
    expect(timer.innerText).toBe('0');
    }, {timeout: 40000});


})

})

describe('teste map', () => {
  jest.setTimeout(45000);
    it('4', async () => {
      renderWithRouterAndRedux(<App />);
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
  
      const rankingButton = screen.getByRole('button', {  name: /ranking/i});
      
      userEvent.click(rankingButton);
  
      const playerMap = screen.getByTestId('player-name-0');
      expect(playerMap).toBeInTheDocument();
      expect(screen.getByText('tryber')).toBeInTheDocument()
    })
})

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

  it('3', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ rates: { "response_code": 3, "results": [] } }),
  })
);

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

expect(history.location.pathname).toBe('/');
  })

  it('4', async () => {
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

    const wrongAnswerButton = await screen.findByTestId('wrong-answer-0');
    expect(wrongAnswerButton).toBeInTheDocument();

    userEvent.click(wrongAnswerButton)
    
    expect(await screen.findByTestId('btn-next')).toBeInTheDocument()
  })
})