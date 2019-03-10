import { Component, OnInit, Input, Injectable, Output, ChangeDetectionStrategy } from '@angular/core';
import { Launch } from '../store/models/launch';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { SetFilter } from '../reducers/launch.actions';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {

  @Input() public filteredLaunches: Launch[];
  @Output() public filter: number;

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    console.log("Status detail, navigated to: " + this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new SetFilter(+this.route.snapshot.paramMap.get('id')));
    this.filter = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.store.select(state => state.launch).subscribe(value => {
      this.filteredLaunches = value.filteredLaunches;
    });
  }

}
