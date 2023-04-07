import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';

  onSubmit(event: Event): void{
    event.preventDefault();
    alert("hello");
  }
}
