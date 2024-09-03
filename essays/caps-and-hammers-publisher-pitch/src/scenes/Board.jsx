import { Img, View2D, Camera } from '@motion-canvas/2d'; // Assuming a Camera2D or similar exists
import { all, tween, createRef, easeInOutCubic, Vector2 } from '@motion-canvas/core';

class Board {
  constructor(cardsGrid, x, y, cardWidth, cardHeight) {
    this.cardsGrid = cardsGrid; // 2D array of PokerCard objects
    this.x = x; // X position of the board's center
    this.y = y; // Y position of the board's center
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;
    this.boardRef = createRef();
    this.cameraRef = createRef(); // Reference to the camera
  }
  addCard(card, row, col) {
    if (!this.cardsGrid[row]) {
      this.cardsGrid[row] = [];
    }
    this.cardsGrid[row][col] = card;
  }
  
  removeCard(row, col, duration = 0) {
    if (this.cardsGrid[row] && this.cardsGrid[row][col]) {
      const removedCard = this.cardsGrid[row][col];
      this.cardsGrid[row].splice(col, 1); // Remove the card from the grid
      if (this.cardsGrid[row].length === 0) {
        this.cardsGrid.splice(row, 1); // Remove the row if it's empty
      }
      return removedCard;
    }
    return null;
  }

  *arrangeCards(duration = 0) {
    const rows = this.cardsGrid.length;
    const cols = this.cardsGrid[0].length;

    const centerX = this.x;
    const centerY = this.y;

    const buffer = 5
    const totalWidth = (cols - 1) * (this.cardWidth + buffer);
    const totalHeight = (rows - 1) * (this.cardHeight + buffer);

    yield* all(
      ...this.cardsGrid.flatMap((row, rowIndex) =>
        row.map((card, colIndex) => {
          if (card === null) return null;

          const offsetX = (colIndex * (this.cardWidth + buffer)) - totalWidth / 2;
          const offsetY = (rowIndex * (this.cardHeight + buffer)) - totalHeight / 2;

          const targetX = centerX + offsetX;
          const targetY = centerY + offsetY;

          return card.setPosition(targetX, targetY, 0, duration);
        })
      ).filter(card => card !== null)
    );
}

  *skew(skewX, skewY, duration = 0) {
    yield* this.cameraRef().skew([40,-30], duration)
    // const skewVector = [skewX, skewY];

    // if (duration === 0) {
    //   // Immediate set
    //   this.cameraRef().skew(skewVector);
    // } else {
    //   // Smooth transition using tween
    //   const currentSkew = this.cameraRef().skew();
    //   yield* tween(duration, progress => {
    //     this.cameraRef().skew([
    //       currentSkew[0] + (skewX - currentSkew[0]) * progress,
    //       currentSkew[1] + (skewY - currentSkew[1]) * progress
    //     ]);
    //   });
    // }
  }

  render() {
    return (
      <View2D ref={this.boardRef}>
        <Camera ref={this.cameraRef}>
          {this.cardsGrid.flat().filter((card) => card !== null).map((card) => card.render())}
        </Camera>
      </View2D>
    );
  }
}

export default Board;
