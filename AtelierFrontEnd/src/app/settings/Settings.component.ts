import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { UserService } from '../login/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit {
  public newUserName: String="";
  posts: any;
  public userparsed:any;
  public userInfo:any={name:""};
  public bio:any;
  public info:any={Locality:'',zipcode:'',Address:'',Landmark:'',Phoneno:''};

  public tab:any;


  constructor(private messageService: MessageService,public userService:UserService,private route: ActivatedRoute) { }

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
    const phonenoPattern = /^\d{10}$/;
    const localityPattern = /^[\w\s/]+$/;
    const landmarkPattern = /^[\w\s]+$/;
    const addressPattern = /^[\w\s\/,]+$/;
    const zipcodePattern = /^\d{6}$/;

    // Validate phoneno
    if (!phonenoPattern.test(this.info.Phoneno)) {
      console.log('Invalid phoneno');
      this.messageService.add({ severity: 'warn', summary: 'Invalid phoneno', detail: "Phone no must be 10 digits and only numbers" });
      return;
    }
    // Validate locality
    if (!localityPattern.test(this.info.Locality)) {
      console.log('Invalid locality');
      this.messageService.add({ severity: 'warn', summary: 'Invalid locality', detail: "Locality can't contain special characters" });
      return;
    }
    // Validate landmark
    if (!landmarkPattern.test(this.info.Landmark)) {
      console.log('Invalid landmark');
      this.messageService.add({ severity: 'warn', summary: 'Invalid Landmark', detail: "Landmark can't contain special characters" });
      return;
    }
    // Validate address
    if (!addressPattern.test(this.info.Address)) {
      console.log('Invalid address');
      this.messageService.add({ severity: 'warn', summary: 'Invalid Address', detail: "Address can't contain special characters other than / or , " });
      return;
    }
    // Validate zipcode
    if (!zipcodePattern.test(this.info.zipcode)) {
      console.log('Invalid zipcode');
      this.messageService.add({ severity: 'warn', summary: 'Invalid zipcode', detail: "Zipcode must be a 6 digit number" });
      return;
    }
    console.log(this.info)

    axios.post('/saveUserInfo', {Locality:this.info.Locality,zipcode:this.info.zipcode,Address:this.info.Address,Landmark:this.info.Landmark,Phoneno:this.info.Phoneno}).then(res=>{
      this.messageService.add({ severity: 'success', summary: 'Contact info Successfully Updated', detail: "Enjoy!!" })
    }).catch(err=>console.log(err))
  }

}
