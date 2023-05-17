import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import axios from 'axios';
import { MenuItem, MessageService,ConfirmationService, ConfirmEventType } from 'primeng/api';
import { UserService } from '../login/user.service';
import { UtilsServiceService } from '../utils/utils-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css'],
  providers: [MessageService]

})


export class CakeComponent implements OnInit {

  @Input() cake: any;
  public utcDateTime: any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  visible: boolean=false;
  showSpinner:boolean=false;
  public userparsed:any;
  deleteHeader:string="Delete Post"
  deleteBody:string="Are you sure you want to delete this post?"
  deleteSuccess:boolean=false;
  public cart:any[]=[];

  constructor(public utilsServiceService : UtilsServiceService, public userService:UserService,private router: Router) {

  }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
    })

    this.utilsServiceService.cartObj$.subscribe(cart => {
      this.cart= cart;

    });
  }

  utcToLocal(utcTime: any) {
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone: this.timeZone });
  }

  goToPostPage(){
    //console.log(this.childPost.id)
    this.router.navigate(['item-page'],{ queryParams: { item_id: this.cake.id } });
  }
  async addTocart(){
    if(this.cart.length!=0){
      if(this.cart.find(element => element.id === this.cake.id)){
        console.log('present')
        this.cart.find(element => element.id === this.cake.id).quantity+=1
      }else{
        this.cake.quantity=1
        this.cart.push(this.cake)
      }
    }else{
      this.cake.quantity=1
      this.cart.push(this.cake)
    }

    this.utilsServiceService.setCartObj(this.cart)
    if(this.userparsed){
    await axios.post('addToCart',{data: this.cart}).then(res=>{

    }).catch(err=>console.log(err))
    }
  }
}
