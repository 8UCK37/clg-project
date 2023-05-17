import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import axios from 'axios';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {
  public userparsed:any;
  public cart:any;
  public totalPrice:any=0;
  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) { }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){
        this.getCart()
        this.utilsServiceService.cartObj$.subscribe(cart => {
          this.cart= cart;
          console.log(this.cart)
          this.getTotalPrice()
        });
      }
    })

  }
  getCart(){
    axios.get('getCart').then(res => {
      //console.log(res.data)
      this.utilsServiceService.setCartObj(res.data.items)
    }).catch(err=>console.log(err))
  }
  getTotalPrice(){
    this.totalPrice=0
    this.cart.forEach((item: any) => {
      this.totalPrice+=item.quantity*item.price
    });
  }
  async onclick(){
    this.getTotalPrice()
    this.utilsServiceService.setCartObj(this.cart)
    await axios.post('addToCart',{data: this.cart}).then(res=>{

    }).catch(err=>console.log(err))
  }
}
