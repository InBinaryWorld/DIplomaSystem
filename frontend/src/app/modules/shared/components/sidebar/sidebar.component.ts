import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItem } from "../../models/nav-item.model";
import { SessionStoreService } from "../../../login/services/session-store.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  @Input()
  public navItems: NavItem[] = []

  constructor(private readonly sessionStoreService: SessionStoreService) {
  }

  public logout(): void {
    this.sessionStoreService.logout();
  }

}
