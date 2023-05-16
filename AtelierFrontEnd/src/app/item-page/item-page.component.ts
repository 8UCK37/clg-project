import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  public itemId:any;
  public cake:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.itemId = params['item_id'];
      console.log(this.itemId)
      this.getcakeById()
    });
  }

  getcakeById(){
    axios.post('getCakeById',{cakeId:this.itemId}).then(res => {
      console.log(res.data)
      this.cake=res.data
    }).catch(err=>console.log(err))
  }
}
