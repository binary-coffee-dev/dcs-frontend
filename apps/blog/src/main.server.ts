import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppServerModule } from "./app/app.server.module";

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  return bootstrapApplication(AppServerModule, {providers: []});
};

export default bootstrap;
