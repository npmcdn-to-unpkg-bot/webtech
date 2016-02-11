import {TranslatePipe} from './translate.pipe';
import {TranslateService} from './translate.service';

export * from './translate.pipe';
export * from './translate.service';
export * from './translate.parser';

export default {
  pipes: [TranslatePipe],
  providers: [TranslateService]
}
