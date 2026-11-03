import { Component, input } from '@angular/core';
import { type LucideIcon, LucideDynamicIcon } from '@lucide/angular';

@Component({
  imports: [LucideDynamicIcon],
  selector: 'app-home-feature',
  templateUrl: './home-feature.html',
})
export class HomeFeature {
  readonly icon = input.required<LucideIcon>();
  title = input.required<string>();
  description = input.required<string>();
}
