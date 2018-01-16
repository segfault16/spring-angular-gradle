import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';
@Component({
  selector: 'app-root',
  providers: [WelcomeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  serverWelcome = '';

  constructor(private _welcomeService : WelcomeService) {

  }

  ngOnInit(){
    this._welcomeService.getWelcomeMessage().subscribe((data: string) => this.serverWelcome = data);
  }

}
