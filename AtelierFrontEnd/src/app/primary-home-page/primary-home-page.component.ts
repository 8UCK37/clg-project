import { Component, ElementRef, OnInit, Renderer2, ViewChild,TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../login/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/service/product';
import axios from 'axios';
import { UtilsServiceService } from '../utils/utils-service.service';
import { Router } from '@angular/router';


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
  public counter:number=0;

  public urlarray:string[]=['https://sweetcrunch.in/wp-content/uploads/2016/12/img1-1-750x400.jpg',
        'https://cakesrus.store/image/cache/catalog/Slider%20Images/Cake%20slider%201-1000x500h.jpg',
        'https://www.madewithdelmonte.in/uploads/christmas-cake-slider.jpg',
        'https://cdn.shopify.com/s/files/1/0272/5848/6851/files/slide05_124ae589-51dd-4e69-bee1-3310b09fbf0e_1800x.jpg?v=1667895282']


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


  constructor(private router: Router,public utilsServiceService : UtilsServiceService,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService , private userService : UserService ) {

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
      //console.log(this.counter)
        if(this.counter==3){
          this.counter=0;
        }
        else{
          this.counter++;
        }
      }, 3500);
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

  goToStore(searchTerm:any){
    //console.log(searchTerm)
    this.router.navigate(['store-page'],{ queryParams: { search: searchTerm } });
  }
  onHover(flavor: string) {
    // Perform additional actions when hovering over the buttons
    console.log('Hovering over', flavor);
  }
}




