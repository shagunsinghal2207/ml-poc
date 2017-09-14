import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  getMenus(){
    //This could be a service call for dynamic menus
    return [
      { id: 0, text: 'Home', name: 'home',  url:'/', isActive: true}, 
      { id: 1, text: 'Databases', name: 'Database',  url:'/database'}, 
      { id: 2, text: 'Group', name: 'group',  url:'/'}, 
      { id: 3, text: 'Hosts',  name: 'host',  url:'/'}, 
      { id: 4, text: 'Forests',  name: 'forest',  url:'/'}, 
      { id: 5, text: 'Clusters',  name: 'clusters',  url:'/'}, 
      { id: 6, text: 'Security',  name: 'security',  url:'/'}, 
    ];
  }

}
