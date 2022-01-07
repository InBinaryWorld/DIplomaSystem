import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanComponent {

  public navItems: NavItem[] = [
    { path: '/dean/topic-change', nameKey: 'Sidebar.Dean.TopicChangeRequests' },
    { path: '/dean/clarification-request', nameKey: 'Sidebar.Dean.ClarificationRequests' }
  ];

}
