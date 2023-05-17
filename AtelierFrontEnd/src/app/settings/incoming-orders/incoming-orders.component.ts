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
  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) { }

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

}
