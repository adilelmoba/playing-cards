import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  monsterId = signal<number | undefined>(undefined);
  routeSubscription: Subscription | null = null;
  monsterTypes = Object.values(MonsterType);

  formGroup = new FormGroup({
    name : new FormControl('', [ Validators.required ]),
    image: new FormControl('', [ Validators.required ]),
    type : new FormControl(MonsterType.ELECTRIC, [ Validators.required ]),
    hp   : new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]),
    figureCaption    : new FormControl('', [ Validators.required ]),
    attackName       : new FormControl('', [ Validators.required ]),
    attackStrength   : new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200)
    ]),
    attackDescription: new FormControl('', [ Validators.required ]),
  });

  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.monsterId.set(params['id'] ? parseInt(params['id'], 10) : undefined);
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  }

  onSubmit($event: Event) {
    event?.preventDefault();
    console.log(this.formGroup.value);
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      }
    }
  }

}
