import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/Employee';
import { SharedapiService } from 'src/app/services/sharedapi.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(
    private service: SharedapiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogRef:MatDialogRef<AddEditEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Employee, boolean]
  ) {
    this.addEmployeeForm = this.fb.group({
      EmployeeName: new FormControl(this.data[0] == null ? null : this.data[0].EmployeeName, Validators.required),
      EmployeeId: new FormControl(this.data[0] == null ? 0 : this.data[0].EmployeeId, Validators.required),
      DepartmentId: new FormControl(this.data[0] == null ? 0 : this.data[0].DepartmentId, Validators.required),
      DateOfJoining: new FormControl(this.data[0] == null ? null : this.data[0].DateOfJoining, Validators.required),
      PhotoFileName: this.PhotoFileName
    })
   }
  PhotoFileName = new FormControl(this.data[0] == null ? null : this.data[0].PhotoFileName);
  PhotoFilePath:string;
  addEmployeeForm: FormGroup;
  updateClicked: boolean = this.data[1];
  //For Department names dropdown
  DepartmentsList:any=[];

  ngOnInit(): void {
    this.loadDepartmentsList();
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  loadDepartmentsList() {
    console.log(this.updateClicked)
    this.service.getAllDepartmentNames().subscribe({
      next: (res) => {
        this.DepartmentsList = res;
        this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName.value;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Error Fetching Data, Please try again");
      }
    });
  };

  addEmployee(){
    this.service.addEmployee(this.addEmployeeForm.value).subscribe({
      next: (res) => {
        this.toastr.success("Employee Added successfully", "Add New Employee");
        this.CloseDialog();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Error adding employee", "Add New Employee");
      }
    });
  };

  updateEmployee(employee:Employee){
    this.service.updateEmployee(employee).subscribe({
      next: (res) => {
        this.toastr.success("Updated successfully", "Update Employee");
        this.CloseDialog();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Error Updating Employee", "Update Employee");
      }
    });
  };

  uploadPhoto(event: any) {
    console.log("hi")
    var file = event.target.files[0];
    console.log(file)
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe({
      next: (res) => {
        this.PhotoFileName.setValue(res.toString());
        this.PhotoFilePath = this.service.PhotoUrl + (this.PhotoFileName.value);
        this.toastr.success("Photo Uploaded Successfully","Photo Upload")
      },
      error: (err) => {
        console.log(err)
        this.toastr.error("Error Uploading photo","Photo Upload")
      }
    })
  }

}