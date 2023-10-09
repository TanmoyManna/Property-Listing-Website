import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  @Input() color: string = '#ffffff';
  @Input() class: string = '';
  @Input() standalone: boolean = false;
  isLoading = this.event.isHttpRequest;
  @Input() width: string = '';
  @Input() height: string = ''
  @Input() count: number = 1
  @Input() appearance: '' | 'line' | 'circle' = ''
  @Input() animation: 'false' | 'pulse' | 'progress' = 'progress'
  constructor(
    private event: EventService
  ) {

  }

  ngOnInit(): void {
  }

}
