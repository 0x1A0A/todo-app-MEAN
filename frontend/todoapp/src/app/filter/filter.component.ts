import { Component } from '@angular/core';
import {faCircleXmark, faMagnifyingGlass, faSortAlphaAsc, faSortAlphaDesc} from '@fortawesome/free-solid-svg-icons';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private task: TaskStoreService) {}

  faSearch = faMagnifyingGlass;
  faSort = faSortAlphaAsc;
  faSortR = faSortAlphaDesc;
  faClose = faCircleXmark;

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.task.filter = target.value;
  }

  clearFilter(e: Event) {
    const el = document.querySelector('input');
    if (el) { this.task.filter = el.value = ""; }
  } 
}
