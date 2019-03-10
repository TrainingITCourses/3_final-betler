import { Component, OnInit, Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationError, NavigationCancel, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { State } from './reducers';
import { LoadLaunches } from './reducers/launch.actions';
import { Launch } from './store/models/launch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'speed';
  public loading = false;
  public filteredLaunches: Launch[];
  public filter :number = -1;
  public launches: Launch[];

  private launchesUrl = 'assets/data/launches.json';

  constructor(private http: HttpClient, private router: Router, private store: Store<State>) {
    
    // 'Loading' cuando se navega
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationError || event instanceof NavigationCancel || event instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    this.loadLaunches();

    this.store.select(state => state.launch).subscribe(value => {
      console.log("----- Store subscription called in app.component:");
      console.log(value);

      if (value) {
        console.log(" \\ Store exits.")

        // Read the loaded launches
        if (this.launches) {
          this.launches = value.launches;
          console.log(" \\ Read " + this.launches.length + " launches.");
        } else {
          console.log(" \\ No launches in received action.");
        }

        if (this.filter != value.filter) {
          // Filter has changed:
          if (this.launches) {
            var aux = this.launches;
            //aux = aux.filter((launch) => launch.status == value.filter); TODO, no me lo pilla o algo pasa
            this.filteredLaunches = aux;
            console.log(" \\ Filtered " + this.filteredLaunches.length);
          } else {
            console.log(" \\ ERROR? Filter has changed but no launches registered yet. Loading all launches.");
          }
          
          this.filter = value.filter;
          
          if (this.filteredLaunches) {
            console.log(" \\ Filtered launches: " + this.filteredLaunches.length);
          } else  {
            console.log(" \\ Filtered launches: N/A");
          }
        }

        
      } else {
        console.log ("State is undefined... ¿?");
      }
    });
  }

  private loadLaunches() {
    // Load all launches
    console.log("Starting app, dispatching LoadLaunches.");
    this.http.get<Response>(this.launchesUrl).subscribe((res: Response) => {
      console.log("Loaded " + res['launches'].length + " launches. Dispatching them." );
      this.store.dispatch(new LoadLaunches(res['launches']));
    });

  }
}
