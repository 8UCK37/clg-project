import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from 'src/app/login/user.service';
import { UtilsServiceService } from 'src/app/utils/utils-service.service';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent implements OnInit {
  public userparsed:any;
  public orderList:any=[]
  public orderHistory:any=[]
  public orderPending:any=[]
  public status: string='pending';
  public events: any[]=[]
  public align:string='right'
  public tabSeleted:any='Upcoming Orders'
  public utcDateTime:any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  constructor(private router: Router,public utilsServiceService : UtilsServiceService,private userService : UserService) {
    this.events = [
      { status: 'Accepted', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
      { status: 'Prepping', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Out for delivery', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', icon: 'pi pi-check', color: '#607D8B' }
  ];
   }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
    })
    this.getOrders()
  }

   getOrders(){
      this.orderList=[]
      this.orderHistory=[]
      this.orderPending=[]
    axios.get('getOrders').then(res=>{
    //console.log(res.data)
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
     //console.log(this.orderList)
     //console.log(this.orderHistory)
     //console.log(this.orderPending)
   }).catch(err=>console.log(err))
 }
  updateOrderStatus(order:any){
    console.log(order)
    axios.post('updateOrderStatus',{orderId:order.id,status:order.status}).then(res=>{

    }).catch(err=>console.log(err))
  }
  utcToLocal(utcTime:any){
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone:this.timeZone });
  }
  goToUserChat(userId:any){
    //console.log(userId)
    this.router.navigate(['chat'],{ queryParams: { order: userId } });
  }
}
