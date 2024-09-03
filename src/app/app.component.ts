import { Component } from '@angular/core';
import PSPDFKit, { Instance } from 'pspdfkit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
})
export class AppComponent {
  title = 'PSPDFKit for Web Angular Example';
  instance!: Instance;
  public downloadJSON: any;

  ngOnInit() {
    (async () => {
      try {
        let data = {
          config: {
            delimiter: {
              start: '{{',
              end: '}}',
            },
          },
          model: {
            helloWorld: 'PSPDFKit',
          },
        };
        const docBuffer = await PSPDFKit.populateDocumentTemplate(
          {
            document: '/assets/doctemp.docx',
          } as any,
          data as any
        );
      } catch (error) {
        console.error(error);
      }
      const instance = await PSPDFKit.load({
        baseUrl: location.protocol + '//' + location.host + '/assets/',
        document: "/assets/document.pdf",
        // document: docBuffer,
        container: '#pspdfkit-container',
      });
    })();
  }
}
