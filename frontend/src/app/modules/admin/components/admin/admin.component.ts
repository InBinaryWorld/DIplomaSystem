import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-topic-change-system-data',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

  public navItems: NavItem[] = [
    { path: '/admin/topic-change', nameKey: 'Sidebar.Admin.Import' },
    { path: '/admin/1', nameKey: 'Sidebar.Admin.' },
    { path: '/admin/2', nameKey: 'Sidebar.Admin.' },
    { path: '/admin/3', nameKey: 'Sidebar.Admin.' },
    { path: '/admin/4', nameKey: 'Sidebar.Admin.' },
    { path: '/admin/5', nameKey: 'Sidebar.Admin.' },
    { path: '/admin/6', nameKey: 'Sidebar.Admin.' }
  ];

}
