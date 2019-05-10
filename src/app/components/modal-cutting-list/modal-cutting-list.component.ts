import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-cutting-list',
  templateUrl: './modal-cutting-list.component.html',
  styleUrls: ['./modal-cutting-list.component.css']
})
export class ModalCuttingListComponent implements OnInit {

  @Input() cuttingList;

  constructor() { }

  ngOnInit() {
  }

}
