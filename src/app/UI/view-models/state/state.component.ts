import { Component, OnInit } from '@angular/core';
import { PublicationApiService } from 'src/app/infrastructure/adapters/publication-api.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  isVisible:boolean = false;
  inputPublish:string = '';

  constructor(private publicationApiService: PublicationApiService) { }

  ngOnInit(): void {
  }

  valueChange(){
    this.isVisible = !this.isVisible;
  }

  publishState(){
    this.isVisible = false;
    this.inputPublish = '';
  }

  scrollNewPublications(){
    let containerPublication:any = document.getElementById('publication-template');
    if(containerPublication){
      setTimeout(() => {
        containerPublication.scrollTop = containerPublication.scrollHeight;
      }, 500);
    }
  }
  
  handlerAddPublication(text:string = this.inputPublish) {
    const valueInput = text.replace(/ /g, "");
    let amountCharacter = 0;
    this.scrollNewPublications();
    if (valueInput.length>0 && valueInput.length <= 255){
      this.publicationApiService.handlerAddPublication(text);
      this.publishState();
      amountCharacter = valueInput.length;
    }
    
    return amountCharacter;
  }

}
