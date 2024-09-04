import { makeScene2D, Rect } from '@motion-canvas/2d';
import PokerCard from './PokerCard';
import Hand from './Hand';
import Board from './Board';
import { waitFor } from '@motion-canvas/core';
import capsAndHammers from "./capsAndHammers/package";
import {all, createRef,tween, range, easeInOutCubic, Vector2 } from '@motion-canvas/core';
const ratio = 0.5;
const width = 750 * ratio;
const height = 1125 * ratio;
function createPokerCard(image) {
  return new PokerCard(image, image, width/3, height/3, false, false);
}

export default makeScene2D(function* (view) {
  view.add(
    <Rect
      width={2000}
      height={2000}
      fill="#282c34"
    />,
  );
  
  var spaceRace = new PokerCard(capsAndHammers.countries.spaceRace, capsAndHammers.countries.back, width/3, height/3, false, true);
  var dmz = new PokerCard(capsAndHammers.countries.dmz, capsAndHammers.countries.back, width/3, height/3, false, true);
  var jungleWarfare = new PokerCard(capsAndHammers.countries.jungleWarfare, capsAndHammers.countries.back, width/3, height/3, false, true);
  var peaceConference = new PokerCard(capsAndHammers.countries.peaceConference, capsAndHammers.countries.back, width/3, height/3, false, true);
  var countriesBack = new PokerCard(capsAndHammers.countries.back, capsAndHammers.countries.back, width/3, height/3, false, true);
  var capsDeck = new PokerCard(capsAndHammers.actionCaps.back, capsAndHammers.actionCaps.back, width/3, height/3, false, true);
  var hammersDeck = new PokerCard(capsAndHammers.hammersAction.back, capsAndHammers.hammersAction.back, width/3, height/3, false, true);
  
  const cardsGrid = [
    [null, null, null, null, null, ],
    [null, null, null, null, hammersDeck],
    [jungleWarfare, peaceConference, dmz, spaceRace, countriesBack],
    [null, null, null, null, capsDeck],
    [null, null, null, null, null, ]
  ]
  const board = new Board(cardsGrid, 0, 0, height/3, height/3);
    
  
  const cards = [
    new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.admiral, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.soldier, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.diplomat, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.spy, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.nuke, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.guerrilla, capsAndHammers.actionCaps.back, width, height),
  ]
  const hand = new Hand(cards, 0, 900);
  
  view.add(board.render());
  yield* board.arrangeCards(0);
  yield* all(...cardsGrid.flat().filter(card => card !== null).map((card) => card.applyInitialState()))
  view.add(hand.render());
  yield* hand.arrangeFan()
  yield* board.cameraRef().zoom(1.5,0)
  yield* waitFor(1.5);
  yield* hand.moveHand(0, 400, 0.5, easeInOutCubic)
  yield* waitFor(1);
  
  yield* hand.highlightCard(cards[4], 0.6, easeInOutCubic)
  yield* hand.highlightCard(cards[5], 0.6, easeInOutCubic)
  yield* hand.highlightCard(cards[6], 0.6, easeInOutCubic)
  yield* waitFor(2);
  
  yield* all(
    hand.moveHand(0, 900, 1, easeInOutCubic),
    board.cameraRef().rotation(90, 1, easeInOutCubic),
    board.cameraRef().zoom(4, 1, easeInOutCubic),
    board.cameraRef().position.x(-400, 1, easeInOutCubic)
  )
  yield* board.cameraRef().position.x(-200, 1, easeInOutCubic)
  yield* board.cameraRef().position.x(0, 1, easeInOutCubic)
  yield* waitFor(0.5);
});

