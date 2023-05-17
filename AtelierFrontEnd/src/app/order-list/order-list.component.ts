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
  public tabSeleted:any='All Orders'
  public utcDateTime:any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  public events: any[]=[]
  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) {
    this.events = [
      { status: 'Accepted', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#06b6d4' },
      { status: 'Prepping', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Out for delivery', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
   }

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
      this.orderList=[]
      this.orderHistory=[]
      this.orderPending=[]
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
