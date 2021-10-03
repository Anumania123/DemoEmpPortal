import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-row-edit',
  template: `
  <button type="button" *ngIf="isNew == true" (click) = "onEditClick()" data-action-type="view" class="action-button edit">
             Edit
           </button>

           <button type="button"  *ngIf="isNew == false" (click) = "onUpdateClick()" data-action-type="view" class="action-button update">
             Update
           </button>

           <button type="button" *ngIf="isNew == false" (click) = "onCancelClick()" data-action-type="view" class="action-button cancel">
             Cancel
           </button>

          <button type="button"  *ngIf="isNew == true" (click) = "onDeleteClick()" data-action-type="remove" class="action-button delete">
             Delete
          </button>`,
  styleUrls: ['./row-edit.component.css'],

  styles: [
    `.btn {
          line-height: 0.5
      }`,
  ],
})
export class RowEditComponent implements ICellRendererAngularComp {
  public params: any;
  public isNew: any;
  previousData: any;
  agInit(params: any): void {
    this.params = params;
  }

  constructor() {
    this.isNew = true;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  refresh(): boolean {
    return false;
  }

  onEditClick() {
    const index = this.params.node.rowIndex;
    this.params.cancelOtherRowEditors(index);
    this.isNew = false;
    this.previousData = JSON.parse(JSON.stringify(this.params.node.data));
    let cols = this.params.columnApi.getAllGridColumns();
    let firstCol = {
      colId: '',
    };
    if (cols) {
      firstCol = cols[0];
    }
    let rowIndex = this.params.node.rowIndex;
    this.params.api.setFocusedCell(rowIndex, firstCol.colId);
    this.params.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'row',
    });
  }

  onUpdateClick() {
    this.isNew = true;
    let obj: any = {};
    obj.type = 'update';
    this.params.api.stopEditing();
    obj.selectedData = [this.params.data];
    // update logic ....
  }

  public onCancelClick() {
    this.isNew = true;
    this.params.node.setData(this.previousData);
    this.params.api.stopEditing(true);
  }

  onDeleteClick() {
    const selectedData = [this.params.node.data];
    console.log(selectedData);
    this.params.api.applyTransaction({ remove: selectedData });
  }
}
