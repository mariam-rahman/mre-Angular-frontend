import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user.service';

@Component({
  selector: 'user-view-dialog',
  templateUrl: './user-view-dialog.component.html',
  styleUrls: ['./user-view-dialog.component.scss']
})
export class UserViewDialogComponent implements OnInit {
	@Input() data;
	title;

	constructor(
		public userService: UserService,
		public activeModal: NgbActiveModal
		) { }

	ngOnInit() {
		
	 }

	closeModal() {
		this.activeModal.close();
	}
}
