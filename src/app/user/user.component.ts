import { Component, OnInit } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { UserInterface } from './../models/user.interfase';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any;
  userData: any;
  public searchTerm: string;
  constructor(
    private http: HttpClient,
    private apiService: ApiServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
     /** spinner starts on init */
     this.spinner.show();
 
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1000);
    this.getAllStudents();
  }

  getAllStudents() {
    // Get saved list of students
    this.apiService.GetUsers().subscribe(response => {
      console.log(response);
      this.userData = response;
    });
  }

  delete(item) {
    // Delete item in Student data
    this.apiService.DeleteUser(item.id).subscribe(Response => {
      // Update list after delete is successful
      Swal.fire('Good job!', 'The data was deleted!', 'success');
      this.getAllStudents();
    });
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }
  editUser() {}
}
