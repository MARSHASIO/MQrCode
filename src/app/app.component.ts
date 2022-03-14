import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MQrCode';
  recipient!: string;
  content !: string;
  data!: string;
  disshow!: boolean;
  isclose!: boolean;
  is1922!: boolean;
  is1922Btn!: boolean;


  constructor() {
    this.disshow = true;
    this.is1922 = true;
  }

  onChange() {
    this.is1922 = !this.is1922;
  }

  onCodeResult($event: string) {

    if ($event.toUpperCase().startsWith("SMSTO")) {
      if (this.disshow) {
        try {
          var strs = $event.split(':');


          this.recipient = strs[1];
          if (this.is1922) {
            this.is1922Btn = this.recipient == '1922';
          } else {
            this.is1922Btn = true;

          }


          this.content = strs[2];
          this.data = `sms:+${strs[1]};?&body=${strs[2]}`;
          this.disshow = !this.disshow;

        } catch (error) {
          console.log(error);
        }
      }
    }
    else {
      this.content = $event;
    }
  }

}
