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
  const spaceRace = new PokerCard(capsAndHammers.countries.sportsCompetition, capsAndHammers.countries.back, width / 3, height / 3, false, true);
  view.add(spaceRace.render());
  
  // Move the spaceRace card into position
  yield* spaceRace.setPosition(1300, 0, 0, 0);
  yield* spaceRace.setPosition(0, 0, 0, 1);

  // Create three micro cards
  const microCards = [];
  for (let i = 0; i < 3; i++) {
    const microCard = new PokerCard(capsAndHammers.victoryPoints6bb61e3b.capsVictoryPoint, capsAndHammers.victoryPoints6bb61e3b.back, 450/3, 600/3, false, true);
    view.add(microCard.render());
    microCards.push(microCard);
  }

  // Position all micro cards behind the spaceRace card
  for (let i = 0; i < microCards.length; i++) {
    yield* microCards[i].setPosition(1300, 0, 90, 0); // Same position as spaceRace
  }

  yield* waitFor(0.2);

  // Animate each micro card to move out from behind the spaceRace card
  for (let i = 0; i < microCards.length; i++) {
    const offsetY = -175 + i * 175; // Adjust Y position slightly downwards
    yield* microCards[i].setPosition(400, offsetY, 90, 0.2, easeInOutCubic); // Animate to new position
  }
  yield* waitFor(1);
  yield* all (... microCards.map(microCard => microCard.flipOutOfExistence(0.3)))
  
  const boardGrid = [
    [null,
    capsAndHammers.countries.dmz,
    capsAndHammers.countries.formerColony,
    capsAndHammers.countries.jungleWarfare,],
    [capsAndHammers.countries.peaceConference,
    capsAndHammers.countries.politicalQuagmire,
    capsAndHammers.countries.potentialRival,
    capsAndHammers.countries.spaceRace,],
    [capsAndHammers.countries.sportsCompetition,
    capsAndHammers.countries.strategicNeighbor,
    capsAndHammers.countries.tradeCheckpoint,
    capsAndHammers.countries.unreliableAlly,]
  ]
  const table = boardGrid.map(row => row.map(graphic => {
    if (graphic === null) {
      return null
    }
    return new PokerCard(graphic, capsAndHammers.countries.back, width/4, height/4, false, false);
  }))
  const board = new Board(table, 0, 0, width/4, height/3.3);
  view.add(board.render())
  yield* board.cameraRef().zoom(0.5, 0)
  yield* board.boardRef().position([2000, 2000], 0)
  yield* board.arrangeCards(0)
  
  var roundLabels = []
  for (let index = 0; index < 3; index++) {
    const spread = 340
    const text = <Txt
      text={`Round ${index+1}`}
      fontSize={80}
      fill="#ffffff" // Text color
      fontFamily="Verdana"
      align="left" // Text alignment
      x={-1200 }
      y={-spread + (index*spread)}
    />;
    view.add(text)
    roundLabels.push(text)
  }
  
  yield* all (
    spaceRace.setPosition(-285,-343,0,1.5),
    spaceRace.cardRef().scale(0.375,0.9),
    board.boardRef().position([0, 0], 1),
  )  
  
  for (let index = 0; index < 3; index++) {
    yield  roundLabels[index].position.x(-650, 0.75, easeInOutCubic)
    yield* waitFor(0.25);
  }
  
  
  yield* waitFor(3);
});


