import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  p: number = 1;

  constructor() { }

  @Input() data
  @Input() keyword
  @Input() submitted

  ngOnInit(): void {
  }

}
