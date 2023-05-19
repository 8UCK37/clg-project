import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public filteredResults:any[]=[]
  public header:any=''
  public hoverUrl:any="https://firebasestorage.googleapis.com/v0/b/arachnoid-a42069.appspot.com/o/Cakes%2Fbe129de2-e468-4124-9ab4-8c8a12c55a43.jpg?alt=media&token=6febc586-490f-40f2-8400-64009ce1a02c"
  public hoverAlt:any="cake not in db"

  public priceOptions:string[]=['All','Under 700','Between 700 and 1000','1000 and above']
  public selectedPriceRange:any;

  public tagOptions:string[]=['Birthday','Anniversary']
  public selectedTag:any;
  constructor(private router: Router,private route: ActivatedRoute) { }

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
      if(res.data.length!=0){
      this.searchResults=res.data;
      this.filteredResults=res.data
      this.header='Showing results for '+ this.searchTerm
      }else{
        this.header='No matching results found for "'+this.searchTerm+'" ,you can try these instead '
        this.getCakesList();
      }
      console.log(this.searchResults)
    }).catch(err=>console.log(err))
    }

  }
  getCakesList(){
    axios.get('getCakesList').then(res => {
      console.log(res.data)
      this.searchResults=res.data
      this.filteredResults=res.data
    }).catch(err=>console.log(err))
  }
  goToStore(searchTerm:any){
    //console.log(searchTerm)
    this.router.navigate(['store-page'],{ queryParams: { search: searchTerm } });
  }
  onHover(flavor: string) {
    // Perform additional actions when hovering over the buttons
    console.log('Hovering over', flavor);
    axios.post('searchCakes',{searchTerm: flavor}).then(res=>{
      console.log(res.data)
      this.hoverUrl=res.data[0]?.photoUrl
    }).catch(err=>console.log(err))
  }

  priceCap(){

    switch (this.selectedPriceRange) {
      case 'All':
        this.filteredResults=this.searchResults
        break;
      case 'Under 700':
        this.filteredResults=this.filteredResults.filter((obj) => obj.price <= 700);
        break;
      case 'Between 700 and 1000':
        this.filteredResults=this.filteredResults.filter((obj) => obj.price >= 700 && obj.price<=1000);
        break;
      case '1000 and above':
        this.filteredResults=this.filteredResults.filter((obj) => obj.price >= 1000);
        break;
      default:
        // Handle other cases or provide a default value

        break;
    }
    console.log(this.searchResults)
    console.log(this.filteredResults)
  }
  sortByTags(){
    this.filteredResults=this.searchResults.filter((obj) => obj.tags.includes(this.selectedTag))
    console.log(this.searchResults)
    console.log(this.filteredResults)
  }
}
