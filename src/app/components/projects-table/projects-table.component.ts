import { Component, OnInit } from '@angular/core';
import { PrestigeService } from '../../services/prestige.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {
  projectKey: any;
  poClass = {
    paid: 'teal disabled',
    unpaid: 'red pulse'
  };
  printPO: any;

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

  onClickPrint(po){

    this.printPO = po;
   
    console.log(this.printPO);

    setTimeout( function() {
      let print = document.getElementById('print');
      let newWin= window.open("");
      newWin.document.write(print.outerHTML);
      newWin.print();
      newWin.close();
    }, 0)
    
    
  }

  editProject(project){
    console.log(project)
    this.prestige.project_modalUpdateFields.key = project.key;
    this.prestige.project_modalUpdateFields.fields[0].value = project.name;
  }

  onClickUpdateModal(project){
    this.prestige.editProjectName(project);
  }

  deleteProject(project){
    var toastHTML = `<span>
      Are you sure you want to delete <b class="yellow-text">${project.name}</b>?
    </span><button id="${project.key}" class="btn-flat toast-action" >Delete</button>`;
    this.prestige.M.toast(toastHTML);
    document.querySelector(`.toast #${project.key}`).addEventListener('click', (event)=> {
      this.prestige.M.toastDismiss();
      this.prestige.deleteProject(project);
    });
  }
}
