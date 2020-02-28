import {TestBed} from '@angular/core/testing';

import {MetaTagsService} from './meta-tags.service';
import {Meta, Title} from '@angular/platform-browser';

class TitleStub {
}

class MetaStub {
}

describe('MetaTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MetaTagsService,
      {provide: Meta, useClass: MetaStub},
      {provide: Title, useClass: TitleStub}
    ]
  }));

  it('should be created', () => {
    const service: MetaTagsService = TestBed.get(MetaTagsService);
    expect(service).toBeTruthy();
  });
});
