// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor() {}
// }



//                                              canot get
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor() {}
// }


import { Component, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/'; // Import AngularFirestore
import { Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore'; // Import collectionData from rxfire/firestore
import { CollectionReference } from '@angular/fire/firestore';

interface Item {  
  email: string;
  password: string;
  // no se que poner aca
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of item$ | async">
        {{ item.name }}
        {{ item.email }}
        {{ item.psw }}
      </li>
    </ul>
  `,
})
export class AppComponent {
  item$: Observable<Item[]>;

  constructor(private firestore: AngularFirestore) {
    const itemCollection: AngularFirestoreCollection<Item> = this.firestore.collection<Item>('items');
    this.item$ = itemCollection.valueChanges();
  }
}
//                     pantalla en blanco




