import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {
    MdDialog,
    MdDialogRef
} from '@angular/material';
import {
    MdGridListModule
} from '@angular/material';
import {
    DatabaseService
} from '../database.service';
import {
    MenuService
} from '../menu.service';


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    temp: Array<Object>;
    @Input() forestsList: Array<any>;
    @Output() forestAttached = new EventEmitter();

    selectedDb: any;
    checkedForests = [];
    trainingSearchTerm: string;


    notVisible: boolean = true;
    visible: boolean = false;
    constructor(public dialogRef: MdDialogRef<DialogComponent>, private dbService: DatabaseService) { }
    ngOnInit() {
        this.selectedDb.id;
        this.selectedDb.name;
    }

    filterDb(event) {

        this.trainingSearchTerm = this.trainingSearchTerm || '';
        const val = this.trainingSearchTerm.toLowerCase();
        if (this.temp) {
            const tempdata = this.temp.filter(function (d) {
                return d['name'].toLowerCase().indexOf(val) !== -1 || !val;
            });
            // update the rows
            this.forestsList = tempdata;
        }
    }

    onClick() {
        this.dbService.getForests().subscribe(result => {
            this.forestsList = result;
            this.temp = this.forestsList;
        });
        this.visible = true;
        this.notVisible = false;

    }

    onBack() {
        this.visible = false;
        this.notVisible = true;
    }

    onCheck(check) {
        var forest = this.forestsList.find(function (f) {
            return f.id == check
        });
        const checked = this.checkedForests.findIndex((f)=>{return f.id == check});
        if(checked >= 0){
            this.checkedForests.splice(checked, 1);
            return;
        }
        this.checkedForests.push({
            id: forest.id,
            name: forest.name
        });
    }

    onCreate() {
        this.dialogRef.close();
    }

    onClose() {
        this.dialogRef.close();
    }

    onDone() {
        let db = this.selectedDb;  
        let i = 0;
        let forestList = {
            "database": {
                "id": db.id,
                "name": db.name
            },
            "selectedForests": []
        }


        for (i = 0; i < this.checkedForests.length; i++) {
            let data = {
                'id': 0,
                'name': ''
            };
            //data=(this.checkedForests[i].id,this.checkedForests[i].name)
            data['id'] = this.checkedForests[i].id;
            data['name'] = this.checkedForests[i].name;
            forestList.selectedForests.push(data);
        }


        this.dbService.attacheForest(forestList).subscribe((res) => {
            console.log('created' + res)
            db.forests = this.checkedForests;
            this.forestAttached.emit(db);
            this.dialogRef.close();
        });        
    }
    getAttachedForestInfo() {
        if(!this.forestsList){
            return '';
        }

        const totalForestCount = this.forestsList.length;
        const attachedForest = this.forestsList.filter((value) => { return value.database && value.database.name })
        const attachedForestCount = attachedForest? attachedForest.length : totalForestCount;
        return attachedForestCount + " of " + totalForestCount + " already attached";
    }
}