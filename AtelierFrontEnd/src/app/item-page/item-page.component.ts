import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Product } from 'src/service/product';
import { UtilsServiceService } from '../utils/utils-service.service';
import { UserService } from '../login/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
  providers: [MessageService]
})
export class ItemPageComponent implements OnInit {
  public itemId:any;
  public cake:any;
  public cakes:Product[]=[]
  public rndCake:any[]=[]
  public cart:any[]=[];
  public userparsed:any;
  constructor(private messageService: MessageService,public utilsServiceService : UtilsServiceService,private route: ActivatedRoute,public userService:UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.itemId = params['item_id'];
      console.log(this.itemId)
      this.getcakeById()
      this.getCakesList()
    });
    this.utilsServiceService.cartObj$.subscribe(cart => {
      this.cart= cart;

    });
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
    })
  }

  getcakeById(){
    axios.post('getCakeById',{cakeId:this.itemId}).then(res => {
      console.log(res.data)
      this.cake=res.data
    }).catch(err=>console.log(err))
  }
  getCakesList(){
    axios.get('getCakesList').then(res => {
      console.log(res.data)
      this.cakes=res.data
      this.selectRandomElements(this.cakes,4)
      console.log(this.rndCake)
    }).catch(err=>console.log(err))
  }
  selectRandomElements(array: any[], count: number) {
    const shuffled = [...array]; // Create a shallow copy of the original array
    const result = [];

    // Shuffle the elements using the Fisher-Yates algorithm
    for (let currentIndex = shuffled.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    // Select the first 'count' elements from the shuffled array
    for (let i = 0; i < count; i++) {
      result.push(shuffled[i]);
    }

    this.rndCake=result;
  }
  getMoreProduct(){
    this.selectRandomElements(this.cakes,4)
  }

  async addTocart(){
    if(this.userparsed){

    if(this.cart.length!=0){
      if(this.cart.find(element => element.id === this.cake.id)){
        console.log('present')
        this.cart.find(element => element.id === this.cake.id).quantity+=1
      }else{
        this.cake.quantity=1
        this.cart.push(this.cake)
      }
    }else{
      this.cake.quantity=1
      this.cart.push(this.cake)
    }

    this.utilsServiceService.setCartObj(this.cart)
    this.messageService.add({ severity: 'success', summary: 'Accepted', detail: "Item Added to cart" });
    await axios.post('addToCart',{data: this.cart}).then(res=>{

    }).catch(err=>console.log(err))
  }else{
    this.messageService.add({ severity: 'warn', summary: 'Login/Signup', detail: "You have to login/signup to add-to-cart" });
  }
  }

}
