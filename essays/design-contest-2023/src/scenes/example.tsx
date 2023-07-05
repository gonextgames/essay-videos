import {
  createSignal, DEFAULT, SimpleSignal, beginSlide, slideTransition, Vector2, Direction, createRef, Reference, makeScene2D,all, waitFor, waitUntil, sequence,
} from "../../../../common/motion"

import { Img, Circle, Grid, Txt, Rect, Node, CubicBezier} from "@motion-canvas/2d/lib/components"

import CardHelper from "../../../../common/card"

import capsAndHammersPackage from "../../public/capsAndHammers_1.2.0_ResearchLabStealing_2023-06-07_17-34-39/package"
// capsAndHammersPackage.actionCaps.admiral

export default makeScene2D(function* (view) {
  // Create your animations here

  var mainRef = createRef<Rect>()
  yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={"#141414"}/>)

  var widthRatio = 2.5
  var heightRatio = 3.5
  var size = 300
  var shrunkenSize = 95

  var shownWidth = size * widthRatio
  var shownHeight = size * heightRatio
  var cardSize = new Vector2(shrunkenSize*widthRatio, shrunkenSize*heightRatio)

  const argentinaReference = createRef<Rect>()
  const argentinaWidthSignal = createSignal(shownWidth)
  const argentinaHeightSignal = createSignal(shownHeight)
  const argentinaFlipSignal = createSignal(0)
  yield mainRef().add(<CardHelper.Card rectReference={argentinaReference} frontSrc={capsAndHammersPackage.countries.argentina} backSrc={capsAndHammersPackage.countries.back} width={argentinaWidthSignal} height={argentinaHeightSignal} rotation={90} flipSignal={argentinaFlipSignal}/>)

  yield* waitFor(5);
});
