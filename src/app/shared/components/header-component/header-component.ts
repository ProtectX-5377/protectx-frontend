import { Component } from '@angular/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header-component',
  imports: [LanguageSwitcher],
  standalone: true,
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

}
