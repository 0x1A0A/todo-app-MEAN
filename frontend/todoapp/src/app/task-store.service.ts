import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {
  public task : Task[] = [];
  public filter: string = '';

  constructor(api: BackendService) {
    api.getTasks().then((val: Task[])=>{
      this.task = val;
    });
  }

  filtered(): Task[] {
    const word = this.filter.trim();
    if (!word) {
      return this.task;
    }
    
    if (word.startsWith("@")) {
      const keyword = word.slice(1);
      if (!keyword) return this.task;
      return this.task.filter((v:Task)=>v.status===keyword);
    }
    return this.task.filter((v:Task)=> v.title.includes(word));
  }

}
