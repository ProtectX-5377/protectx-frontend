import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../domain/model/user.entity';
import { UsersStore } from '../../application/users-store';
import {TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, TranslatePipe],
  standalone: true,
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css'
})
export class SigninForm {
  signinForm: FormGroup;
  User = User;
  constructor(
    private fb: FormBuilder,
    private ust: UsersStore,
    private router: Router,
    private translate: TranslateService
  ) {
    this.signinForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]

    })
  }
  // ✅ Método para verificar si un campo tiene errores y ya fue tocado
  hasError(controlName: string, errorName: string): boolean {
    const control = this.signinForm.get(controlName);
    return !!(control?.hasError(errorName) && (control.dirty || control.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.signinForm.valid) {
      const newUser = new User(this.signinForm.value);
      this.ust.addUsers(newUser);
      console.log('✅ Usuario registrado:', newUser);

      // 🔄 Traducción de mensajes
      const title = await this.translate.get('signin.success.title').toPromise();
      const text = await this.translate.get('signin.success.message').toPromise();
      const confirm = await this.translate.get('signin.success.confirm').toPromise();

      // 🪄 Mostrar alerta traducida
      Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonText: confirm,
        confirmButtonColor: '#0E587C'
      }).then(() => this.router.navigate(['/login']));

    } else {
      this.signinForm.markAllAsTouched();
    }
  }
}
