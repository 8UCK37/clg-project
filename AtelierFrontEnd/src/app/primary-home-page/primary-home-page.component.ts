import { Component, ElementRef, OnInit, Renderer2, ViewChild,TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import axios from 'axios';
import { UserService } from '../login/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentService } from '../post/comment.service';
import { UtilsServiceService } from '../utils/utils-service.service';
import { Product } from 'src/service/product';
import { ProductService } from 'src/service/productservice';

@Component({
  selector: 'app-primary-home-page',
  templateUrl: './primary-home-page.component.html',
  styleUrls: ['./primary-home-page.component.css'],
  providers: [ ProductService ]
})

export class PrimaryHomePageComponent implements OnInit {
  @ViewChild('comment') comment!: ElementRef;
  @ViewChild('closeComments') closeComments!: ElementRef;
  @ViewChild('commentbtn') commentbtn!: ElementRef;
  @ViewChild('imageInput') input!:ElementRef;
  @ViewChild('tagInput') tagInput!:ElementRef;
  @ViewChild('textInput') textInput!:ElementRef;
  public modalRef?: BsModalRef;
  public show:boolean=true;
  public formData: any;
  public selectedImage: any;
  public usr:any;
  public userparsed:any;
  public userInfo:any;
  public utcDateTime:any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  myInterval = 0;
  activeSlideIndex = 0;
  products: Product[]=[];

  responsiveOptions: any=[];
  constructor(private productService: ProductService,private commentService: CommentService,public user: UserService ,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService , private userService : UserService ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.comment?.nativeElement.contains(e.target as HTMLElement) && e.target !== this.commentbtn?.nativeElement) {
        this.closeComments?.nativeElement.click();
      }
    });

  }
  // constructor(public user: UserService ,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.usr = localStorage.getItem('user');
    this.userparsed = JSON.parse(this.usr);
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      this.userInfo = usr;

    })
    // this.utilsServiceService.modalObj$.subscribe((modalData:any)=>{
    //   console.log(modalData)
    // })
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
  });

  this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  toggleMenu() {
    this.show=!this.show;
  }



  utcToLocal(utcTime:any){
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone:this.timeZone });
  }

  onNextClick(event:any) {
    event.preventDefault();
  }

}



