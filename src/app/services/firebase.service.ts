import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  list: AngularFireList<any>;

  constructor(public fb: AngularFireDatabase) {}    

  add(url, data): any {
    return this.fb.list(url).push(data);
  }

  retrieve(url): any {
    return this.fb.list(url).snapshotChanges();
  }

  retrieveWithCondition(url, key, value): any{
    return this.fb.list(url,(ref) => ref.orderByChild(key).equalTo(value)).snapshotChanges();
  }

  edit(url, key, data){
    console.log(key)
    console.log(data);
    return this.fb.list(url).update(key, data);
  }

  delete(url, key){
    return this.fb.list(url+'/'+key).remove();
  }
}
