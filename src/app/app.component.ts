import { Component } from '@angular/core';
import { PrestigeService} from './services/prestige.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prestige-app';
  pageTitle: string;

  constructor(public prestige: PrestigeService){
  }
  
  savePageTitle(title):void {
    // this.pageTitle = title;
    
  }
}
