import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm implements OnInit {
  loginForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private ust: UsersStore) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    // Solo para probar automáticamente
    this.login('LGraham', 'admin123');
  }

  login(username: string, password: string): void {
    const user = this.ust.findUserByCredentials(username, password);
    if (user) {
      console.log('✅ Usuario encontrado:', user);
    } else {
      console.log('❌ Usuario o contraseña incorrectos');
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.login(username, password);
  }

}
