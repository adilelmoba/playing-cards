import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PlayingCardComponent,
    CommonModule,
    SearchBarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  monsters = signal<Monster[]>([]);
  search = model('');

  monsterService = inject(MonsterService);
  faIconLibrary  = inject(FaIconLibrary);
  
  constructor() {  }

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => 
      monster.name.toLowerCase().includes(this.search().toLowerCase())
    );
  });

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll());
  }

  ngOnInit(): void {
    this.initFontAwesome();
    this.monsters.set(this.monsterService.getAll());
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

}
