import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Product } from 'src/service/product';
@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public itemId:any;
  public cake:any;
  public cakes:Product[]=[]
  public rndCake:any[]=[]
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.itemId = params['item_id'];
      console.log(this.itemId)
      this.getcakeById()
      this.getCakesList()
    });
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
}
