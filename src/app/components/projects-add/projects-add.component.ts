import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit {

  txtProject: string;
  
  constructor(public prestige: PrestigeService) { 
    prestige.url = 'Projects';
  }

  ngOnInit() {
  }

  onClickSaveProject() {
    let isProceed = false
    this.prestige.txtProject == null || this.prestige.txtProject == '' ? this.prestige.M.toast('Project name should not be blank;') : ''
    isProceed = this.prestige.txtProject == null || this.prestige.txtProject == '' ? false : true;

    isProceed ? this.prestige.addProject({projectName: this.prestige.txtProject }) : '';
    
  }
}
