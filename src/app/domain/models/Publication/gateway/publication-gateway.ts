import { Observable } from 'rxjs';
import { PublicationModel } from '../publication';

export abstract class PublicationGateway {
    abstract getAll(): Observable<Array<PublicationModel.Publication>>;
    abstract publish (publish :PublicationModel.Publication) : Observable<void>;
    abstract comment (publicationId: string, comment :PublicationModel.CommentResponse) : Observable<void>;
    abstract react (publicationId: string, react :PublicationModel.React) : Observable<void>;
} 