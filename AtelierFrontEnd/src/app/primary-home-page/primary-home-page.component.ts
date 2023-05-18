import { Component, ElementRef, OnInit, Renderer2, ViewChild,TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../login/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/service/product';
import axios from 'axios';
import { UtilsServiceService } from '../utils/utils-service.service';


@Component({
  selector: 'app-primary-home-page',
  templateUrl: './primary-home-page.component.html',
  styleUrls: ['./primary-home-page.component.css'],
})

export class PrimaryHomePageComponent implements OnInit {

  public show:boolean=true;
  public usr:any;
  public userparsed:any;
  public userInfo:any;
  public utcDateTime:any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  public cakes:Product[]=[]
  public cart:any;
  public carosleUrl:string=''
  public urlarray:string[]=['https://firebasestorage.googleapis.com/v0/b/arachnoid-a42069.appspot.com/o/Cakes%2F52d421e6-5880-4074-a25e-eb70662d2159.jpg?alt=media&token=6febc586-490f-40f2-8400-64009ce1a02c',
  'https://firebasestorage.googleapis.com/v0/b/arachnoid-a42069.appspot.com/o/Cakes%2Fe1973e37-999c-4807-87fc-8279e981e955.jpg?alt=media&token=6febc586-490f-40f2-8400-64009ce1a02c',
'https://firebasestorage.googleapis.com/v0/b/arachnoid-a42069.appspot.com/o/Cakes%2Fc763e5cc-84e3-4213-b571-20a72ee9e24e.jpg?alt=media&token=6febc586-490f-40f2-8400-64009ce1a02c']




  responsiveOptions: any=[
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
    }];


  constructor(public utilsServiceService : UtilsServiceService,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService , private userService : UserService ) {

  }
  // constructor(public user: UserService ,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.getCakesList()

    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      this.userInfo = usr;
      this.getCart()
    })
    this.utilsServiceService.cartObj$.subscribe(cart => {
      this.cart= cart;
      //console.log(this.cart)
    });
      setInterval(() => {
        this.selectRandomElements(this.urlarray,1)
        console.log(this.carosleUrl)
      }, 1500);
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
  getCakesList(){
    axios.get('getCakesList').then(res => {
      console.log(res.data)
      this.cakes=res.data
    }).catch(err=>console.log(err))
  }
  getCart(){
    axios.get('getCart').then(res => {
      //console.log(res.data)
      this.utilsServiceService.setCartObj(res.data.items)
    }).catch(err=>console.log(err))
  }


  selectRandomElements(array: any[], count: number) {
    const shuffled = [...array]; // Create a shallow copy of the original array
    const result = [];

    // Shuffle the elements using the Fisher-Yates algorithm
    for (let currentIndex = shuffled.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    // Select the first 'count' elements from the shuffled array
    for (let i = 0; i < count; i++) {
      result.push(shuffled[i]);
    }

    this.carosleUrl=result[0];
  }


}




