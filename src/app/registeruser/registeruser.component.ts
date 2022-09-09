import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/user';
import { RegisteruserService } from './registeruser.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  constructor(private registerUserService : RegisteruserService,
    private router : Router) { }

  ngOnInit(): void {
  }

  user : User = new User();
  roleSelected = 'M';

  
  registerUser(){
    this.user.role = this.roleSelected;
    this.registerUserService.registeruser(this.user).subscribe(data => {
      alert("User Registration Successfully.")
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      
    })
  }

}
