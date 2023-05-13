import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import axios from 'axios';
import { UserService } from 'src/app/login/user.service';
import { UtilsServiceService } from '../utils-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { first} from 'rxjs/internal/operators/first';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  public userInfo:any;
  public userparsed:any;
  public imageBlobs:any[]=[];
  public imageSrcs: string[] = [];
  public formData: any;
  public tagList = [];
  public modalRef?: BsModalRef;
  selectImage:any;
  modalData?:any;
  public mentionList:any[]=[];
  @ViewChild('imageInput') imageInput!:ElementRef;
  @ViewChild('textInput') textInput!:ElementRef;
  @ViewChild('modal') modal!:TemplateRef<any>;
  isOpen:boolean = false;
  desc: any;
  textObj: any;

  constructor(private modalService: BsModalService , public userService: UserService , public utilsServiceService : UtilsServiceService) { }

  ngOnInit() {
    this.userService.userCast.subscribe((usr:any)=>{
      //console.log("user data" , usr)
      this.userparsed = usr;
      this.userInfo = usr;
      if(this.userparsed!=null){
      }

    })

    this.modalService.onHide.pipe(take(1)).subscribe(()=>{
      // alert("close")
      // this.utilsServiceService.modalObjSource.next({open:false })
      this.isOpen = false
    })

    this.utilsServiceService.modalObj.subscribe((modalData:any)=>{
      if(modalData.data){
        this.modalData =  modalData.data
        this.desc=  modalData.data.description
        this.imageSrcs=modalData.data.photoUrlArr
        console.log(this.imageSrcs)
        console.log(modalData, this.modalData)
      }

      if( modalData.open){
        this.openModal(this.modal )
        this.isOpen = true
      }
    })


  }
  ngAfterViewInit(){
    console.log(this.imageInput)
 }

  adjustHeight(e:any){
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  onFileSelected(event: any): void {
    const files: File[] = event.target.files;
    console.log(this.imageSrcs , files)

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        this.imageBlobs.push(files[i])
        reader.onload = e => this.imageSrcs.push(reader.result as string);
        reader.readAsDataURL(files[i]);
      }
    }
    event.target.value = ''
  }




  openModal(template: TemplateRef<any>) {
    console.log("open")
    this.modalRef = this.modalService.show(template,
      //  Object.assign({}, { class: 'gray modal-xl' })
      );
  }

  closeModal(template: TemplateRef<any>){
    this.modalService.hide()
    this.isOpen = false
  }

  update(data:any){
    console.log(data)
    this.textObj = data
  }


}
