import { TestBed } from '@angular/core/testing';

import { MetaTagsService } from './meta-tags.service';
import { Meta, Title } from '@angular/platform-browser';
import { WINDOW } from '@dcs-libs/shared';
import { RendererFactory2 } from '@angular/core';

class TitleStub {
}

class MetaStub {
}

class RendererFactory2Stub {
}

describe('MetaTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MetaTagsService,
      {provide: Meta, useClass: MetaStub},
      {provide: RendererFactory2, useClass: RendererFactory2Stub},
      {provide: Title, useClass: TitleStub},
      {provide: WINDOW, useValue: window}
    ]
  }));

  it('should be created', () => {
    const service: MetaTagsService = TestBed.inject(MetaTagsService);
    expect(service).toBeTruthy();
  });
});
