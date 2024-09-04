import { Img, View2D } from '@motion-canvas/2d';
import { all, tween, createRef, easeInOutCubic, easeOutCubic, easeInOutBack, linear } from '@motion-canvas/core';

const radius = 500;
const maxSpreadAngle = 60;
const highlightDistance = 50;

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
  
  *moveHand(newX, newY, duration = 0, easing) {
    const deltaX = newX - this.x;
    const deltaY = newY - this.y;

    if (duration === 0) {
        // Immediate move
        this.x = newX;
        this.y = newY;
        yield* this.arrangeFan(0); // Rearrange cards immediately
    } else {
        const startX = this.x;
        const startY = this.y;
        const totalCards = this.cards.length;

        let spreadAngle;
        if (totalCards === 1) {
          spreadAngle = 0; // No spread needed for a single card
        } else {
          spreadAngle = Math.min(maxSpreadAngle, (totalCards - 1) * 15); // Gradually increase spread
        }
    
        const angleStep = spreadAngle / (totalCards - 1);
        const startAngle = -spreadAngle / 2;

        yield* tween(duration, progress => {
            const easedProgress = easing(progress);

            this.x = startX + deltaX * easedProgress;
            this.y = startY + deltaY * easedProgress;
            this.cards.forEach((card, index) => {
              const angle = startAngle + index * angleStep;
              const radians = angle * (Math.PI / 180);
              
              const targetX = this.x + radius * Math.sin(radians);
              const targetY = this.y + radius * (1 - Math.cos(radians));
              card.cardRef().position.x(targetX);
              card.cardRef().position.y(targetY);
              card.cardRef().rotation(angle);
            });
        });
      }
  }



  *highlightCard(cardToHighlight, duration = 0.5, easing) {
    const angle = cardToHighlight.cardRef().rotation();
    const radians = angle * (Math.PI / 180);
    const targetOffsetX = (radius + highlightDistance) * Math.sin(radians);
    const targetOffsetY = (radius + highlightDistance) * (1 - Math.cos(radians)) - (highlightDistance * Math.cos(radians));
    
    yield* cardToHighlight.setPosition(this.x + targetOffsetX, this.y + targetOffsetY, angle, duration, easing);
  }
  
  
  *performHighlightAndReturn(totalDuration) {
    const totalCards = this.cards.length;
    const totalActions = totalCards * 2;
    for (let i = 0; i < totalActions; i++) {
      const normalizedTime = i / (totalActions - 1);
      const easedTime = easeInOutCubic(normalizedTime);
      const duration = easedTime * totalDuration / totalActions;
      if (i < totalCards) {
        yield* this.highlightCard(this.cards[i], duration, linear);
      } else {
        yield* this.returnHighlightedCard(this.cards[i - totalCards], duration, linear);
      }
    }
  }
  *returnHighlightedCard(cardToHighlight, duration = 0.5, easing) {
    const angle = cardToHighlight.cardRef().rotation();
    const radians = angle * (Math.PI / 180);
    const targetOffsetX = radius * Math.sin(radians);
    const targetOffsetY = radius * (1 - Math.cos(radians));

    yield* cardToHighlight.setPosition(this.x + targetOffsetX, this.y + targetOffsetY, angle, duration, easing);
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
