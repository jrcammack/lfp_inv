import { Component, OnInit } from '@angular/core';
import { IonGrid, IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
