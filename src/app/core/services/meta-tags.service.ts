import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

export interface MetaTag {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  public static metas = 'og:url';
  public static titleMeta = 'og:title';
  public static descriptionMeta = 'og:description';
  public static imageMeta = 'og:image';
  public static secureImageMeta = 'og:image:secure_url';
  public static twitterTitleMeta = 'twitter:text:title';
  public static twitterImageMeta = 'twitter:image';

  constructor(private title: Title, private meta: Meta) {
  }

  public updateMetas(tags: MetaTag[]) {
    tags.forEach(siteTag => {
      // const tagName = this.meta.getTag(`name='${siteTag.key}'`);
      // const tagProperty = this.meta.getTag(`property='${siteTag.key}'`);
      this.meta.updateTag({name: siteTag.key, content: siteTag.value});
      this.meta.updateTag({property: siteTag.key, content: siteTag.value});
    });
  }
}
