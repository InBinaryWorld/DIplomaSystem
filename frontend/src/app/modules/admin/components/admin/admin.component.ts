import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-admin',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

  public navItems: NavItem[] = [
    { path: '/admin/topic-change', nameKey: 'Sidebar.Admin.Import' },
    { path: '/admin/deans', nameKey: 'Sidebar.Admin.Deans' },
    { path: '/admin/students', nameKey: 'Sidebar.Admin.Students' },
    { path: '/admin/lecturers', nameKey: 'Sidebar.Admin.Lecturers' },
    { path: '/admin/coordinators', nameKey: 'Sidebar.Admin.Coordinators' },
    { path: '/admin/departments', nameKey: 'Sidebar.Admin.Departments' },
    { path: '/admin/study-fields', nameKey: 'Sidebar.Admin.StudyFields' },
    { path: '/admin/diploma-section', nameKey: 'Sidebar.Admin.DiplomaSection' },
    { path: '/admin/program-committee', nameKey: 'Sidebar.Admin.ProgramCommittee' },
  ];

}
