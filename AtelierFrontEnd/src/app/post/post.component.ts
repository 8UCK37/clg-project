import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import axios from 'axios';
import { CommentService } from './comment.service';
import { MenuItem, MessageService,ConfirmationService, ConfirmEventType } from 'primeng/api';
import { UserService } from '../login/user.service';
import { UtilsServiceService } from '../utils/utils-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [MessageService]

})


export class PostComponent implements OnInit {

  @Input() childPost: any;
  @ViewChild('comment') comment!: ElementRef;
  @ViewChild('closeComments') closeComments!: ElementRef;
  @ViewChild('commentbtn') commentbtn!: ElementRef;

  parentComment: any;
  @Input() public commentOpen: boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  myInterval = 0;
  public postsByTag=[];
  activeSlideIndex = 0;
  public utcDateTime: any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // commentData: Comment[] = [];
  public treeObj: any = {}
  images: any[] =[];
  galeriaPosition: string = 'bottom';
  responsiveOptions: any[] = [];
  items:any[]=[];
  public ownPosts:any=[];
  delay:number=90;
  radi:number=100;
  confirmPosition:string ="top";
  visible: boolean=false;
  showSpinner:boolean=false;
  public userparsed:any;
  deleteHeader:string="Delete Post"
  deleteBody:string="Are you sure you want to delete this post?"
  deleteSuccess:boolean=false;
  constructor(public utilsServiceService : UtilsServiceService, public userService:UserService,private commentService: CommentService,private renderer: Renderer2, @Inject(DOCUMENT) document: Document,private router: Router) {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   const clickedElement = e.target as HTMLElement;
    //   const clickedElementClassList = clickedElement.classList;
    //   if (!this.comment?.nativeElement.contains(e.target as HTMLElement) && !this.commentbtn?.nativeElement.contains(e.target as HTMLElement)) {
    //     if(this.commentOpen && clickedElementClassList[0]!='comment-btn'){
    //     this.closeComments.nativeElement.click();
    //     this.commentOpen=false
    //   }
    //     //console.log("caught")
    //   }
    // });
  }


  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;

    })

    this.commentService.postsObj$.subscribe(posts => {
      this.postsByTag= posts;
    });

  }




  utcToLocal(utcTime: any) {
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone: this.timeZone });
  }
  openComment(post: any) {
    console.log(post)
    this.commentOpen = true
    this.commentService.setCommentObj({open:this.commentOpen,id:post.id});
  }

  goToPostPage(){
    //console.log(this.childPost.id)
    this.router.navigate(['post-page'],{ queryParams: { post_id: this.childPost.id } });
  }


}
