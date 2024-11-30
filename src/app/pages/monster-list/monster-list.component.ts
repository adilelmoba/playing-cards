import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [
    SearchBarComponent,
    PlayingCardComponent,
    CommonModule],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {


  monsters = signal<Monster[]>([]);
  search = model('');

  monsterService = inject(MonsterService);
  
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
    this.monsters.set(this.monsterService.getAll());
  }

}
