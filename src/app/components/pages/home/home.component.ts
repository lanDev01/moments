import { Component } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moments';

import { environment } from 'environments/environments';

import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  constructor(
    private momentService: MomentService
  ) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-br')
      })

      this.allMoments = data
      this.moments = data
    })
  }
}
