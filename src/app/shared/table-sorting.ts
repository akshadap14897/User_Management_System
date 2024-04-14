import { Component, Input } from "@angular/core";

export class TableSorting {
  public sortingFlag = 0;
 allIsActive: any=[];
  public sortingcolumnname = "";
  
  public sortingClass = {
    sorting_arrow_asc:
      this.sortingFlag == 0 || this.sortingFlag == 1 ? true : false,
    sorting_arrow_desc: this.sortingFlag == 2 ? true : false,
  };

  public sortingnormalclass = {
    sorting_arrow_normal: true,
  };

  //Function to Sort the Table
  public SortTableRows(sortingKey: string, tableData: any[], isBoolean = false) {
    var sortedArray = [];
    this.sortingcolumnname = sortingKey;
    if (isBoolean == true) {
      var allIsActive :any[];
      tableData.forEach((td) => {
        allIsActive.push(td[sortingKey]);
      });
      var allIsActiveValues = new Set(allIsActive).size;
      if (allIsActiveValues > 1) {
        sortedArray = tableData.sort((a, b) => {
          if (a[sortingKey] < b[sortingKey]) {
            return -1;
          }
          if (a[sortingKey] > b[sortingKey]) {
            return 1;
          }
          return 0;
        });
      }
    } else {
      sortedArray = tableData.sort((a, b) => {
        if (a[sortingKey] > b[sortingKey]) {
          return -1;
        }
        if (a[sortingKey] < b[sortingKey]) {
          return 1;
        }
        return 0;
      });
    }

    if (this.sortingFlag == 1) {
      tableData = sortedArray;
      this.sortingFlag = 2;
    } else {
      tableData = sortedArray.reverse();
      this.sortingFlag = 1;
    }

    this.sortingClass = {
      sorting_arrow_asc:
        this.sortingFlag == 0 || this.sortingFlag == 1 ? true : false,
      sorting_arrow_desc: this.sortingFlag == 2 ? true : false,
    };
    this.sortingnormalclass = {
      sorting_arrow_normal: true,
    };

    //console.log(this.sortingClass, this.sortingFlag);
  }
}

@Component({
  selector: 'app-sorting-toggle',
  template: `
  <img src="assets/sortasc.svg" 
      *ngIf="(Column == CheckColumn ? true : false) && Flag == 1" alt="">
  <img src="assets/sortdesc.svg"
      *ngIf="(Column == CheckColumn ? true : false) && Flag == 2" alt="">
    `
})
export class SortingToggler {
  @Input() Column = "";
  @Input() CheckColumn: any;
  @Input() Flag = 0;
}