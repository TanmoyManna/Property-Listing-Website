import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {



  isHttpRequest = new BehaviorSubject<boolean>(false);

  user = new BehaviorSubject(false);
  userDetails = this.user.asObservable();

  login = new BehaviorSubject(this.storage.isAuthenticate());
  isLogedin = this.login.asObservable();

  isProgress: BehaviorSubject<any> = new BehaviorSubject(0);
  progress = this.isProgress.asObservable();

  search = new BehaviorSubject(false);
  isSearched = this.search.asObservable();

  constructor(private storage: StorageService) { }

  setSearchEmmit(search: any) {
    return this.search.next(search);
  }
  setLoginEmmit(isLogin: boolean) {
    return this.login.next(isLogin);
  }
}
