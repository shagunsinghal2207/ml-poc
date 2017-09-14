import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from "app/database.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-create-forest',
  templateUrl: './create-forest.component.html',
  styleUrls: ['./create-forest.component.css']
})
export class CreateForestComponent implements OnInit {
  dbName: any;
  dbId: any;
  name: any;
  forestName: '';
  content = '+ See More';
  @Input() dbList: Array<any>;  

  toggleContent() {
    if (this.content === '+ See More') {
      this.content = '- See Less';
    } else {
      this.content = '+ See More';
    }
  }
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.dbId = params['id'];
      this.dbName = params['name'];
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

  createForest() {    
    let data = {};
    let forest = { id: '', name: '' };
    forest.id = this.uuid();
    forest.name = this.forestName;
    data["forest"] = forest;
    JSON.stringify(data);
    this.dbService.createForest(JSON.stringify(data)).subscribe((res) => {
      let forestList = {
        "database": { "id": this.dbId, "name": this.dbName },
        "selectedForests": [{ "id": forest.id, "name": this.forestName }]
      }

      this.dbService.attacheForest((forestList)).subscribe(()=>{
        this.router.navigate(['/database', { id: this.dbId, isForest:true}]);
      });  
    });      
  }

}
