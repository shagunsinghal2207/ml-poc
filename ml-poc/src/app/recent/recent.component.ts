import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  @Input() data:any;
  recents: any;
  interval: any;
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
   this.loadRecent();
  }

  loadRecent(){
   this.recents=this.data;
  }
}
