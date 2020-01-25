import {Validators, NgForm, FormControl} from '@angular/forms';
import { ApiServiceService } from './../services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserInterface } from './../models/user.interfase';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: UserInterface;
  editForm: FormGroup;
  id: any;
  datos: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetail(this.activeRouter.snapshot.params.id);
    this.editForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      birthdate:new FormControl('',),
      id:new FormControl('',)
    });
  }

  getDetail(id) {
    this.apiService.GetUser(id).subscribe(data => {
      this.id = data.id;
      this.datos = data;
      console.log(data);
      this.editForm.setValue({
        id: data.id,
        birthdate: data.birthdate,
        name: data.name
      });
      console.log(data);
    });
  }

  updateUser(data: UserInterface) {
    this.apiService.updateUser(data).subscribe(
      res => {
        // Update User
        Swal.fire('Good job!', 'The data was updated!', 'success');
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
