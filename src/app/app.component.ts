import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version!: string;
  title = 'MQrCode';
  recipient!: string;
  content !: string;
  data!: string;
  disshow!: boolean;
  isclose!: boolean;
  is1922!: boolean;
  is1922Btn!: boolean;


  constructor() {
    this.version = 'v1.2';
    this.disshow = true;
    this.is1922 = true;
    this.content = '';
    this.is1922Btn = false;
  }

  onChange() {
    this.is1922 = !this.is1922;
  }

  onCodeResult($event: string) {
    if (this.content.length > 0)
      return;

    if ($event.toUpperCase().startsWith("SMSTO")) {
      if (this.disshow) {
        try {
          var strs = $event.split(':');

          this.recipient = strs[1];
          this.is1922Btn = this.is1922 ? this.recipient == '1922' : true;
          this.content = strs[2];
          this.data = `sms:+${strs[1]};?&body=${strs[2]}`;
          this.disshow = !this.disshow;

        } catch (error) {
          console.log(error);
        }
      }
    }
    else {
      this.disshow = !this.disshow;
      this.content = $event;
    }
  }

  Rescreen() {
    this.isclose = !this.isclose;
    this.is1922Btn = false;
    this.disshow = !this.disshow;
    this.recipient = '';
    this.data = '';
    this.content = '';
  }

}
