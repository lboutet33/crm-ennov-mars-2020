import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatePrestation } from 'src/app/shared/enums/state-prestation.enum';
import { Prestation } from 'src/app/shared/models/prestation';


@Component({
  selector: 'app-form-presta',
  templateUrl: './form-presta.component.html',
  styleUrls: ['./form-presta.component.scss']
})
export class FormPrestaComponent implements OnInit {
  public states = Object.values(StatePrestation);
  public form: FormGroup;
  @Input() item = new Prestation(); // @Input permet d'y accéder depuis le composant parent pour faire du propertybinding
  @Output() private nItem: EventEmitter<Prestation> = new EventEmitter<Prestation>();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.item.id], //vaudra null à l'utilisation sur le formulaire add...sinon on aura la valeur en mode edit
      typePresta: [
        this.item.typePresta,
        Validators.required
      ],
      client: [
        this.item.client,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      tjmHt: [this.item.tjmHt],
      nbJours: [this.item.nbJours],
      tva: [this.item.tva],
      state: [this.item.state],
      comment: [this.item.comment],
    });
  }

  public onSubmit() {
    this.nItem.emit(this.form.value); // on a 1 objet complet avec l'ID
  }
}
