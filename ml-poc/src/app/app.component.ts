import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu/menu.component'
import { LayoutService } from './layout.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  menuList =  [];
  tiles= [];
  isExpendedMenu = false;

  constructor(private menuService: MenuService, private layoutService: LayoutService){

  }

  ngOnInit(){
    this.menuList = this.menuService.getMenus()
    this.tiles = this.layoutService.getMainLayout();
  }

  onMenuToggle(isExpended){    
    this.isExpendedMenu = isExpended;
  }

  getClassName(){
    return this.isExpendedMenu? 'squeeze': 'normal';
  }
  title = 'app';  
}
