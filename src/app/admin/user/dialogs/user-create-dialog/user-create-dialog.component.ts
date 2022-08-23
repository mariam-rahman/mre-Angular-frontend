import { OrganizationService } from './../../../../services/organization.service';
import { Component, OnInit, Inject, Input, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { UserService } from "../../user.service";
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Globals } from "app/_helpers/globals";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { RoleService } from 'app/admin/role/role.service';

@Component({
  selector: "user-create-dialog",
  templateUrl: "./user-create-dialog.component.html",
  styleUrls: ["./user-create-dialog.component.scss"],
})
export class UserCreateDialogComponent implements OnInit {
  @Output() userCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() groupData;

  userCreateForm: FormGroup;
  passwordMatch = true;
  ministries$;
  departments$;
  organizations$;
  workflows$
  showDepartmentField = false;
  isClient$ = false;
  isWorkflow$ = false;
  isAdmin$ = false;
  clinetTemp = false;
  roles;
 
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private roleService: RoleService

  ) { }

  ngOnInit() {
    this.getRoles();
    this.userCreateForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required, Validators.minLength(3)]],
        phone_no: [null, [Validators.required]],
        address: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])],
        is_admin: [null, [Validators.required]],
        confirm_password: [null, Validators.required],
        role_id: [null, Validators.required],
        active: true,
      },
      { validator: this.checkPasswords }
    );
  }

  // compare password with confirm password.
  checkPasswords(form: AbstractControl): { invalid: boolean } {
    if (form.get("password").value !== form.get("confirm_password").value) {
      return { invalid: true };
    }
  }

  onFormSubmit() {
    console.log("form data ", this.userCreateForm.value);

    this.checkPasswordForm(this.userCreateForm.controls.password);
    //if (this.userCreateForm.valid) {
    this.spinner.show();
    const { name, username, email, password, phone_no, address, is_admin, active, role_id } = this.userCreateForm.value;
    this.userService.createUser({ name, username, email, password, phone_no, address, is_admin, active,role_id}).subscribe((response) => {
      console.log('user response', response);

    

      if (response == true) {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        // this.userCreateEventEmitter.emit(response);
      } else {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(response);
      }
    }, (error) => {
      this.spinner.hide();
      this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
      console.log(error);
    });
    //}
    if (this.userCreateForm.invalid) {
      // To display errors below forms
      Object.keys(this.userCreateForm.controls).forEach(field => {
        const control = this.userCreateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }


  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  checkPasswordForm(passwordField: AbstractControl) {
    const { errors } = passwordField;
    if (errors != null) {

      if (Object.keys(errors).length !== 0) {
        for (const property in errors) {
          console.log(`obj.${property} = ${errors[property]}`);
          switch (property) {
            case "hasSpecialCharacter":
              this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_SPECIAL_CHARACTER_(#?!@$%^&*-)");
              break;
            case "hasANumber":
              this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_NUMBER_(0-9)");
              break;
            case "hasCapitalCase":
              this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_CAPITAL_LETTER_(A-Z)");
              break;
            default:
          }
        }
      }
    }
  }


  isUserAdmin(event) {
    if (event) {
      this.isAdmin$ = true;
      this.userCreateForm.get('is_admin').setValue(true);
    }
    else {
      this.isAdmin$ = true;
      this.userCreateForm.get('is_admin').setValue(false);
    }
  }

  getRoles() {
    this.roleService.getRolesList().subscribe((data) => {
      if (data != null && data != []) {
       this.roles = data;
       console.log("roles:",this.roles);
       
      }
    });
  }


}
