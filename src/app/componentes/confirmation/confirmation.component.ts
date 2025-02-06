import { Component, inject, Input, OnInit } from '@angular/core';
import { IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  imports: [IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent,],
})
export class ConfirmationComponent implements OnInit {

  @Input() id: any;

  private _modalCtrl = inject(ModalController);
  private _ordenSvs = inject(OrdenService);

  constructor() { }

  ngOnInit() { }


  confirmDelete(id: string) {
    this._ordenSvs.deleteOrden(id)
    this.close();
  }


  close() {
    this._modalCtrl.dismiss();
  }

}
