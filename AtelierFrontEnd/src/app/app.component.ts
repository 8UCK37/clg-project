import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { PrimaryHomePageComponent } from './primary-home-page/primary-home-page.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserService } from './login/user.service';
import { CommentService } from './post/comment.service';
import { Subscription } from 'rxjs';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message:any = null;
  [x: string]: any;
  hidenavbar=false
  token:any;
  commentOpen!: boolean;
  treeObj: any;
  private treeObjSub!: Subscription;
  constructor(private commentService: CommentService,private service : UserService){
    // console.log(this.service.userData )

  }
  ngOnInit(): void {
    this.token= localStorage.getItem('token')
    //console.log(this.token)
    axios.defaults.headers.common['authorization'] = `Bearer ${this.token}`
    axios.defaults.baseURL = environment.endpointUrl;

  }
  update(e:any){

    console.log( e)
  }

}
