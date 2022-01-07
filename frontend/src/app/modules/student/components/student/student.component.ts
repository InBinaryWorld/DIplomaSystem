import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-dean',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent {

  public navItems: NavItem[] = [
    { path: '/student/topic-change', nameKey: 'Sidebar.Student.Import' },
    { path: '/student/1', nameKey: 'Sidebar.Student.' },
    { path: '/student/2', nameKey: 'Sidebar.Student.' },
    { path: '/student/3', nameKey: 'Sidebar.Student.' },
    { path: '/student/4', nameKey: 'Sidebar.Student.' },
    { path: '/student/5', nameKey: 'Sidebar.Student.' },
    { path: '/student/6', nameKey: 'Sidebar.Student.' }
  ];

}
