import {Injectable, signal} from '@angular/core';


@Injectable({providedIn: 'root'})
export class EmployeeListStateService{
  readonly nameFilter = signal('')
  readonly statusFilter = signal<string | null>(null)
  readonly rows = signal(10)
  readonly first = signal(0)

  setSearch(value: string) {
    this.nameFilter.set(value);
    this.first.set(0)
  }

  setStatus(value: string | null) {
    this.statusFilter.set(value);
    this.first.set(0)
  }

  setPage(first: number, rows: number) {
    this.first.set(first);
    this.rows.set(rows);
  }

  resetFilters() {
    this.nameFilter.set('');
    this.statusFilter.set(null);
    this.rows.set(0)
    this.first.set(0)
  }
}
