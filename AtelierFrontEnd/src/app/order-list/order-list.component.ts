import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import axios from 'axios';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public userparsed:any;
  public totalPrice:any=0;
  public orderList:any=[]
  public orderHistory:any=[]
  public orderPending:any=[]
  public utcDateTime:any;
  public tabSeleted:any='All Orders'
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) { }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){

        this.getOrders()
      }
    })
  }
  getOrders(){
     axios.get('getOrdersForUser').then(res=>{
      this.orderList=res.data
      this.orderList.forEach((order: any) => {
        order.total=0
        order.items.forEach((items: any) => {
          order.total+=items.quantity*items.price
        });
        if(order.status=='Delivered'){
          this.orderHistory.push(order)
        }else{
          this.orderPending.push(order)
        }
      });
      console.log(this.orderList)
      console.log(this.orderHistory)
      console.log(this.orderPending)
    }).catch(err=>console.log(err))
  }
  utcToLocal(utcTime:any){
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone:this.timeZone });
  }

}
