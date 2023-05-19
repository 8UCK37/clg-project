import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Product } from 'src/service/product';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {
  public searchTerm:any;
  public searchResults: any[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      if (Object.keys(params).length === 0) {
        // No query parameters
        console.log('No query parameters found');
          this.getCakesList();
        // Handle the case of no query parameters
      } else {
        this.searchTerm = params['search'];
        console.log(this.searchTerm);
        this.searchCakes();
      }
    });

  }
  async searchCakes(){
    this.searchResults=[];
    if(this.searchTerm?.length!=0){
    await axios.post('searchCakes',{searchTerm: this.searchTerm}).then(res=>{
      this.searchResults=res.data;
      console.log(this.searchResults)
    }).catch(err=>console.log(err))
    }

  }
  getCakesList(){
    axios.get('getCakesList').then(res => {
      console.log(res.data)
      this.searchResults=res.data
    }).catch(err=>console.log(err))
  }
}
