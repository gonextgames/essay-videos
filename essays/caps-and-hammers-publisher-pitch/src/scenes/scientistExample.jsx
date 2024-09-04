import { makeScene2D, Rect,Txt } from '@motion-canvas/2d';
import PokerCard from './PokerCard';
import Hand from './Hand';
import Board from './Board';
import { linear, waitFor } from '@motion-canvas/core';
import capsAndHammers from "./capsAndHammers/package";
import {all, createRef,tween, range, easeInOutCubic, Vector2 } from '@motion-canvas/core';
const ratio = 2;
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
  
  // Create the main "spaceRace" card
  const spaceRace = new PokerCard(capsAndHammers.countries.spaceRace, capsAndHammers.countries.back, width / 3, height / 3, true, false);
  const scientist = new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width / 3, height / 3, true, false);
  const prestige = new PokerCard(capsAndHammers.victoryPoints6bb61e3b.capsVictoryPoint, capsAndHammers.victoryPoints6bb61e3b.back, 450/3, 600/3, false, true);
  view.add(spaceRace.render());
  view.add(scientist.render());
  view.add(prestige.render());
  yield* spaceRace.applyInitialState()
  yield* scientist.applyInitialState()
  yield* prestige.applyInitialState()
  
  yield* prestige.cardRef().position([-2000,0], 0)
  yield* spaceRace.cardRef().position.x(1920/6, 0)
  yield* scientist.cardRef().position.x(-1920/6, 0)
  
  yield* waitFor(1);
  yield* scientist.flip()
  yield* waitFor(0.1);
  yield prestige.cardRef().position([-770,0], 1, easeInOutCubic)
  yield* waitFor(1);
  yield* scientist.flip()
  yield* waitFor(2);
  
  const cards = [
    new PokerCard(capsAndHammers.actionCaps.diplomat, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.guerrilla, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.scientist, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.nuke, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.admiral, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.soldier, capsAndHammers.actionCaps.back, width/5, height/5),
    new PokerCard(capsAndHammers.actionCaps.spy, capsAndHammers.actionCaps.back, width/5, height/5),
  ]
  const hand = new Hand(cards, 0, 900);
  view.add(hand.render());
  yield* hand.arrangeFan()
  yield* hand.moveHand(0, 900, 0)
  yield* hand.moveHand(0, 400, 0.5, easeInOutCubic)
  yield* hand.highlightCard(cards[cards.length-1], 1, easeInOutCubic)
  yield* waitFor(0.5);
  
  yield* scientist.flip()
  yield* waitFor(2);
  yield* spaceRace.flip()
  yield* waitFor(5);
});


