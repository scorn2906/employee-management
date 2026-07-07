import {Component, output} from '@angular/core';
import {LucideAngularModule, Menu, Bell} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuToggle = output<void>()

  readonly icons = {Menu, Bell};
}
