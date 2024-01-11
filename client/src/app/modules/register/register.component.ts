import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private accountService: AccountService,private toster:ToastrService) {}
  ngOnInit(): void {}
  register() {
    this.accountService.register(this.model).subscribe({
      next: () =>  this.cancel(),
      error: (error) => this.toster.error(error.error),
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
