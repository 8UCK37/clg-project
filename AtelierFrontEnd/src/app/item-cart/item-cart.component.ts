import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {
  public userparsed:any;
  public cart:any;
  constructor(public utilsServiceService : UtilsServiceService,private userService : UserService) { }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;

    })
    this.utilsServiceService.cartObj$.subscribe(cart => {
      this.cart= cart;
      console.log(this.cart)
    });
  }

}
