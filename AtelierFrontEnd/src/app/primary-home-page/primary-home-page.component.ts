import { Component, ElementRef, OnInit, Renderer2, ViewChild,TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../login/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentService } from '../post/comment.service';
import { Product } from 'src/service/product';


@Component({
  selector: 'app-primary-home-page',
  templateUrl: './primary-home-page.component.html',
  styleUrls: ['./primary-home-page.component.css'],
})

export class PrimaryHomePageComponent implements OnInit {

  public show:boolean=true;
  public usr:any;
  public userparsed:any;
  public userInfo:any;
  public utcDateTime:any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  products: Product[]=[
    {
      id: '1',
      name: 'Blue Cake',
      description: 'Product Description',
      photoUrl: 'https://alittlecake.com/wp-content/uploads/2022/04/Marble-Geode-Cake-.jpg',
      price: 65,
      category: 'Accessories',
      theme:'set a theme',
      tags:'tag1,tag2',
      rating: 5
  },
  {
      id: '2',
      name: 'Teddy Cake',
      description: 'Product Description',
      photoUrl: 'https://chelsweets.com/wp-content/uploads/2022/11/recipe-card-penguin-cake-closer-735x980.jpg',
      price: 72,
      category: 'Accessories',
      theme:'set a theme',
      tags:'tag1,tag2',
      rating: 4
  },
  {
      id: '3',
      name: 'Anniversary',
      description: 'Product Description',
      photoUrl: 'https://cdn.shopify.com/s/files/1/0491/4646/2359/products/green-engagement-cake-kukkr-cakes-1.jpg?v=1678855554',
      price: 79,
      category: 'Fitness',
      theme:'set a theme',
      tags:'tag1,tag2',
      rating: 3
  },
  {
      id: '4',
      name: 'Anniversary',
      description: 'Product Description',
      photoUrl: 'https://www.brides.com/thmb/9vjyeuwH4DpjsG-kAKGO4vkIJyc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KyleJohnPhotography-4cc9c2f6525b42158e0069d635c399e6.jpeg',
      price: 29,
      category: 'Clothing',
      theme:'set a theme',
      tags:'tag1,tag2',
      rating: 5
  },
  {
      id: '5',
      name: 'Choclate',
      description: 'Product Description',
      photoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
      price: 15,
      category: 'Accessories',
      theme:'set a theme',
      tags:'tag1,tag2',
      rating: 4
  },
  {
    id: '6',
    name: 'Blue Cake',
    description: 'Product Description',
    photoUrl: 'https://alittlecake.com/wp-content/uploads/2022/04/Marble-Geode-Cake-.jpg',
    price: 65,
    category: 'Accessories',
    theme:'set a theme',
    tags:'tag1,tag2',
    rating: 5
},
{
    id: '7',
    name: 'Teddy Cake',
    description: 'Product Description',
    photoUrl: 'https://chelsweets.com/wp-content/uploads/2022/11/recipe-card-penguin-cake-closer-735x980.jpg',
    price: 72,
    category: 'Accessories',
    theme:'set a theme',
    tags:'tag1,tag2',
    rating: 4
},
{
    id: '8',
    name: 'Anniversary',
    description: 'Product Description',
    photoUrl: 'https://cdn.shopify.com/s/files/1/0491/4646/2359/products/green-engagement-cake-kukkr-cakes-1.jpg?v=1678855554',
    price: 79,
    category: 'Fitness',
    theme:'set a theme',
    tags:'tag1,tag2',
    rating: 3
},
{
    id: '9',
    name: 'cake4',
    description: 'Product Description',
    photoUrl: 'https://www.brides.com/thmb/9vjyeuwH4DpjsG-kAKGO4vkIJyc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KyleJohnPhotography-4cc9c2f6525b42158e0069d635c399e6.jpeg',
    price: 29,
    category: 'Clothing',
    theme:'set a theme',
    tags:'tag1,tag2',
    rating: 5
},
{
    id: '10',
    name: 'White Cake',
    description: 'Product Description',
    photoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
    price: 15,
    category: 'Accessories',
    theme:'set a theme',
    tags:'tag1,tag2',
    rating: 4
}
  ];
  images:any=[]
  responsiveOptions: any=[];
  constructor(private commentService: CommentService,public user: UserService ,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService , private userService : UserService ) {

  }
  // constructor(public user: UserService ,private auth: AngularFireAuth,private renderer: Renderer2,private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.usr = localStorage.getItem('user');
    this.userparsed = JSON.parse(this.usr);
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      this.userInfo = usr;

    })
    // this.utilsServiceService.modalObj$.subscribe((modalData:any)=>{
    //   console.log(modalData)
    // })

  this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  toggleMenu() {
    this.show=!this.show;
  }

  utcToLocal(utcTime:any){
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone:this.timeZone });
  }

  onNextClick(event:any) {
    event.preventDefault();
  }

}



