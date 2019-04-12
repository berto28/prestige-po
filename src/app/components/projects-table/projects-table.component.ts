import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {
  projectKey: any;
  constructor(public prestige: PrestigeService) { }
 
  ngOnInit() {
    this.prestige.getProjects();
    this.prestige.M.init();
  }

  setProjectKey(key){
    this.projectKey = key;
  }
  
  onClickAccordion(project): void{    
    this.prestige.M.init();
  }

  onSelectSupplier(supplier){
    console.log(supplier)
  }

}
