import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
