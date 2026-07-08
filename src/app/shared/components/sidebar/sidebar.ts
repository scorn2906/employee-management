import {Component, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  LayoutDashboard,
  Users,
  LogOut,
} from 'lucide';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen = input<boolean>(true)

  readonly icons = {LayoutDashboard, Users, LogOut}

  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', route: '/employees', icon: Users },
  ]
}
