import { Component } from '@angular/core';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import { TaskStoreService } from '../task-store.service';
import { Task } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-buttombar',
  templateUrl: './buttombar.component.html',
  styleUrls: ['./buttombar.component.css']
})
export class ButtombarComponent {

  constructor (private task: TaskStoreService, private api: BackendService) {

  }

  faPlus = faAdd;

  onEnter(e: Event) {
    const target = e.target as HTMLInputElement;

    if ( !target.value.trim() ) return;

    this.api.createTask({title: target.value}).then( (v: Task)=> {
      this.task.task.push(v);
    });
    target.value = '';
  }

  clickParent(e: Event) {
    const target = e.target as HTMLDivElement;
    target.querySelector('input')?.focus();
  }
}
