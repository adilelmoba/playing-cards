import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { LoginService } from './services/login/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  loginService = inject(LoginService);

  private logoutSubscription: Subscription | null = null;

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: (result: any) => {
        this.navigateToLogin();
      },
      error: (error) => {
        this.navigateToLogin();
      },
      
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  faIconLibrary  = inject(FaIconLibrary);

  ngOnInit(): void {
    this.initFontAwesome();
  }
  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

}
