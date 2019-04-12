import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  background: string = "../../assets/sidenav_bg.jpg";
  icon: string = "../../assets/ico_prestige.png";

  @Output() title = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClickNav(title):void {
    this.title.emit(title);
  }
}
