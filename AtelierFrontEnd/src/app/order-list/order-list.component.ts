import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { ChatServicesService } from '../chat-page/chat-services.service';
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
  public recData: any;
  private incomingNotiSubscription: Subscription | undefined;
  constructor(private socketService: ChatServicesService,public utilsServiceService : UtilsServiceService,private userService : UserService) {
    this.events = [
      { status: 'Accepted', date: '15/10/2020 10:30', icon: 'pi pi-thumbs-up', color: '#06b6d4' },
      { status: 'Prepping', date: '15/10/2020 14:00', icon: 'pi pi-stopwatch', color: '#76db9b' },
      { status: 'Out for delivery', date: '15/10/2020 16:15', icon: 'pi pi-truck', color: '#eec137' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#6dd3c8' }
    ];
   }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){
        this.incNotification();
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
  incNotification() {
    this.incomingNotiSubscription = this.socketService.getIncomingNoti().subscribe((data) => {
      this.recData = typeof data === 'string' ? JSON.parse(data) : data;
      console.log(this.recData);
      if(this.recData.notification=='orderUpdate'){
        this.getOrders()
      }

    });
  }
  selectedElements(orderStatus: string): any[]{
    switch (orderStatus) {
      case 'Accepted':
        return [this.events[0]];
      case 'Prepping':
        return [this.events[0],this.events[1]];
      case 'Out for delivery':
        return [this.events[0],this.events[1],this.events[2]];
      case 'Delivered':
        return this.events
      default:
        return [];
    }
  };


}
