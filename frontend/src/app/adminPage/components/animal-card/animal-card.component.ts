import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css',
  animations: [
    trigger('pulse', [
      state('default', style({ transform: 'scale(1)' })),
      state('pulsed', style({ transform: 'scale(1.05)' })),
      transition('default <=> pulsed', animate('500ms ease-in-out')),
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate(
          '1s ease-out',
          keyframes([
            style({ transform: 'scale(0.5)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.7 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AnimalCardComponent {
  @Input() animal: any;
  animationState: string = 'default';

  onMouseEnter() {
    this.animationState = 'pulsed';
  }

  onMouseLeave() {
    this.animationState = 'default';
  }
}
