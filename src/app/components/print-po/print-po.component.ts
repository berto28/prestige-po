import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-po',
  templateUrl: './print-po.component.html',
  styleUrls: ['./print-po.component.css']
})
export class PrintPoComponent implements OnInit {

  @Input() printPO: Array<any>;
  logo = 'http://localhost/prestige/assets/logo.png';

  constructor() { }

  ngOnInit() {
  }

}
