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
      console.log("flip")
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
      yield* tween(duration, progress => {
        const easedProgress = easing(progress);
        this.cardRef().position.x(this.cardRef().position.x() + (x - this.cardRef().position.x()) * easedProgress);
        this.cardRef().position.y(this.cardRef().position.y() + (y - this.cardRef().position.y()) * easedProgress);
        this.cardRef().rotation(this.cardRef().rotation() + (angle - this.cardRef().rotation()) * easedProgress);
      });
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
    const halfTime = totalTime / 2;
    
    this.isFlipped = !this.isFlipped;
    yield* tween(halfTime, progress => {
      const width = this.width * (1 - progress);
      if (this.isFlipped) {
        this.frontRef().width(0);
        this.backRef().width(width);
      } else {
        this.frontRef().width(width);
        this.backRef().width(0);
      }
    }, easeInOutCubic);
  
    // Grow the back image to full width
    yield* tween(halfTime, progress => {
      const width = halfWidth + (halfWidth * progress);
      if (this.isFlipped) {
        this.backRef().width(0);
        this.frontRef().width(width);
      } else {
        this.backRef().width(width);
        this.frontRef().width(0);
      }
    }, easeInOutCubic);
  }
  *flipOutOfExistence(totalTime = 0.3) {
    yield* all(
      this.frontRef().width(0, totalTime, easeInOutCubic),
      this.backRef().width(0, totalTime, easeInOutCubic)
    );
  }
  *tap(totalTime = 0.3) {
    const currentRotation = this.cardRef().rotation();
    const targetRotation = this.isTapped ? currentRotation + 90 : currentRotation - 90;

    if (totalTime === 0) {
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
