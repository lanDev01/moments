import { MessagesService } from 'src/app/services/messages.service';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environments';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl

  // Icons fontAwasome
  faTimes = faTimes
  faEdit = faEdit

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data))
  }

  async removeHandle(id: number) {
    await this.momentService.removeMmoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!")

    this.router.navigate(['/'])
  }

}
