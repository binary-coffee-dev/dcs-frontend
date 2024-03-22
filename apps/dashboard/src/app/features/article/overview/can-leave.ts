import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { OverviewComponent } from './overview.component';

@Injectable()
export class CanLeave implements CanDeactivate<OverviewComponent> {
  canDeactivate(component: OverviewComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.formDataChange || component.imageChange) {
      return confirm('¿Está seguro que desea salir sin guardar?');
    }
    return true;
  }
}
