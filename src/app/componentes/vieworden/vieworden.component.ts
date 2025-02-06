import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { from } from 'rxjs';
import { OrdenI } from 'src/app/interfaces/interfaces';
import { OrdenService } from 'src/app/services/orden.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vieworden',
  templateUrl: './vieworden.component.html',
  styleUrls: ['./vieworden.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonicModule, CommonModule],
})
export class ViewordenComponent implements OnInit {


  private _modalCtrl = inject(ModalController);
  private _ordenSvs = inject(OrdenService);
  private readonly _fb = inject(FormBuilder)
  private _firebaseSvs: OrdenService = inject(OrdenService);


  @Input() id: any;

  orden = {} as OrdenI;




  constructor() { }

  ngOnInit() {
    from(this._firebaseSvs.getOrdenById(this.id)).subscribe({
      next: (orden => {
        this.orden = orden;
        //console.log('viewOrden: ', this.orden)
      })
    }
    )


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




  updateOrden(id: string) {
    id = this.id;
    const updatedOrden = this.ordenForm.value;
    this._buildForm
    this._ordenSvs.updateOrden(id, updatedOrden);
    this.close();
  }
  close() {
    this._modalCtrl.dismiss();
  }

}
