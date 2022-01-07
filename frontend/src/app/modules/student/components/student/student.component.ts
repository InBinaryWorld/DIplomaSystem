import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-student',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./student.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent {

  public navItems: NavItem[] = [
    { path: '/student/topic-proposition', nameKey: 'Sidebar.Student.TopicPropositions' },
    { path: '/student/reservations', nameKey: 'Sidebar.Student.TopicReservations' },
    { path: '/student/topic-change', nameKey: 'Sidebar.Student.TopicChangeRequest' },
    { path: '/student/clarification-request', nameKey: 'Sidebar.Student.ClarificationRequest' }
  ];

}
