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
      console.log(res.data)
      this.orderList=res.data
    }).catch(err=>console.log(err))
  }
}
