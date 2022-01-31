import { Component, OnInit } from '@angular/core';
import { PublicationModel } from 'src/app/domain/models/Publication/publication';
import { GetPublicationUseCases } from 'src/app/domain/usecase/get-publication-use-case';
import { PublicationApiService } from 'src/app/infrastructure/adapters/publication-api.service';

@Component({
  providers:[],
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publications:PublicationModel.Publication[] = [];
  
  constructor(private __getPublicationUseCases:GetPublicationUseCases,
  private publicationApiService:PublicationApiService) { }
  
  ngOnInit(): void {
    this.obseMethod();
    this.getAllPublication();
  }

  obseMethod() {
    this.publicationApiService.comments$.subscribe((data:PublicationModel.Publication[])=>{
      if(data){
        this.publications = data;
      }
    });
  }

  getAllPublication(){
    this.__getPublicationUseCases.getAllPublication().subscribe((data)=>{
      this.publications = [...data];
    });
  }

}
