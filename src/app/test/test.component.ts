import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
      Welcome {{name}}
      <!-- property binding --> 
      <input bind-id="id" type="text" value="hello text"  [disabled]="disabled" />

      <!--  class binding --> 
      <p [class]="successClass">class name assign from TS Class according property value</p>
      <p [class.text-danger]="isError">if isError is true then .text-danger class will apply</p>

      <!-- class directive // custom html attribute provide by angular --> 
     <p [ngClass]="manage">Multiple Class Apply base on condition</p>

     <!-- style binding -->
      <p [style.color]="'red'">Style binding</p>
      <p [ngStyle]="styles">multiple style</p>

      <!-- Event binding -->
      <button (click)="greeting='hello'">click</button>
      <button (click)="clickHandler($event)">click</button>

      <!-- Text Interpolation -->
      {{greeting}}
      <br />
      <!-- Template Reference -->
      <input #myInput type="text" />
      <button (click)="logValue(myInput)">log</button>
      <br />
      <!-- Two way binding -->
      <input [(ngModel)]="fullName" type="text"/>
      {{fullName}}

      <h4>{{parentComponentData}}</h4>

      <!-- Data send to parent -->
      <input type="text" [(ngModel)]="childData"/> <button (click)="fireEvent()">Send</button>
    </div>
  `,
  styles: [`
    .text-success{
      color: green;
    }
    .text-danger{
      color: red;
    }
    .text-special: {
      font-style: italic;
      font-weight: bold;
    }
  `]
})
export class TestComponent implements OnInit {

  // data from parent
  @Input() public parentComponentData: any;
  // or
  // @Input('parentComponentData') public pcName: any;
  
  public childData = "";
  
  //==== data sent to parent ===
  //create event
  @Output() public childEvent = new EventEmitter();

  fireEvent(){
    this.childEvent.emit(this.childData)
    this.childData = ""
  }


  public name = "Solim Mollah";
  public id = "myId";
  public disabled = true;
  public successClass = "text-success"
  public isError = false;
  public special = true;
  public manage = {
    "text-success": !this.isError,
    "text-danger": this.isError,
    "text-special": this.special
  }
  public styles = {
    color: 'blue',
    fontStyle: 'italic',
    fontWeight: 'bold'
  }

  public greeting = ""

  public fullName = ""

  constructor() { }

  ngOnInit(): void {
  }

  clickHandler(event: any) {
    console.log(event);

    this.greeting = "welcome to angular"
  }


  logValue(el: any) {
    console.log(el.value);

  }
}
