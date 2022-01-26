import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { WINDOW } from '@dcs-libs/shared';

export interface MetaTag {
  key: string;
  value: string;
}

export declare type LinkDefinition = {
  id?: string;
  charset?: string;
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  rev?: string;
  sizes?: string;
  target?: string;
  type?: string;
  title?: string;
} & {
  [prop: string]: string;
};

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  public static metas = 'og:url';
  public static titleMeta = 'og:title';
  public static descriptionMeta = 'og:description';
  public static imageMeta = 'og:image';
  public static typeMeta = 'og:type';
  public static secureImageMeta = 'og:image:secure_url';
  public static twitterTitleMeta = 'twitter:text:title';
  public static twitterImageMeta = 'twitter:image';

  constructor(
    private title: Title,
    private rendererFactory: RendererFactory2,
    @Inject(WINDOW) private window: Window,
    private meta: Meta) {
  }

  public updateMetas(tags: MetaTag[]) {
    tags.forEach(siteTag => {
      this.meta.updateTag({ name: siteTag.key, content: siteTag.value });
      this.meta.updateTag({ property: siteTag.key, content: siteTag.value });
    });
  }

  public addLinkTag(tag: LinkDefinition, id = '-1') {
    try {
      tag.id = id;

      const renderer = this.rendererFactory.createRenderer(this.window.document, {
        id,
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      let link = this.window.document.getElementById(id);
      if (!link) {
        link = renderer.createElement('link');
      }
      const head = this.window.document.head;

      Object.keys(tag).forEach((prop: string) => {
        return renderer.setAttribute(link, prop, tag[prop]);
      });

      renderer.appendChild(head, link);

    } catch (er) {
      // console.error(er);
    }
  }
}
