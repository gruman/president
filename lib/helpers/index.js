
export {deal, wrapPlayers, getInitialPlayer} from './start';
export {validatePlay, getValidPlays} from './validate';
export {execute} from './execute';
export {next} from './next';
export {view} from './view';

export function reduceMultiples(cards) {
  if (cards.length === 0) return 0;
  return cards.reduce((a, b) => (
    parseInt(a) === parseInt(b) ? parseInt(a) : 0
  ));
}

export function getValue(card) {
  card = Array.isArray(card) ? reduceMultiples(card) : card;
  return parseInt(card);
}

export function hasCard(hand, card) {
  return hand.indexOf(card) !== -1;
}

export function hasCards(hand, cards) {
  let valid = true;
  cards.forEach(card => {
    valid = hasCard(hand, card);
  });
  return valid;
}

export function gameIsStale(state) {
  return state.passCount >= state.players.length;
}

export function currentCards(state) {
  if (gameIsStale(state)) return [];

  const event = state.events[state.events.length - 1];
  return event ? event.play : [];
}

export function previousCards(state) {
  const event = state.events[state.events.length - 2];
  return event ? event.play : [];
}

export function createGameOver(max = 10) {
  var calls = 0;
  return function gameOver(state) {
    if (calls > max) {
      throw new Error('[invalid] Game exceeded max length');
    } else {
      calls += 1;
      return state.players.length === 0;
    }
  };
}

export function currentPlayer(state) {
  return state.players[state.player].playerId;
}

export function getPlayerHand(state) {
  return state.hands[state.player];
}

export function results(state) {
  return {
    winner: state.rank[0],
    rank: state.rank,
    events: state.events
  };
}
