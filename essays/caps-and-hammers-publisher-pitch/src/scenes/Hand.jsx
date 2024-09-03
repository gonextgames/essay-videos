import { Img, View2D } from '@motion-canvas/2d';
import { all, tween, createRef, easeInOutCubic } from '@motion-canvas/core';

const radius = 500;
const maxSpreadAngle = 60;
const highlightDistance = 150;

class Hand {
  constructor(cards, x, y) {
    this.cards = cards;
    this.x = x;
    this.y = y;
  }

  addCard(card) {
    this.cards.push(card);
    this.arrangeFan();
  }

  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.arrangeFan();
    }
    return card;
  }

  *highlightCard(cardToHighlight, duration = 0.5) {
    const angle = cardToHighlight.cardRef().rotation();
    const radians = angle * (Math.PI / 180);
    const targetOffsetX = (radius + highlightDistance) * Math.sin(radians);
    const targetOffsetY = (radius + highlightDistance) * (1 - Math.cos(radians)) - (highlightDistance * Math.cos(radians));
    
    yield* cardToHighlight.setPosition(this.x + targetOffsetX, this.y + targetOffsetY, angle, duration);
  }
  customEasing = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
  
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }
  
  *performHighlightAndReturn(totalDuration) {
    const totalCards = this.cards.length;
    const totalActions = totalCards * 2;
    for (let i = 0; i < totalActions; i++) {
      const normalizedTime = i / (totalActions - 1);
      const easedTime = this.customEasing(normalizedTime);
      const duration = easedTime * totalDuration / totalActions;
      if (i < totalCards) {
        yield* this.highlightCard(this.cards[i], duration);
      } else {
        yield* this.returnHighlightedCard(this.cards[i - totalCards], duration);
      }
    }
  }
  *returnHighlightedCard(cardToHighlight, duration = 0.5) {
    const angle = cardToHighlight.cardRef().rotation();
    const radians = angle * (Math.PI / 180);
    const targetOffsetX = radius * Math.sin(radians);
    const targetOffsetY = radius * (1 - Math.cos(radians));

    yield* cardToHighlight.setPosition(this.x + targetOffsetX, this.y + targetOffsetY, angle, duration);
  }

  *arrangeFan(duration = 0) {
    const totalCards = this.cards.length;

    let spreadAngle;
    if (totalCards === 1) {
      spreadAngle = 0; // No spread needed for a single card
    } else {
      spreadAngle = Math.min(maxSpreadAngle, (totalCards - 1) * 15); // Gradually increase spread
    }

    const angleStep = spreadAngle / (totalCards - 1);
    const startAngle = -spreadAngle / 2;

    yield* all(
      ...this.cards.map((card, index) => {
        const angle = startAngle + index * angleStep;
        const radians = angle * (Math.PI / 180);

        const targetX = this.x + radius * Math.sin(radians);
        const targetY = this.y + radius * (1 - Math.cos(radians));
        return card.setPosition(targetX, targetY, angle, duration);
      })
    );
  }

  render() {
    return (
      <View2D>
        {this.cards.map((card) => card.render())}
      </View2D>
    );
  }

  *flipAll(totalTime = 0.3) {
    yield* all(...this.cards.map(card => card.flip(totalTime)));
  }
}

export default Hand;
