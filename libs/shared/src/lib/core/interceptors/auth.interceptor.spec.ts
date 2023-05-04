import {AuthInterceptor} from "./auth.interceptor";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    interceptor = new AuthInterceptor({} as unknown as Store, {} as unknown as Router);
  });

  it('validate replaceDatesKeysInResponse method', () => {
    const created_at = new Date(), updated_at = new Date(), published_at = new Date();
    const example = {created_at, a: {b: {updated_at, c: [{published_at}]}}};
    const expected = {a: {b: {c: [{publishedAt: published_at}], updatedAt: updated_at,}}, createdAt: created_at,}
    interceptor.replaceDatesKeysInResponse(example)
    expect(example).toEqual(expected);
  });

  it('should format response and remove data.attributes structure', function () {
    const example = {"data": {"posts": {"data": [{"id": "25", "attributes": {"title": "hfycjfqwsikzngrojlsw", "name": "hfycjfqwsikzngrojlswlecjs", "body": "sesfbbzavyhiklouwwtr", "comments": 0, "likes": 0, "views": 0, "createdAt": "2023-05-03T08:37:26.276Z", "updatedAt": "2023-05-03T08:37:26.276Z", "publishedAt": "2023-05-03T08:37:26.266Z", "enable": true, "banner": {"data": {"url": "https://test.com"}}, "author": {"data": {"id": 1, "attributes": {"username": "asdfasdfe", "avatarUrl": "asdwefsvsdf"}}}, "tags": {"data": [{"id": "13", "attributes": {"name": "c++"}}, {"id": "55", "attributes": {"name": "arduino"}}]}}}], "meta": {"pagination": {"total": 30}}}}};
    const expected = {"data": {"meta_posts": {"pagination": {"total": 30}}, "posts": [{"author": {"avatarUrl": "asdwefsvsdf", "id": 1, "username": "asdfasdfe"}, "banner": {"data": {"url": "https://test.com"}}, "body": "sesfbbzavyhiklouwwtr", "comments": 0, "createdAt": "2023-05-03T08:37:26.276Z", "enable": true, "id": "25", "likes": 0, "name": "hfycjfqwsikzngrojlswlecjs", "publishedAt": "2023-05-03T08:37:26.266Z", "tags": [{"id": "13", "name": "c++"}, {"id": "55", "name": "arduino"}], "title": "hfycjfqwsikzngrojlsw", "updatedAt": "2023-05-03T08:37:26.276Z", "views": 0}]}};
    expect(interceptor.formatResponseObjects(example)).toEqual(expected);
  });
});
