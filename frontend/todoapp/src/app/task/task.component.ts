import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { faTrashCan, faCircleCheck, faCircleDot, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { Task } from '../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  constructor(protected task: TaskStoreService, private api: BackendService) {}

  faDel = faTrashCan;
  faDone = faCircleCheck;
  faDoin = faCirclePlay;
  faTodo = faCircleDot;

  onDel(e: Event) {
    const target = (e.target as SVGElement).closest('button');
    const id = target?.id || undefined
    if (id) { this.api.delTask(id).then(()=>{
      this.task.task = this.task.task.filter((v:Task)=> v._id != id);
    }) }
  }

  onChangeStatus(e: Event) {
    const target = (e.target as SVGElement).closest('button');
    const id = target?.id || undefined;
    const status = target?.getAttribute("s") || '';
    if (id) {
      const v = this.task.task.find( (v:Task)=> {
        return v._id === id;
      } );
      if (v) {
        v.status = status;
        this.api.putTask(v);
      }
    }
  }

  onClick(e: Event) {
    const target = e.target as HTMLParagraphElement;
    const id = target?.id || undefined;
    if (id) {
      const v = this.task.task.find( (v:Task)=> {
        return v._id === id;
      } );
      if (v) {
        switch (v.status) {
          case "todo": v.status = "doing"; break;
          case "doing": v.status = "done"; break;
          case "done": v.status = "todo"; break;
        }
        this.api.putTask(v);
      }
    }
  }
}
