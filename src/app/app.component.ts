import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dragdropproject';
  imgInTargetCounter: number = 0;
  imagesList: string[] = [
    'eisbecher1.jpg',
    'eisbecher2.jpg',
    'eisbecher3.jpg',
    'eisbecher4.jpg',
    'eisbecher5.jpg',
    'eisbecher6.jpg',
    'eisbecher7.jpg',
  ];

  currentTragetList: string[] = [];
  dragging: boolean = true;

  dropSourceImage(event: CdkDragDrop<string[]>) {
    if (this.imgInTargetCounter < 6) {
      console.log('event.currentIndex', event.currentIndex);
      moveItemInArray(this.imagesList, event.previousIndex, event.currentIndex);
      this.currentTragetList.push(this.imagesList[event.currentIndex]);
      console.log('event.imagesList', this.imagesList);
      this.imgInTargetCounter += 1;
      console.log('imgInTargetCounter', this.currentTragetList);
    }
  }

  dropTargetImage(event: CdkDragDrop<string[]>) {
    this.dragging = true;
    console.log('Target currentIndex', event.currentIndex);
    moveItemInArray(
      this.currentTragetList,
      event.previousIndex,
      event.currentIndex
    );
  }

  onDeleteDrop(e: any): void {
    if (this.dragging) {
      var target = e.target.getAttribute("id");
      console.log(target);
      this.removeItem(target);
      //this.dragging = false;
      return;
    }
  }

  removeItem(item: string) {
    let index = this.currentTragetList
      .map(function (elem) {
        return elem;
      })
      .indexOf(item);
      this.currentTragetList.splice(index, 1);
      this.imgInTargetCounter -= 1;
  }

  clearLayout() {
    this.currentTragetList = [];
    this.imgInTargetCounter = 0;
  }
}
