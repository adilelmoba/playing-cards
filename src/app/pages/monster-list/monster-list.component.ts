import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  private monsterService = inject(MonsterService);
  private router = inject(Router);
  
  constructor() {  }

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => 
      monster.name.toLowerCase().includes(this.search().toLowerCase())
    );
  });

  addMonster() {
    this.router.navigate(['monster']);
  }

  ngOnInit(): void {
    this.monsters.set(this.monsterService.getAll());
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }

}
