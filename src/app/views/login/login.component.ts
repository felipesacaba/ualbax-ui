import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    navigateTo: string;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {

        this.loginForm = this.fb.group({
            username: this.fb.control('', [Validators.required]),
            password: this.fb.control('', Validators.required)
        });

        this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/dashboard';
    }

    login() {
        this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)

            .subscribe(
                    () => {
                        this.router.navigate([this.navigateTo]);
                    }
            );
    }
}
