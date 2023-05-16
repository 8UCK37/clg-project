import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import axios from 'axios';
import { MenuItem, MessageService,ConfirmationService, ConfirmEventType } from 'primeng/api';
import { UserService } from '../login/user.service';
import { UtilsServiceService } from '../utils/utils-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css'],
  providers: [MessageService]

})


export class CakeComponent implements OnInit {

  @Input() cake: any;
  public utcDateTime: any;
  public timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  visible: boolean=false;
  showSpinner:boolean=false;
  public userparsed:any;
  deleteHeader:string="Delete Post"
  deleteBody:string="Are you sure you want to delete this post?"
  deleteSuccess:boolean=false;
  constructor(public utilsServiceService : UtilsServiceService, public userService:UserService,private renderer: Renderer2, @Inject(DOCUMENT) document: Document,private router: Router) {

  }


  ngOnInit(): void {
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      this.userparsed = usr;

    })

  }

  utcToLocal(utcTime: any) {
    this.utcDateTime = new Date(utcTime);
    return this.utcDateTime.toLocaleString('en-US', { timeZone: this.timeZone });
  }

  goToPostPage(){
    //console.log(this.childPost.id)
    this.router.navigate(['item-page'],{ queryParams: { item_id: this.cake.id } });
  }
}
