import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton, IonFab, IonFabButton, IonIcon, IonFabList, IonButton } from '@ionic/angular/standalone';
import { OrdenService } from 'src/app/services/orden.service';
import { OrdenI } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ViewordenComponent } from 'src/app/componentes/vieworden/vieworden.component';
import { addIcons } from 'ionicons';
import { add, chevronUpCircle, document, colorPalette, globe } from 'ionicons/icons';
import { MakeordenComponent } from 'src/app/componentes/makeorden/makeorden.component';
import { ConfirmationComponent } from '../../componentes/confirmation/confirmation.component';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
  standalone: true,
  imports: [IonButton, IonFab, IonBackButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, IonFabButton, IonIcon, IonIcon]
})
export class OrdenesPage implements OnInit {

  private _modalCtrl = inject(ModalController);

  ordenes: OrdenI[] = [];

  constructor(private _firestoreSvs: OrdenService) {
    addIcons({ chevronUpCircle, document, colorPalette, globe, add });
  }

  ngOnInit() {
    // this._firestoreSvs.getCollectionChanges<OrdenI>('ordenes').subscribe(data => {
    //   if (data) {
    //     this.ordenes = data
    //   }
    // })
    this._firestoreSvs.getOrdenes().subscribe((data => {
      if (data) {
        this.ordenes = data;
      }
    }))
  }

  async verDetalle(id: string) {
    const modal = await this._modalCtrl.create({
      component: ViewordenComponent,
      componentProps: { id }
    });
    modal.present();
  }


  async deleteOrden(id: string) {
    const modal = await this._modalCtrl.create({
      component: ConfirmationComponent,
      componentProps: { id }
    });
    modal.present();
  }

  async makeOrden() {
    const modal = await this._modalCtrl.create({
      component: MakeordenComponent, // Asegúrate de importar este componente
      componentProps: {}
    });
    modal.present();
  }




}
