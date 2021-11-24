import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  @Output() confirmedClick: EventEmitter<boolean> = new EventEmitter();

  // If the user confirmed his delete request
  setConfirm(): void {
    this.confirmedClick.emit(true);
  }

}
