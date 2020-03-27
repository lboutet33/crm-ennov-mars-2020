import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-trash',
  templateUrl: './icon-trash.component.html',
  styleUrls: ['./icon-trash.component.scss']
})
export class IconTrashComponent implements OnInit {
  public faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

}
