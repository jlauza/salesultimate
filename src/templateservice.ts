import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class TemplateService {
  constructor() {
    this.registerPartials();
  }

  private registerPartials() {
    const partialsDir = path.join(__dirname, '..', 'views', 'partials');

    try {
      const file = fs.readdirSync(partialsDir);
      file.forEach((file) => {
        const partialData = fs.readFileSync(`${partialsDir}/${file}`, 'utf-8');
        const partialName = path.basename(file, path.extname(file));

        handlebars.registerPartial(partialName, partialData);
      });
    } catch (err) {
      console.error(`Error reading directory ${partialsDir}: ${err}`);
    }
  }

  render(template: string, context: any): string {
    const templateCompile = handlebars.compile(template);
    return templateCompile(context);
  }
}
