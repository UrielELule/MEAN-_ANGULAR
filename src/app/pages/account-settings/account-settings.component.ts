import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private stSvc: SettingsService) { }

  ngOnInit(): void {
    this.stSvc.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.stSvc.changeTheme(theme);
  }





}
