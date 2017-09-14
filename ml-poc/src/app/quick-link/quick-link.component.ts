import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.css']
})
export class QuickLinkComponent implements OnInit {

  links = [
    {text: 'Query Console', link: ''},
    {text: 'Configuration Manger', link: ''},
    {text: 'Monitoring History', link: ''},
    {text: 'MarkLogic', link: 'www.marklogic.com'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
