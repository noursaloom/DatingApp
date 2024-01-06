import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode:boolean = false;
  users: any;

  constructor(private http: HttpClient,private accountService:AccountService) {}

  ngOnInit(): void { 
    this.getUses();
    console.log(this.users);
  }
 
  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  getUses(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Compleated with no errors'),
    });
  }
  cancelRegisterMode(event:boolean){
this.registerMode=false;
  }
}
