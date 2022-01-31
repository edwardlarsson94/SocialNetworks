import { Component, Input, OnInit } from '@angular/core';
import { PublicationModel } from 'src/app/domain/models/Publication/publication';
import { PublicationApiService } from 'src/app/infrastructure/adapters/publication-api.service';
import { getCurrentDateInNumber, getElapsedTime } from 'src/app/infrastructure/helpers/libs/formater-date-mappers';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comment!: PublicationModel.Publication;
  
  totalComments: number = 0
  totalReactions: number = 0
  selfReaction?: PublicationModel.React = undefined

  inputCommentResponse: string = '';
  isShowAllComments: boolean = false;
  isShowAddCommentResponse: boolean = false;
  isVisible:boolean = false;

  constructor(
    private publicationApiService:PublicationApiService
    ) {
  }

  ngOnInit(): void {
    this.reactionComment();
    this.obseMethod();
  }

  clearState(){
    this.inputCommentResponse = '';
  }


  obseMethod() {
    this.publicationApiService.comments$.subscribe((data:PublicationModel.CommentResponse[])=>{
      if(data){
        this.reactionComment();
        this.isVisible=false;
      }
    });
  }
  
  reactionComment () {
      this.totalComments = this.comment.comments.length;
      this.totalReactions = this.comment.react.length;
      const ownSelfReaction = this.comment.react.find(element => element.userId == "123123123");
      if (ownSelfReaction) {
        this.selfReaction = ownSelfReaction
      } else {
        this.selfReaction = undefined
      }
  }

  handlerAddNewCommentResponse(idComment: string) {
    this.isVisible = false;
    const valueInput = this.inputCommentResponse.trim();
    if ( valueInput.length === 0 ) { return; }

    const dateCurrent = getCurrentDateInNumber();
    const newCommentResponse: PublicationModel.CommentResponse = {
      userName: 'Edward Vega',
      userImg: '../../../../assets/images/users/user4.png',
      content: this.inputCommentResponse ,
      date: {
        date: dateCurrent,
        dateMap: getElapsedTime(dateCurrent)
      }
    }
    this.publicationApiService.comment(idComment, newCommentResponse)
    this.clearState();
    this.toggleNewCommentResponse();
    if (!this.isShowAllComments) { this.toggleAllComments() }
    this.isShowAllComments = false;
  }

  toggleAllComments() {
    this.isVisible = false;
    this.isShowAllComments = !this.isShowAllComments;
    this.isShowAddCommentResponse = false;
  }

  toggleNewCommentResponse() {
    this.isVisible = false;
    this.isShowAddCommentResponse = !this.isShowAddCommentResponse;
    this.isShowAllComments = false;
  }

  showReactions() {
    this.isVisible = !this.isVisible;
  }

  processReactions(reaction: string) {
    this.showReactions();
    const objReactions =  this.getSrcReactionsIcon(reaction);
    if (objReactions) {
      const newReaction: PublicationModel.React = {
        name: objReactions.name,
        img: objReactions.srcIcon,
        userId: "123123123",
        userImg: "../../../../assets/images/users/user4.png"
      };
      this.publicationApiService.react(this.comment.id, newReaction)
    }

  }

  getSrcReactionsIcon(reaction: string):any | null  {
    let path = '../../../../assets/images/publicatios/';
    let reactions:any | null = null;

    switch (reaction.toLocaleLowerCase()) {
      case "like":
        return reactions = {
          name: "Me gusta",
          srcIcon: `${path}like.svg`
        };
      case "happy":
        return reactions = {
          srcIcon: `${path}happy.svg`,
          name: "Me divierte"
        };
      case "love":
        return reactions = {
          srcIcon: `${path}love.svg`,
          name: "Me encanta"
        };
      case "crying":
        return reactions = {
          srcIcon: `${path}crying.svg`,
          name: "Me deprime"
        };
      case "sad":
        return reactions = {
          srcIcon: `${path}sad.svg`,
          name: "Me entristece"
        };
      case "boring":
        return reactions = {
          srcIcon: `${path}boring.svg`,
          name: "Me aburre"
        }
    
      default:
        return reactions
    }
    
  }

}
