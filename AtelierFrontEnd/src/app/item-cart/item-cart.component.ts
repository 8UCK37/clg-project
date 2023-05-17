import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import axios from 'axios';
import { FormControl, FormGroup } from '@angular/forms';
interface Flavours {
  name: string;
}
interface Veg {
  name: string;
}
@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {
  public userparsed:any;
  public cart:any;
  public totalPrice:any=0;
  public flavours:Flavours[]=[]
  public veg:Veg[]=[]

  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) { }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){
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
            item.flavour.name='Vanilla'
            item.veg.name='With Eggs'
          });
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
  removeItem(id:any){
    this.cart.splice(id,1)
    this.onclick()
    console.log(this.cart)
  }
  checkOut(){
    console.log(this.cart)
  }

}
