import { Injectable } from '@angular/core';
import { PublicationGateway } from 'src/app/domain/models/Publication/gateway/publication-gateway';
import { Observable,of, Subject } from 'rxjs';
import { PublicationModel } from 'src/app/domain/models/Publication/publication';
import { dataSocialNetwork } from 'src/app/data-api/dataSocialNetwork';
import { getCurrentDateInNumber, getElapsedTime } from 'src/app/infrastructure/helpers/libs/formater-date-mappers';
import { setElasedTimeAllDate } from '../helpers/publication-mappers';

@Injectable({
  providedIn: 'root'
})
export class PublicationApiService extends PublicationGateway {

  comments$ = new Subject<PublicationModel.Publication[]>();
  private __publications: PublicationModel.Publication[]=[];

  constructor() {
    super();
    this.configInitial();
  }

  configInitial(){
    const commentsLocal: PublicationModel.Publication[] = JSON.parse(localStorage.getItem('allPublications')!) || [];
    if (commentsLocal.length == 0) {
      const commnetsAPI = [...dataSocialNetwork];
      this.__publications = commnetsAPI;
      localStorage.setItem('allPublications', JSON.stringify(this.__publications));
    } else {
      this.__publications = commentsLocal;
    }
  }

  getAll(): Observable<PublicationModel.Publication[]> {
    return of(setElasedTimeAllDate(this.__publications));
  }

  comment(publicationId: string, comment: PublicationModel.CommentResponse): Observable<void> {
    for (const comments of this.__publications) {
      if (comments.id === publicationId) {
          comments.comments.push(comment);
          break;
      }
    }
    localStorage.setItem('allPublications', JSON.stringify(this.__publications));
    this.comments$.next(setElasedTimeAllDate(this.__publications));
    return of();
  }

  publish(publish: PublicationModel.Publication): Observable<void> {
    this.__publications = [...this.__publications,publish];
    this.comments$.next(setElasedTimeAllDate(this.__publications));
    localStorage.setItem('allPublications', JSON.stringify(this.__publications));
    return of();
  }

  react(publicationId: string, react: PublicationModel.React): Observable<void> {
    for (const comment of this.__publications) {
      if (comment.id === publicationId) {
          let reactions = comment.react;
          if (reactions.length === 0) {
              reactions.push(react);
          } else {
              const index = reactions.findIndex(element => element.userId == react.userId);
              if (index == -1) {
                  reactions.push(react);
              } else {
                  if (reactions[index].name == react.name) {
                      reactions.splice(index,1);
                  } else {
                      reactions[index].name= react.name
                      reactions[index].img = react.img
                  }
              }
          }
          break;
      }
  }

  localStorage.setItem('allPublications', JSON.stringify(this.__publications));
  let publicTotal = setElasedTimeAllDate(this.__publications);
  this.comments$.next(publicTotal);
    return of();
  }

  handlerAddPublication(content: string): void {
    const dateCurrent = getCurrentDateInNumber();
    const newPublication: PublicationModel.Publication = {
      id: `${dateCurrent}`,
      userImg: '../../../../assets/images/users/user4.png',
      userName: 'Edward Vega',
      date: {
        date: dateCurrent,
        dateMap: getElapsedTime(dateCurrent)
      },
      content: content,
      react: [],
      comments: []
    }
    this.publish(newPublication)
  }
}