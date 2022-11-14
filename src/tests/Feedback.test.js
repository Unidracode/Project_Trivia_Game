import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testes de Feedback', () => {
  it('1', () => {
      renderWithRouterAndRedux(<Feedback />);
      const feedbackText = screen.getByTestId('feedback-text')
      expect(feedbackText).toBeInTheDocument()
      const feedbackScore = screen.getByTestId('feedback-total-score')
      expect(feedbackScore).toBeInTheDocument()
      const feedbackQuestion = screen.getByTestId('feedback-total-question')
      expect(feedbackQuestion).toBeInTheDocument()
      const profilePicture = screen.getByTestId('header-profile-picture')
      expect(profilePicture).toBeInTheDocument()
      const playerName = screen.getByTestId('header-player-name');
      expect(playerName).toBeInTheDocument()
      const headerScore = screen.getByTestId('header-score')
      expect(headerScore).toBeInTheDocument()
  })
  it('2', () => {
      const { history } = renderWithRouterAndRedux(<Feedback />);
      const playAgainButton = screen.getByRole('button', { name: 'Play Again' });
      console.log(playAgainButton);
      expect(playAgainButton).toBeInTheDocument()
      userEvent.click(playAgainButton)
      expect(history.location.pathname).toBe('/')
  })
  it('3', async () => {
      const { history } = renderWithRouterAndRedux(<Feedback />);
      const rankingButton = screen.getByRole('button', { name: 'Ranking' });
      expect(rankingButton).toBeInTheDocument()
      userEvent.click(rankingButton)
      expect(history.location.pathname).toBe('/ranking')
  })
})