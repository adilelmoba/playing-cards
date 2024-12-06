import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMonster } from '../../interfaces/monster.interface';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private BASE_URL = 'http://localhost:8000/monsters/';
  private http = inject(HttpClient);

  getAll(): Observable<Monster[]> {
    return this.http.get<IMonster[]>(this.BASE_URL).pipe(
      map((monsterDictArray) => {
        return monsterDictArray.map<Monster>((monsterDict) =>
          Monster.fromJSON(monsterDict)
        );
      })
    );
  }

  get(id: number): Observable<Monster> {
    return this.http
      .get<IMonster>(`${this.BASE_URL}${id}`)
      .pipe(map((monsterDict) => Monster.fromJSON(monsterDict)));
  }
   
  add(monster: Monster): Observable<Monster> {
    return this.http
      .post<IMonster>(this.BASE_URL, monster.toJSON())
      .pipe(map((monsterDict) => Monster.fromJSON(monsterDict)));
  }

  update(monster: Monster): Observable<Monster> {
    return this.http
      .put<IMonster>(`${this.BASE_URL}${monster.id}/`, monster.toJSON())
      .pipe(map((monsterDict) => Monster.fromJSON(monsterDict)));
  }
  

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}${id}`);
  }
}
