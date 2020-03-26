import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StateClient } from 'src/app/shared/enums/state-client.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {
  public states = Object.values(StateClient);
  public form: FormGroup;
  private item = new Client();
  @Output() private nItem: EventEmitter<Client> = new EventEmitter<Client>();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        this.item.name,
        Validators.required
      ],
      email: [
        this.item.email,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      state: [this.item.state],
    });
  }

  public onSubmit() {
    this.nItem.emit(this.form.value);
  }
}
