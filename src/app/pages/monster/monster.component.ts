import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  monsterId: number = -1;
  monsterTypes = Object.values(MonsterType);

  private subscriptions: Subscription = new Subscription();

  formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    type: [MonsterType.ELECTRIC, Validators.required],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', Validators.required],
    attackName: ['', Validators.required],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', Validators.required],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  imagePreview: string | ArrayBuffer | null = this.monster.image || null;

  ngOnInit() {
    const formValuesSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = this.monster.copy();
        Object.assign(this.monster, data);
      }
    );
    this.subscriptions.add(formValuesSubscription);

    const routeSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.monsterId = +params['id'];
            return this.monsterService.get(this.monsterId);
          }
          return of(null);
        })
      )
      .subscribe((monster) => {
        if (monster) {
          this.monster = monster;
          this.formGroup.patchValue(monster);
          this.imagePreview = monster.image;
        }
      });
    this.subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  }

  onSubmit($event: Event) {
    event?.preventDefault();
    let saveObservable = null;
    if (this.monsterId === -1) {
      saveObservable = this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      saveObservable = this.monsterService.update(this.monster);
    }
    const saveSbscritption = saveObservable.subscribe((_) => {
      this.navigateBack();
    });
    this.subscriptions.add(saveSbscritption);
  }

  onDeleteMonster() {
    const dialogRef = this.dialog.open(
      DeleteMonsterConfirmationDialogComponent
    );
    dialogRef
      .afterClosed()
      .pipe(
        filter((confirmation) => confirmation),
        switchMap((_) => this.monsterService.delete(this.monsterId))
      )
      .subscribe((_) => {
        this.navigateBack();
      });
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
