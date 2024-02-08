import { Component } from '@angular/core';
import { IPhotoCategory, photosList } from '../data/photo.data';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
})
export class PhotoComponent {
  photoCategories: IPhotoCategory[] = [...photosList];
}