import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {
  modalObjSource = new BehaviorSubject<any>({});
  modalObj = this.modalObjSource.asObservable();

  private cartObjSource = new BehaviorSubject<any>([]);
  cartObj$ = this.cartObjSource.asObservable();

constructor() { }

  setCartObj(obj: any) {
    this.cartObjSource.next(obj);
  }
}
