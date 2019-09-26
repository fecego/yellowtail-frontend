import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  instagramPhotos: Array<any>;

  constructor(private httpClient: HttpClient) {
    this.instagramPhotos = [{},{}];
  }

  ngOnInit() {
    const url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=7124042337.bf87c56.fbf9900d05b245cb859675332f363e88";
    this.httpClient.get(url).subscribe((response: any)=>{
      if (response.meta.code === 200) {
        this.preparePhotos(response.data);
      }
    });
  }

  preparePhotos(data) {
    const prepared = data.map(item => {
      const image  = item.images.thumbnail.url;
      let firstTags = item.tags.slice(0,3);
      if (firstTags.length == 0) firstTags = ['yellowtail'];
      const tags = firstTags.join(' ');
      return {
        image,
        tags,
        link: item.link,
      };
    });

    this.instagramPhotos = prepared.slice(0, 8);
  }

}
