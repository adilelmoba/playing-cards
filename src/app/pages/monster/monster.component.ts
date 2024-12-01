import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent
],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  monsterId: number = -1;
  monsterTypes = Object.values(MonsterType);
  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;

  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);

  formGroup = this.formBuilder.group({
    name : [ '', Validators.required ],
    image: [ '', Validators.required ],
    type : [ MonsterType.ELECTRIC, Validators.required ],
    hp   : [ 0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]],
    figureCaption    : [ '', Validators.required ],
    attackName       : [ '', Validators.required ],
    attackStrength   : [ 0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]],
    attackDescription: [ '', Validators.required ],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  imagePreview: string | ArrayBuffer | null = this.monster.image || null;

  ngOnInit() {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = this.monster.copy();
      Object.assign(this.monster, data);
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id']) {
        this.monsterId = +params['id'];
        const monsterFound = this.monsterService.get(this.monsterId);
        if(monsterFound) {
          this.monster = monsterFound;
          this.formGroup.patchValue(monsterFound);
          this.imagePreview = monsterFound.image;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  }

  onSubmit($event: Event) {
    event?.preventDefault();
    if(this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formGroup.patchValue({ image: reader.result as string });
        this.monster.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }
  

}
