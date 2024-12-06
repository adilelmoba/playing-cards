import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [
    SearchBarComponent,
    PlayingCardComponent,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

  private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = toSignal(this.monsterService.getAll());
  search = model('');
  
  constructor() {  }

  filteredMonsters = computed(() => {
    return this.monsters()?.filter(monster => 
      monster.name.toLowerCase().includes(this.search().toLowerCase()) ?? []
    );
  });

  addMonster() {
    this.router.navigate(['monster']);
  }

  ngOnInit(): void {
    // this.monsters.set();
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }

}
