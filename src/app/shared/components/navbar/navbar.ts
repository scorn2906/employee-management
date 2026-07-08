import {Component, output} from '@angular/core';
// import {LucideAngularModule} from '@lucide/angular'
import { Menu, Bell} from 'lucide';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuToggle = output<void>()

  readonly icons = {Menu, Bell};
}
