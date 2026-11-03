import { Component } from '@angular/core';
import { LucideCalendar, LucideHouse, LucideShoppingCart } from '@lucide/angular';
import { HomeFeature } from '../../components/home-feature/home-feature';

@Component({
  imports: [HomeFeature],
  selector: 'app-homepage',
  templateUrl: './homepage.html',
})
export class Homepage {
  readonly calendarIcon = LucideCalendar;
  readonly shoppingIcon = LucideShoppingCart;
  readonly houseIcon = LucideHouse;
}
