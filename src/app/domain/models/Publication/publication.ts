
export namespace PublicationModel {

  export interface Publication {
    id:string,
    userImg:string,
    userName: string,
    date:CustomDate,
    content: string,
    react:React[], 
    comments: CommentResponse[]
  }

  export interface CustomDate {
    date: number,
    dateMap: string,
  }

  export interface React {
    name: string,
    img: string,
    userId: string
    userImg: string,
  }

  export interface CommentResponse {
    userName: string,
    userImg: string,
    content:string,
    date:CustomDate
  }
}
