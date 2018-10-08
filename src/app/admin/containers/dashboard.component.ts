import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'stottle-dashboard',
  template: `
  <stottle-dashboard-inner
  ></stottle-dashboard-inner>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
