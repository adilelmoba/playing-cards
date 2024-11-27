import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() search = 'Initial';
  @Output() searchChange = new EventEmitter<string>();

  @Output('submit') searchButtonClick = new EventEmitter();

  searchClick() {
    this.searchButtonClick.emit();
  }

  updateSearch(value: string) {
    this.searchChange.emit(value);
  }

}
