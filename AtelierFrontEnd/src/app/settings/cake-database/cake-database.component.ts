import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { UserService } from 'src/app/login/user.service';
import { Product } from 'src/service/product';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cake-database',
  templateUrl: './cake-database.component.html',
  styleUrls: ['./cake-database.component.css'],
  providers: [MessageService]
})
export class CakeDatabaseComponent implements OnInit {
  public userparsed:any;
  public cakes:Product[]=[]
  public cols: any[]=[];
  constructor(private messageService: MessageService,private userService : UserService) { }

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
    this.messageService.add({ severity: 'success', summary: 'The entry was updated', detail: "The entry with id: "+cake.id.toString()+" was updated successfully" })
    axios.post('cakeEdit',{data:cake}).then(res => {
      //console.log(res.data)
    }).catch(err=>console.log(err))
  }
  deleteCake(cake:any){
    console.log(cake)
    this.messageService.add({ severity: 'info', summary: 'The entry was deleted', detail: "The entry with id: "+cake.id.toString()+" was deleted successfully" })
    // axios.post('cakeEdit',{data:cake}).then(res => {
    axios.post('cakeDelete',{data:cake}).then(res => {
      //console.log(res.data)
    }).catch(err=>console.log(err))
  }
}
