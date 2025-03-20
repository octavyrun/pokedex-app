import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
