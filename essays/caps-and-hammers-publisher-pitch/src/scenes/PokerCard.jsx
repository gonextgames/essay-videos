import { Img,  View2D} from '@motion-canvas/2d';
import {all, waitFor, createRef,tween, range, easeInOutCubic } from '@motion-canvas/core';

class PokerCard {
  constructor(frontImage, backImage, width, height, isFlipped = false, isTapped = false) {
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.width = width;
    this.height = height;
    this.isFlipped = isFlipped;
    this.isTapped = isTapped;

    this.cardRef = createRef();
    this.frontRef = createRef();
    this.backRef = createRef();
  }
  *applyInitialState() {
    if (this.isFlipped) {
      yield* this.flip(0); // Immediate flip
    }
    if (this.isTapped) {
      yield* this.tap(0); // Immediate tap
    }
  }
  *setPosition(x, y, angle, duration = 0, easing = easeInOutCubic) {
    if (duration === 0) {
      this.cardRef().position.x(x);
      this.cardRef().position.y(y);
      this.cardRef().rotation(angle);
    } else {
      // Smooth transition using tween
      yield* tween(duration, progress => {
        this.cardRef().position.x(this.cardRef().position.x() + (x - this.cardRef().position.x()) * progress);
        this.cardRef().position.y(this.cardRef().position.y() + (y - this.cardRef().position.y()) * progress);
        this.cardRef().rotation(this.cardRef().rotation() + (angle - this.cardRef().rotation()) * progress);
      }, easing);
    }
  }


  render() {
    return (
      <View2D ref={this.cardRef} width={this.width} height={this.height}>
        <Img
          ref={this.frontRef}
          src={this.frontImage}
          width={this.width}
          height={this.height}
          radius={20}
          clip
        />
        <Img
          ref={this.backRef}
          src={this.backImage}
          width={0}
          height={this.height}
          radius={20}
          clip
        />
      </View2D>
    );
  }

  *flip(totalTime = 0.3) {
    const halfWidth = this.width / 2;
    const halfTime = totalTime / 2; // Split the total time in half for each tween
  
    // Shrink the front image to 0 width
    yield* tween(halfTime, progress => {
      const width = this.width * (1 - progress);
      this.frontRef().width(width);
    }, easeInOutCubic);
  
    this.isFlipped = !this.isFlipped;
  
    // Grow the back image to full width
    yield* tween(halfTime, progress => {
      const width = halfWidth + (halfWidth * progress);
      if (this.isFlipped && this.backRef()) {
        this.frontRef().width(0);
        this.backRef().width(width);
      } else if (this.frontRef() && this.backRef()) {
        this.frontRef().width(width);
        this.backRef().width(0);
      }
    }, easeInOutCubic);
  }
  *tap(totalTime = 0.3) {
    const currentRotation = this.cardRef().rotation();
    const targetRotation = this.isTapped ? currentRotation + 90 : currentRotation - 90;

    if (totalTime === 0) {
      console.log(targetRotation)
      this.cardRef().rotation(targetRotation);
      this.isTapped = !this.isTapped;
      return;
    }

    yield* tween(totalTime, progress => {
      const rotation = this.isTapped
        ? currentRotation - (90 * progress) // Rotate back by 90 degrees
        : currentRotation + (90 * progress); // Rotate forward by 90 degrees
      this.cardRef().rotation(rotation);
    }, easeInOutCubic);

    this.isTapped = !this.isTapped;
  }
  
}
export default PokerCard;
