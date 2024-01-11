import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService,private toster:ToastrService) {}

  ngOnInit(): void {
  }
  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) =>  this.toster.error(error.error),
    });
  }
  logout() {
    this.accountService.logout();
  }
}
