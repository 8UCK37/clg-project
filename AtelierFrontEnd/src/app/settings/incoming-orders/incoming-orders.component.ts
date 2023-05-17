import { Component, OnInit } from '@angular/core';
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
  public orderList:any;
  public status: string='pending';
  public events: any[]=[]
  public align:string='right'
  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) {
    this.events = [
      { status: 'Accepted', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Prepping', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Out for delivery', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
   }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
    })
    this.getOrders()
  }

  async getOrders(){
    await axios.get('getOrders').then(res=>{
      console.log(res.data)
      this.orderList=res.data
    }).catch(err=>console.log(err))
  }

  updateOrderStatus(order:any){
    console.log(order)
    axios.post('updateOrderStatus',{orderId:order.id,status:order.status}).then(res=>{
      
    }).catch(err=>console.log(err))
  }
}
