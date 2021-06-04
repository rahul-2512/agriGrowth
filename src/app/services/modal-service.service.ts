import { Injectable, Component, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
let cont: any;
let title: any;
let message: any;
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _modalService: NgbModal) {}
  open(name: string, content: any): any {
    cont = content;

    if (name === 'custom') {
      title = content.title;
      message = content.message;
    }

    return this._modalService.open(MODALS[name]).result;
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-content">
      <div class="modal-header bg-white">
        <h5 class="modal-title" id="modal-title">{{ title }}</h5>
        <button
          type="button"
          class="close"
          aria-describedby="modal-title"
          (click)="modal.dismiss('cancel click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body break-all">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          (click)="modal.close('OK click')"
        >
          OK
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="modal.dismiss('Cancel click')"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class NgbdModalConfirm {
  message;
  title;
  constructor(public modal: NgbActiveModal) {
    this.message = message;
    this.title = title;
  }
}
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
    <div class="modal-content">
      <div class="modal-header bg-white">
        <h5 class="modal-title">Confirmation</h5>
        <button
          type="button"
          class="close"
          aria-label="Close button"
          aria-describedby="modal-title"
          (click)="modal.dismiss('cancel click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body break-all">
        <p>{{ content }}</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          ngbAutofocus
          class="btn btn-primary"
          (click)="modal.close('YES click')"
        >
          Confirm
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="modal.dismiss('cancel click')"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class NgbdModalConfirmAutofocus {
  content: any;
  constructor(public modal: NgbActiveModal) {
    this.content = cont;
  }
}
@Component({
  selector: 'ngbd-modal-change-confirm',
  template: `
    <div class="modal-content">
      <div class="modal-header bg-white">
        <h5 class="modal-title">Confirmation</h5>
        <button
          type="button"
          class="close"
          aria-label="Close button"
          aria-describedby="modal-title"
          (click)="modal.close('YES click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body break-all">
        <p>Do you want to cancel ? All the current changes will be lost!</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          (click)="modal.dismiss('cancel click')"
        >
          Yes,Cancel
        </button>
        <button
          type="button"
          ngbAutofocus
          class="btn btn-outline-dark"
          (click)="modal.close('YES click')"
        >
          No,I don't want to Cancel
        </button>
      </div>
    </div>
  `,
})
export class NgbdModalChangeConfirm {
  content: any;
  constructor(public modal: NgbActiveModal) {
    this.content = cont;
  }
}
@Component({
  selector: 'ngbd-modal-alert',
  template: `
    <div class="modal-content">
      <div class="modal-body break-all pb-0">
        <p>{{ content }}</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          ngbAutofocus
          class="btn btn-primary"
          (click)="modal.close('Ok click')"
        >
          OK
        </button>
      </div>
    </div>
  `,
})
export class NgbdModalAlert {
  content: any;
  constructor(public modal: NgbActiveModal) {
    this.content = cont;
  }
}
const MODALS: { [name: string]: Type<any> } = {
  custom: NgbdModalConfirm,
  confirm: NgbdModalConfirmAutofocus,
  alert: NgbdModalAlert,
  ChangeConfirm: NgbdModalChangeConfirm,
};
