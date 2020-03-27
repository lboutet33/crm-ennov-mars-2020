import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public version$: Subject<number>;
  constructor(private u: UtilService) { }

  ngOnInit(): void {
    this.version$ = this.u.version$;
  }

}
