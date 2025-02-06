import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenu, IonMenuButton, IonItem, IonIcon, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

const ion_imports = [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenu, IonMenuButton, IonItem, IonIcon, IonLabel,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ion_imports, RouterLink,],
})
export class HomePage {
  constructor() {
    addIcons({ home: home });
  }
}
