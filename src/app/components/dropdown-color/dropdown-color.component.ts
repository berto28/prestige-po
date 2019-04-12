import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-color',
  templateUrl: './dropdown-color.component.html',
  styleUrls: ['./dropdown-color.component.css']
})

export class DropdownColorComponent implements OnInit {
  
  colors: Array<any> = [];
  choseColor: string;
  @Input() dropdownData;
  @Output() color = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    console.log(this.dropdownData)
    console.log(this.dropdownData.icon)
    this.choseColor = "Choose Color";
    this.colors = ['ANALOK', 'POWDER COATED', 'ANODIZED'];
  }

  

  onClickColor(color): void{
    this.color.emit(color);
    this.dropdownData.text = color;
  }
}
