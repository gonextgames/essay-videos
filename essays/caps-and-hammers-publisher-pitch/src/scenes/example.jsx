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
    [null, createPokerCard(capsAndHammers.hammersAction.back), createPokerCard(capsAndHammers.hammersAction.back), null, null],
    [createPokerCard(capsAndHammers.hammersAction.back), createPokerCard(capsAndHammers.hammersAction.back), createPokerCard(capsAndHammers.hammersAction.back), createPokerCard(capsAndHammers.hammersAction.back), hammersDeck],
    [peaceConference, jungleWarfare, dmz, spaceRace, countriesBack],
    [createPokerCard(capsAndHammers.actionCaps.back), createPokerCard(capsAndHammers.actionCaps.back), createPokerCard(capsAndHammers.actionCaps.back), createPokerCard(capsAndHammers.actionCaps.back), capsDeck],
    [null, createPokerCard(capsAndHammers.actionCaps.back), createPokerCard(capsAndHammers.actionCaps.back), null, null]
  ]
  const board = new Board(cardsGrid, 0, 0, height/3, height/3);
    
  
  const cards = [
    new PokerCard(capsAndHammers.actionCaps.diplomat, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.spy, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.nuke, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.admiral, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.soldier, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.guerrilla, capsAndHammers.actionCaps.back, width, height)
  ]
  const hand = new Hand(cards, 0, 400);
  
  view.add(board.render());
  yield* board.arrangeCards(0);
  yield* all(...cardsGrid.flat().filter(card => card !== null).map((card) => card.applyInitialState()))
  view.add(hand.render());
  yield* hand.arrangeFan()
  
  yield* waitFor(0.5);
  yield* hand.performHighlightAndReturn(1);
  var removedCard = hand.removeCard(cards[4])
  yield* all(
    hand.arrangeFan(0.3),
    removedCard.cardRef().position.x(0,0.3),
    removedCard.cardRef().position.y(-200,0.3),
    removedCard.cardRef().rotation(0,0.3)
  )

  
  yield* waitFor(0.5);
});

