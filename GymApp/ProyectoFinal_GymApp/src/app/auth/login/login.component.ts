import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;
  constructor() { }

  ngOnInit(): void {
  this.login = new FormGroup({
  'fname' : new FormControl(),
  'password' : new FormControl()
  })

}

  logindata(login:FormGroup) {
    console.log(this.login.value);
    
  }
}