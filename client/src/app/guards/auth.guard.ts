import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard:CanActivateChildFn=(route,state)=> {
    const accountService = inject(AccountService);
    const toaster = inject(ToastrService);

    return accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          toaster.error('you shall not pass!');
          return false;
        }
      })
    );
  }

