import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: string;
  public version$: BehaviorSubject<number>;
  constructor(private  u: UtilService) { }

  ngOnInit(): void {
    this.title = 'Laurent\'s App';
    this.version$ = this.u.version$;
  }

}
