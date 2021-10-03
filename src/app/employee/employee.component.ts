import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services';
import { Employee } from '../model/employee';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { RowEditComponent } from '../row-edit/row-edit.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  rowData: any;
  public employees: Employee[];
  public columnDefs: ColDef[];
  public frameworkComponents;
  private defaultColDef;
  private gridApi;
  private gridColumnApi;
  /* "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }*/

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data;
    });
    this.columnDefs = this.createColumnDefs();
    this.rowData = this.createRowData();
    //this.editType = "fullRow";

    this.frameworkComponents = {
      rowEditCRenderer: RowEditComponent,
    };

    this.defaultColDef = {
      sortingOrder: ['asc', 'desc'],
      stopEditingWhenGridLosesFocus: false,
      sortable: true,
      enableFilter: true,
      suppressKeyboardEvent: function (event) {
        if (!event.editing || event.event.code === 'Enter') return true;
      },
    };
  }

  private createColumnDefs() {
    return [
      {
        headerName: 'User Name',
        field: 'name',
        filter: true,
        enableSorting: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Email Id',
        field: 'email',
        filter: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Address',
        field: 'address.street',
        filter: true,
        sortable: true,
        editable: true,
        cellRenderer: '<a href="edit-user">{{email}}</a>',
      },
      {
        headerName: 'Company Name',
        field: 'company.name',
        filter: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Mobile',
        field: 'phone',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Actions',
        field: 'action',
        cellRenderer: 'rowEditCRenderer',
        cellRendererParams: {
          cancelOtherRowEditors: this.cancelOtherRowEditors.bind(this),
        },
        width: 180,
      },
    ];
  }
  actionCellRenderer(params) {
    let eGui = document.createElement('div');

    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });

    if (isCurrentRowEditing) {
      eGui.innerHTML = `
          <button  
            class="action-button update"
            data-action="update">
                 update  
          </button>
          <button  
            class="action-button cancel"
            data-action="cancel">
                 cancel
          </button>
          `;
    } else {
      eGui.innerHTML = `
          <button 
            class="action-button edit"  
            data-action="edit">
               edit 
            </button>
          <button 
            class="action-button delete"
            data-action="delete">
               delete
          </button>
          `;
    }

    return eGui;
  }
  cancelOtherRowEditors(currentRowIndex) {
    const renderers = this.gridApi.getCellRendererInstances();
    renderers.forEach(function (renderer) {
      if (
        !renderer._agAwareComponent.isNew &&
        currentRowIndex !== renderer._params.node.rowIndex
      ) {
        renderer._agAwareComponent.onCancelClick();
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellClicked(params) {
    if (params.node.field !== 'action') {
      this.cancelOtherRowEditors(params.node.rowIndex);
    }
  }

  createRowData() {
    var rowData = [];
    for (var i = 0; i < 15; i++) {
      rowData.push({
        row: 'Row ' + i,
        value1: i,
        value2: i + 10,
        value3: i + 30,
        currency: i + Number(Math.random().toFixed(2)),
      });
    }
    return rowData;
  }
}
