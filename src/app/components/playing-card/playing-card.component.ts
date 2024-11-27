import { Component, input, Input, InputSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent {

  // @Input({
  //   required: true,
  //   alias: 'my-monster',
  //   transform: (value: Monster) => {
  //     value.hp = value.hp * 2;
  //     return value;
  //   }
  // }) monster: Monster = new Monster();

  monster: InputSignal<Monster> = input(new Monster);

}
