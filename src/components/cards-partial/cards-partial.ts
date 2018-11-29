import { Component, Input } from '@angular/core';


@Component({
  selector: 'cards-partial',
  templateUrl: 'cards-partial.html'
})
export class CardsPartialComponent {

@Input() item: Object

  constructor() {
  }

}
