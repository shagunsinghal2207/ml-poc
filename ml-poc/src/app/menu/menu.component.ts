import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() menuList: Array<Object>;
  @Output() menuToggle = new EventEmitter();
  isExpended = false;
  activeMenu = 'home';
  
  constructor() { }

  ngOnInit(){
    
  }

  toggle(){
    this.isExpended = !this.isExpended;
    this.menuToggle.emit(this.isExpended)
  }

  getClass(menu){
    return menu.name == this.activeMenu? 'active': '';
  }

  setActive(menu){
    this.activeMenu = menu.name;
  }
}
