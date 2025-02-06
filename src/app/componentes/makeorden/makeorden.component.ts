import { Component, OnInit, Input, inject } from '@angular/core';
import { IonInput, IonItem, IonList, IonDatetime, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonButton, IonText } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { OrdenService } from 'src/app/services/orden.service';



@Component({
  selector: 'app-makeorden',
  templateUrl: './makeorden.component.html',
  styleUrls: ['./makeorden.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonInput, IonItem, IonList, IonDatetime, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton],
})
export class MakeordenComponent implements OnInit {


  private _modalCtrl = inject(ModalController);
  private _ordenSvs = inject(OrdenService);
  private readonly _fb = inject(FormBuilder)


  @Input() mensaje: any;

  constructor() { }

  ngOnInit() {
    this._buildForm();
  }

  ordenForm!: FormGroup;

  private _buildForm(): void {
    this.ordenForm = this._fb.nonNullable.group({
      numero: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaAtencion: ['', Validators.required],
    })
  }



  saveOrden() {
    const orden = this.ordenForm.value;
    //console.log('FechaAtencion: ', orden.fechaAtencion)
    this._ordenSvs.addOrden(orden);
    this.close();
  }



  close() {
    this._modalCtrl.dismiss();
  }








}
