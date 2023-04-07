import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task, TaskPayload } from './models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private axiosInst = axios.create({baseURL:"http://0.0.0.0:3000/"});

  constructor() { }

  public async getTasks(): Promise<Task[]> {
    const res = await this.axiosInst.get('/task');
    return res.data as Task[];
  }

  public async createTask( t: TaskPayload ): Promise<Task> {
    return (await this.axiosInst.post('/task', t)).data as Task;
  }

  public async delTask( id: string ) {
    const res = await this.axiosInst.delete(`/task/${id}`);
  }

  public async putTask( t: Task) {
    const res = await this.axiosInst.put(`/task`, t);
  }
}
