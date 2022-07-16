import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { SocketService } from '@sections/videocall/services/socket/socket.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss']
})
export class VideocallComponent implements OnInit {

  room = ''
  roomInput = ''

  constructor(
    private socketService: SocketService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    // this.initializeLists();
    let elemento = this._document.getElementById('client-container');
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = '/assets/scripts/client-container.js';
    this._renderer2.appendChild(elemento, script);
  }

  ngAfterViewInit() {
    this.socketService.initializeVideocallSocket();
   
  }

  joinRoom() {
    this.socketService.joinRoom(this.roomInput)
  }

  ngOnDestroy() {
    // this.videocallsSubscription.unsubscribe();

  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
