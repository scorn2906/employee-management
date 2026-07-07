import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../../shared/components/sidebar/sidebar'
import {Navbar} from '../../../shared/components/navbar/navbar'
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  isSidebarOpen = signal(true)

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v)
  }
}
