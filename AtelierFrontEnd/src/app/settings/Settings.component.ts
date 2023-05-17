import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { UserService } from '../login/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css']
})
export class SettingsComponent implements OnInit {
  public newUserName: String="";
  posts: any;
  public userparsed:any;
  public userInfo:any={name:""};
  public bio:any;
  public info:any={Locality:'',zipcode:'',Address:'',Landmark:'',Phoneno:''};

  public tab:any;


  constructor(public userService:UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.tab = params['tab'];
      //console.log(this.tab)
    })
    this.userService.userCast.subscribe(usr=>{
      //console.log("user data" , usr)
      if(usr){
      this.userparsed = usr;
      this.userInfo = usr;
      //console.log(this.userInfo)
      this.newUserName=this.userparsed.name
      this.bio = this.userInfo?.bio;
      axios.post('getUserInfo',{id:usr.id}).then(res => {
        //console.log(res.data)
        if(res.data.userInfo){
          this.info=res.data.userInfo;
        }
        //console.log(res.data.userInfo)
      }).catch(err=>console.log(err))
    }
    })
  }

  async changeName() {
    console.log(this.newUserName);
    await axios.post('userNameUpdate', { name: this.newUserName }).then(res => {
      //console.log(res.data
      //console.log(res.data.profilePicture)
    }).catch(err => console.log(err))
    window.location.reload();
  }


  updateinfo(){
    console.log(this.info)
    axios.post('/saveUserInfo', {Locality:this.info.Locality,zipcode:this.info.zipcode,Address:this.info.Address,Landmark:this.info.Landmark,Phoneno:this.info.Phoneno}
    ).catch(err=>console.log(err))
  }

}
