import { Component, OnInit, Input, ViewContainerRef, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { HeaderComponent } from '../header/header.component';
import { DatabaseService } from '../database.service'
import { DialogComponent } from '../dialog/dialog.component'
import { Params, Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  Id: any;
  interval: any;
  loadRecent: any;
  newDb: any;

  temp: Array<Object>;
  rows: Array<Object>;
  selectedOption: string;
  dbSearchTerm: string;

  selectedDb: any;
  constructor(vcRef: ViewContainerRef, public dialog: MdDialog, private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {    
    this.route.params.subscribe((params: Params) => {
      this.Id = params['id'];
      var isForest = params['isForest'];
      this.loadData(this.Id, !isForest);
    }).unsubscribe();    
  }

  public ngOnChanges(changes: SimpleChanges) {
  }

  stringifyName(namedList) {
    if (!namedList || !namedList.map) {
      return '';
    }

    return namedList.map(n => n.name).join(", ");
  }

  filterDb(event) {
    this.dbSearchTerm = this.dbSearchTerm || '';
    const val = this.dbSearchTerm.toLowerCase();
    if (this.temp) {
      const tempdata = this.temp.filter(function (d) {
        return d['name'].toLowerCase().indexOf(val) !== -1 || !val;
      });
      // update the rows
      this.rows = tempdata;
    }
  }

  loadData(hilight=null, addDb=false) {
    this.dbService.getDbList().subscribe(result => {
      this.rows = result;
      this.temp = this.rows;
      this.dbSearchTerm = '';
      if(hilight){
        if(addDb){
          this.newDb = hilight;
        }
        else{
          this.highlighted = hilight;          
        }

        this.interval = setInterval(() => { 
          this.highlighted = -1; 
          this.newDb = -1;
          clearInterval(this.interval);
          this.router.navigate(['/database']);
        }, 5 * 1000);        
      }
    });
  }

  openDialog(db) {
    this.selectedDb = db;
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.selectedDb = db;
    //dialogRef.componentInstance.onClick();
    dialogRef.componentInstance.forestAttached.subscribe((db)=>{
      this.loadData(db.id);
    })
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;     
    });
  }

  onAction(): void {
  }

  highlighted = -1;

  getClasses(id, isAvialble = true, firstCol = false) {
    var className = '';
    if(firstCol){
      className = isAvialble? 'available ':''
    }
    if(this.newDb == id){
      className += 'new-db ';
    }  
    className += this.highlighted == id ? 'highlighted' : '';

    return className;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}