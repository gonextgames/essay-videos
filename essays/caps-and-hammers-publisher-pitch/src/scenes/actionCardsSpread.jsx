import { makeScene2D, Rect } from '@motion-canvas/2d';
import PokerCard from './PokerCard';
import Hand from './Hand';
import Board from './Board';
import { waitFor } from '@motion-canvas/core';
import capsAndHammers from "./capsAndHammers/package";
import {all, createRef,tween, range, easeInOutCubic, Vector2 } from '@motion-canvas/core';
const ratio = 0.3;
const width = 750 * ratio;
const height = 1125 * ratio;

export default makeScene2D(function* (view) {
  view.add(
    <Rect
      width={2000}
      height={2000}
      fill="#282c34"
    />,
  );
  
  const cards = [
    [
      new PokerCard(capsAndHammers.actionCaps.diplomat, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.spy, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width, height, true, false),],
    [
      new PokerCard(capsAndHammers.actionCaps.nuke, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.admiral, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.soldier, capsAndHammers.actionCaps.back, width, height, true, false),],
    [
      new PokerCard(capsAndHammers.actionCaps.guerrilla, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.defector, capsAndHammers.actionCaps.back, width, height, true, false),
      new PokerCard(capsAndHammers.actionCaps.policeman, capsAndHammers.actionCaps.back, width, height, true, false),
    ]
  ]
  const board = new Board(cards, 0, 0, width, height);
  
  
  view.add(board.render());
  yield* all(...cards.flat().map(card => card.applyInitialState()))
  yield* board.arrangeCards(0);
  
  yield* waitFor(1);
  yield* all(
    ...cards.flat().map(card => card.flip(0.25))
  )
  yield* waitFor(5); 
});

