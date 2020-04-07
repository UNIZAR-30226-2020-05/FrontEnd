import { Component,Output,EventEmitter,OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
logeado;
registro:boolean=true;
@Output() messageEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    this.logeado=true;
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }

}
