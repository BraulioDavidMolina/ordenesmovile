import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OrdenI } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private _firestore: Firestore = inject(Firestore)
  private readonly _ordenCollection = collection(this._firestore, 'ordenes')
  //private _AF: AngularFirestore = inject(AngularFirestore)


  constructor() { }

  getCollectionChanges<tipo>(path: string) {
    const refCollection = collection(this._firestore, path);
    return collectionData(refCollection) as Observable<tipo[]>;
  }


  // getById<tipo>(id: string, path: string) {
  //   //return this._AF.collection(path).doc<OrdenI>(id).valueChanges();
  //   const refCollection = collection(this._firestore, id, path)
  //   return collectionData(refCollection) as Observable<tipo[]>;
  // }

  // __________________________---

  getOrdenes(): Observable<any[]> {
    const ordenesCollection = collection(this._firestore, 'ordenes');
    return collectionData(ordenesCollection, { idField: 'id' });
  }

  addOrden(orden: Partial<OrdenI>): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._ordenCollection, {
      created: new Date(),
      edited: new Date(),
      ...orden,
    })
  }

  async getOrdenById(id: string): Promise<OrdenI> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as OrdenI;
  }

  updateOrden(id: string, orden: OrdenI) {
    const docRef = this._getDocRef(id);
    updateDoc(docRef, { ...orden });
  }

  deleteOrden(id: string) {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, 'ordenes', id);
  }

}
