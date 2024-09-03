import { makeScene2D } from '@motion-canvas/2d';
import PokerCard from './PokerCard';
import Hand from './Hand';
import { waitFor } from '@motion-canvas/core';
import capsAndHammers from "./capsAndHammers/package";
import {all, createRef,tween, range, easeInOutCubic } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const ratio = 0.5;
  const width = 750 * ratio;
  const height = 1125 * ratio;

  var admiral = new PokerCard(capsAndHammers.actionCaps.admiral, capsAndHammers.actionCaps.back, width, height)
  const cards = [
    new PokerCard(capsAndHammers.actionCaps.diplomat, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.spy, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.nuke, capsAndHammers.actionCaps.back, width, height),
    admiral,
    new PokerCard(capsAndHammers.actionCaps.soldier, capsAndHammers.actionCaps.back, width, height),
    new PokerCard(capsAndHammers.actionCaps.guerrilla, capsAndHammers.actionCaps.back, width, height)
  ]
  const hand = new Hand(cards, 0, 400);
  
  view.add(hand.render());
  yield* hand.arrangeFan()

  yield* waitFor(0.5);
  yield* hand.performHighlightAndReturn(2);
  var removedCard = hand.removeCard(cards[4])
  yield* all(
    hand.arrangeFan(0.3),
    removedCard.cardRef().position.x(0,0.3),
    removedCard.cardRef().position.y(-200,0.3),
    removedCard.cardRef().rotation(0,0.3)
  )
  yield* waitFor(0.5);
});
