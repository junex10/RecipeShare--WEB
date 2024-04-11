import { Component, Input, ViewEncapsulation, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/shared';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DatatableComponent implements OnChanges {

  @Input('options') options: {} = {};
  @Input('language') language: {} = {};

  @Input('data') data: any[] = [];
  @Input('total') total: number = 0;
  @Input('page') page: number = 1;
  @Input('perPage') perPage: number = Constants.PER_PAGE_WEB;
  @Input('header') header: any[] = ['Example Column 1', 'Example Column 2'];
  @Input('notFoundText') notFoundText: string = 'There is not data to show';
  @Input('thStyles') thStyles: any = '';
  @Input('thItemsStyles') thItemsStyles: any = '';
  @Input('id') id: string = 'datatable';

  @Output() next = new EventEmitter<number>();
  @Output() toolActionsEvent = new EventEmitter<any>();

  dtOptions: DataTables.Settings = { 
    order: [], 
    processing: false, 
    data: [], 
    searching: false,
    paging: false,
    info: false,
    language: {
      emptyTable: '',
      zeroRecords: ' '
    },
    lengthChange: false,
    ordering: false
  };

  constructor() { 
    
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.dtOptions = {
        pageLength: Constants.PER_PAGE_WEB || 0,
        responsive: true,
        data: this.data,
        language: {
          processing: "Please wait...",
          search: "Search:",
          lengthMenu: "Show _MENU_ Items",
          info: "Showing from _START_ to _END_ of _TOTAL_ items",
          infoEmpty: "No items found",
          infoFiltered: "(filtrado _MAX_ items total)",
          infoPostFix: "",
          loadingRecords: "Loading logs...",
          zeroRecords: "Could not found items",
          emptyTable: "There's not data available on the table",
        },
        ...this.options,
        ...this.language
      }
    }, 600)
  }

  pageChange = (page: any) => {
    this.page = page;
    this.next.emit(page);
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }
  valueAscOrder = (a: any, b: any): number => {
    return a.value.localeCompare(b.value);
  }
  keyDescOrder = (a: any, b: any): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  toolsActions = (action: string, item: any) => this.toolActionsEvent.emit({ action, ...item });
}
