import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import axios from 'axios';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
interface Flavours {
  name: string;
}
interface Veg {
  name: string;
}
@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css'],
  providers: [MessageService]
})
export class ItemCartComponent implements OnInit {
  public userparsed:any;
  public cart:any;
  public totalPrice:any=0;
  public flavours:Flavours[]=[]
  public veg:Veg[]=[]

  public date!: Date ;
  public minDate!: Date ;
  public maxDate!: Date;

  public requests!:string;
  public info:any
  constructor(private router: Router,private messageService: MessageService,public utilsServiceService : UtilsServiceService,private userService : UserService) { }

  ngOnInit(): void {
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 4); // Set minimum date as 4 days after the current date

    let maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1); // Set maximum date as 1 month from the current date

    this.minDate = minDate;
    this.maxDate = maxDate;

    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){
        this.getUserInfo()
        this.flavours = [
          { name: 'Vanilla' },
          { name: 'Butterscotch' },
          { name: 'Orange' },
          { name: 'Strawberry'},
          { name: 'Chocolate' },
          { name: 'Pineapple' },
          { name: 'Coffee' },
          { name: 'Mango' },
          { name: 'Caramel Delight' },
          { name: 'Choco Vanilla' },
          { name: 'White forest' },
          { name: 'Black forest' },
          { name: 'Chocolate truffle' },
          { name: 'Butterscotch with Caramel Sauce' },
          { name: 'Red velvet with cream cheese' },
          { name: 'Rasamalai' },
          { name: 'Choco - strawberry' },
          { name: 'Nutty Chocolate' },
          { name: 'Chocolate cake with salted Caramel cream and nuts' }
        ];
        this.veg=[
          {name:'With Eggs'},
          {name:'Eggless'}
        ]
        this.getCart()
        this.utilsServiceService.cartObj$.subscribe(cart => {
          this.cart= cart;
          this.cart.forEach((item: any)=> {
            if(item.flavour==null){
              item.falvour={name:'Vanilla'}

            }
            if(item.veg==null){
              item.veg={name:'With Egg'}

            }
          });
          console.log(this.cart)
          this.getTotalPrice()
          this.upDateCartInformation()
        });
      }
    })
  }
  getCart(){
    axios.get('getCart').then(res => {
      //console.log(res.data)
      this.utilsServiceService.setCartObj(res.data.items)
      this.cart=res.data.items
      this.getTotalPrice()
    }).catch(err=>console.log(err))

  }
  getTotalPrice(){
    this.totalPrice=0
    this.cart.forEach((item: any) => {
      this.totalPrice+=item.quantity*item.price
    });
  }
  async changeQuantity(){
    this.getTotalPrice()
    this.utilsServiceService.setCartObj(this.cart)
    await axios.post('addToCart',{data: this.cart}).then(res=>{

    }).catch(err=>console.log(err))
  }
  async removeItem(id:any){
    this.cart.splice(id,1)
    this.getTotalPrice()
    await axios.post('addToCart',{data: this.cart}).then(res=>{
    }).catch(err=>console.log(err))
    console.log(this.cart)
  }
  async select(){
    await axios.post('addToCart',{data: this.cart}).then(res=>{
    }).catch(err=>console.log(err))
    console.log(this.cart)
  }
  async checkOut(){
    if(this.info){
    console.log("checkedout")
    await axios.post('checkout',{items: this.cart,request:this.requests,date:this.date}).then(res=>{
    }).catch(err=>console.log(err))
    this.cart=[]
    this.utilsServiceService.setCartObj(this.cart)
    await axios.post('addToCart',{data: this.cart}).then(res=>{
      window.location.reload()
    }).catch(err=>console.log(err))
    }else{
      this.messageService.add({ severity: 'error', summary: 'No delivery details set', detail: "Please enter your address details first to place orders!!" });
      setTimeout(() => {
        this.router.navigate(['settings']);
      }, 1500);
    }
  }
  upDateCartInformation(){
    this.cart.forEach((item: any) => {
      //console.log(item)
      axios.post('getCakeById',{cakeId:item.id}).then(res => {
        //console.log(res.data)
        item=res.data.price
      }).catch(err=>console.log(err))
    });
  }
  getUserInfo(){
    axios.post('getUserInfo',{id:this.userparsed.id}).then(res => {
      console.log(res.data)
      this.info=res.data.userInfo
    }).catch(err=>console.log(err))
  }
}
