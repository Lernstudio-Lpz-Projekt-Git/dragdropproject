import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dragdropproject';
  // Liste der Quell-Elemente, hier Bild-Dateinamen aus dem Assets-Verzeichnis
  imagesList: string[] = [
    'eisbecher1.jpg',
    'eisbecher2.jpg',
    'eisbecher3.jpg',
    'eisbecher4.jpg',
    'eisbecher5.jpg',
    'eisbecher6.jpg',
    'eisbecher7.jpg',
  ];

  // Aktuelle Liste der Elemente im Targetbereich
  currentTragetList: string[] = [];
  // Anzahl der Elemente im Targetbereich
  imgInTargetCounter: number = this.currentTragetList.length;
  dragging: boolean = true;

  // Aufruf der Funktion, durch den in der [cdkDropDropped] definierten Bezeichner (Bilderliste)
  // Wie Sie im untenstehenden Code-Snippet sehen können, enthält das Drag-and-Drop-CDK auch eine Utility-Funktion
  // [moveItemInArray]. Diese Funktion wird verwendet, um den neuen Index des abgelegten Elements innerhalb des Arrays zu berechnen
  dropSourceImage(event: CdkDragDrop<string[]>) {
    if (this.imgInTargetCounter < 6) {
      // Berechnet den neuen Index einer Liste nach dem Drop-Event, wir hier nicht benötigt
      // moveItemInArray(this.imagesList, event.previousIndex, event.currentIndex);
      // Das zentrale Array zum Verwalten der plazierten Elemente
      this.currentTragetList.push(this.imagesList[event.currentIndex]);
      // Aktuelle Anzahl der plazierten Elemente
      this.imgInTargetCounter = this.currentTragetList.length;
    }
  }

// Aufruf der Funktion, durch den in der [cdkDropDropped] definierten Bezeichner (Target-Bereich)
  dropTargetImage(event: CdkDragDrop<string[]>) {
// [moveItemInArray]. Diese Funktion wird verwendet, um den neuen Index des abgelegten Elements innerhalb des Arrays zu berechnen,
    moveItemInArray(
      this.currentTragetList,
      event.previousIndex,
      event.currentIndex
    );
  }

// Entfernt einzelne Eelemnte aus dem Array und damit aus dem Target-Bereich
// Übergeben wird das Mouse-Event-Object, aus dem die Id Extrahiert wird
  onDeleteDrop(e: any): void {
    if (this.dragging) {
      var target = e.target.getAttribute("id");
      this.removeItem(target);
      return;
    }
  }

  removeItem(item: string) {
    // Emeittelt den Index des zu löschenden Elementes im Array
    let index = this.currentTragetList.indexOf(item);
    // Und entfernt es aus der Liste
      this.currentTragetList.splice(index, 1);
      this.imgInTargetCounter = this.currentTragetList.length;
  }

  // Entfernt alle Elemente aus dem Targetbereich
  clearLayout() {
    this.currentTragetList = [];
    this.imgInTargetCounter = 0;
  }
}
