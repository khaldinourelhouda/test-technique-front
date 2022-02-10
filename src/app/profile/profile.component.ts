import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changepasswordForm: FormGroup;
  updateForm:FormGroup;
  loading = false;
  submitted = false;
  usertoken:string;
  firstname:string;
  lastname:string;
  email:string;
 
  constructor(private testutilisateur:UserService,private httpClient: HttpClient,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {

    this.changepasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      
  }) ;

  this.updateForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email:['', Validators.required],
    
}) ;

    this.usertoken=sessionStorage.getItem('currentUserToken');
    this.testutilisateur.getByToken(this.usertoken).subscribe((data:any) => {
      this.firstname=data.first_name
      this.lastname=data.last_name
      this.email=data.email
    
    })
  }

  get f() { return this.changepasswordForm.controls; }
  onSubmitChangePassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
        return;
    }

    this.loading = true;
    this.testutilisateur.changepassword(this.email,this.changepasswordForm.get('oldpassword').value,this.changepasswordForm.get('newpassword').value)
        .pipe(first())
        .subscribe(
            (data:any)  => {
              Swal.fire({icon: 'success',title: "Password changed",showConfirmButton: true });
                //this.alertService.success("A verification Email was sent to you to confirm your account, please check it !", true);
                this.router.navigate(['/test/profile']);
                //this.loading = false;
            },
            error => {
                console.log(error);
               
                //this.alertService.error(this.splitMulti(JSON.stringify(error.error).substring(
                   // JSON.stringify(error.error).lastIndexOf("[") + 1, 
                    //JSON.stringify(error.error).lastIndexOf("]")
               // ),this.tokens));
                this.loading = false;
            });
}



Onsubmitupdateprofile(){
  
  var userinfo ={"first_name":this.updateForm.get('first_name').value,"last_name":this.updateForm.get('last_name').value,"email":this.updateForm.get('email').value}
  console.log(userinfo)
  this.testutilisateur.update(userinfo,this.usertoken)
  
        .pipe(first())
        .subscribe(
            (data:any)  => {
              Swal.fire({icon: 'success',title: "Profile updated",showConfirmButton: true });
                //this.alertService.success("A verification Email was sent to you to confirm your account, please check it !", true);
                
                //this.loading = false;
            },
            error => {
                console.log(error);
               
                //this.alertService.error(this.splitMulti(JSON.stringify(error.error).substring(
                   // JSON.stringify(error.error).lastIndexOf("[") + 1, 
                    //JSON.stringify(error.error).lastIndexOf("]")
               // ),this.tokens));
                this.loading = false;
            });

}

}
