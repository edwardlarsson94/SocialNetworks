import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicationGateway } from '../models/Publication/gateway/publication-gateway';
import { PublicationModel } from '../models/Publication/publication';

@Injectable({
  providedIn: 'root'
})

export class GetPublicationUseCases {
  constructor( private _publicationGateway: PublicationGateway) {}

  getAllPublication () : Observable <Array<PublicationModel.Publication>> {
    return this._publicationGateway.getAll();
  }

  publishState (publish :PublicationModel.Publication) : Observable<void> {
    return this._publicationGateway.publish(publish);
  }

  commentsPublication (publicationId: string, comment :PublicationModel.CommentResponse) : Observable<void> {
    return this._publicationGateway.comment(publicationId, comment);
  }

  reactPublication (publicationId: string,react :PublicationModel.React) : Observable<void> {
    return this._publicationGateway.react(publicationId ,react);
  }

}