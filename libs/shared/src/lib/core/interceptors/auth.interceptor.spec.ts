import {AuthInterceptor} from "./auth.interceptor";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    interceptor = new AuthInterceptor({} as unknown as Store, {} as unknown as Router);
  });

  it('should ', function() {
    expect(1).toEqual(1);
  });
  // it('validate replaceDatesKeysInResponse method', () => {
  //   const created_at = new Date(), updated_at = new Date(), published_at = new Date();
  //   const example = {created_at, a: {b: {updated_at, c: [{published_at}]}}};
  //   const expected = {a: {b: {c: [{publishedAt: published_at}], updatedAt: updated_at,}}, createdAt: created_at,}
  //   interceptor.replaceDatesKeysInResponse(example)
  //   expect(example).toEqual(expected);
  // });
});
