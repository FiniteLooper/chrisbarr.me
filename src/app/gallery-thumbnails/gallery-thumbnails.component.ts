import { AfterViewInit, Component, Input, ViewChild, inject } from '@angular/core';
import { CustomImageItem, CustomYoutubeItem } from '../data/data.model';
import { Gallery, GalleryImageDef } from 'ng-gallery';

@Component({
  selector: 'app-gallery-thumbnails',
  templateUrl: './gallery-thumbnails.component.html',
  styleUrls: ['./gallery-thumbnails.component.scss'],
})
export class GalleryThumbnailsComponent implements AfterViewInit {
  private readonly gallery = inject(Gallery);

  @ViewChild(GalleryImageDef, { static: true }) imageDef!: GalleryImageDef;

  @Input() galleryId = '';
  @Input() itemList: CustomImageItem[] | CustomYoutubeItem[] = [];
  @Input() dense = false;

  ngAfterViewInit(): void {
    this.gallery
      .ref(this.galleryId, {
        counter: false,
        thumbAutosize: true,
        thumb: false,
        imageTemplate: this.imageDef.templateRef,
      })
      .load(this.itemList);
  }
}
