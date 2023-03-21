import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'app-sub-cats',
  templateUrl: './sub-cats.component.html',
  styleUrls: ['./sub-cats.component.scss'],
})
export class SubCatsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
