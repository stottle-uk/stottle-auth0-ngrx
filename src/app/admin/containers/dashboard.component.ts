import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'stottle-dashboard',
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
