import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { UserService } from 'src/app/login/user.service';
import { Product } from 'src/service/product';

@Component({
  selector: 'app-cake-database',
  templateUrl: './cake-database.component.html',
  styleUrls: ['./cake-database.component.css']
})
export class CakeDatabaseComponent implements OnInit {
  public userparsed:any;
  public cakes:Product[]=[]
  public cols: any[]=[];
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      if(usr){
        this.getCakesList()
      }
      this.cols = [
        {  header: 'Product Id' },
        {  header: 'Name' },
        {  header: 'Description' },
        {  header: 'Price' },
        {  header: 'Size' },
        {  header: 'Category' },
        {  header: 'Theme' },
        {  header: 'Tags' },
        {  header: 'PhotoUrl' }
    ];
    })

  }
  getCakesList(){
    axios.get('getCakesList').then(res => {
      //console.log(res.data)
      this.cakes=res.data
    }).catch(err=>console.log(err))
  }
  editCake(cake:any){
    console.log(cake)
    axios.post('cakeEdit',{data:cake}).then(res => {
      //console.log(res.data)

    }).catch(err=>console.log(err))
  }
}
