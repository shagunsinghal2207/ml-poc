import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { DatabaseService } from "app/database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-db',
  templateUrl: './create-db.component.html',
  styleUrls: ['./create-db.component.css']
})
export class CreateDbComponent implements OnInit {
  content = '+ See More';
  // @Input() rows: Array<Object>;
  private service_url = "http://localhost:3000/";
  temp: Array<Object>;
  @Input() dbList: Array<any>;
  dbName: '';  
  security: 'Security';
  schema: 'Schema';
  trigger: 'Trigger';

  constructor(private http: Http, private dbService: DatabaseService, private router: Router, ) { }

  toggleContent() {
    if (this.content === '+ See More') {
      this.content = '- See Less';
    } else {
      this.content = '+ See More';
    }
  }


  onSubmit(f: NgForm) {    
  }


  ngOnInit() {
    this.dbService.getDbList().subscribe(result => {
      this.dbList = result;
      this.temp = this.dbList;
    });

  }

  uuid() {
    let now = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = ((now + (Math.random() * 16)) % 16) | 0;
      now = Math.floor(now / 16);
      return ((c === 'x' ? r : ((r & 0x7) | 0x8))).toString(16);
    }
    );
  }

  createData(db) {    
    let data = {};
    let database = { id: '', name: '', isAvailable: true, relatedDatabase: [], forests: [], appServers: [] };
    database.id = this.uuid();

    database.name = this.dbName;
    database.relatedDatabase = [];
    if (this.security) {
      const securityDb = this.dbList.find((db) => { return db.name == this.security });
      database.relatedDatabase.push(Object.assign({}, securityDb, { relation: 'Security' }));
    }

    if (this.schema) {
      const schemaDb = this.dbList.find((db) => { return db.name == this.schema });
      database.relatedDatabase.push(Object.assign({}, schemaDb, { relation: 'Schema' }));
    }

    if (this.trigger) {
      const triggerDb = this.dbList.find((db) => { return db.name == this.trigger });
      database.relatedDatabase.push(Object.assign({}, triggerDb, { relation: 'Trigger' }));
    }

    data["database"] = database;
    this.dbService.createDb(JSON.stringify(data)).subscribe((res) => {
      this.router.navigate(['/database', { id: database.id }]);
    });
  }

}
