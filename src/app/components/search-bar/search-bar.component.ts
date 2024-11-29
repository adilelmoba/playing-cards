import { Component, EventEmitter, input, Input, model, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  search = model<string>('Initial');
  // searchChange = output<string>();

  searchButtonClick = output();

  searchClick() {
    this.searchButtonClick.emit();
  }

}
