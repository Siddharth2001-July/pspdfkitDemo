import { Component } from "@angular/core";
import PSPDFKit from "pspdfkit";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["app.component.css"],
  standalone: true
})
export class AppComponent {
  title = "PSPDFKit for Web Angular Example";

  ngAfterViewInit() {
    PSPDFKit.load({
      baseUrl: location.protocol + "//" + location.host + "/assets/",
      document: "/assets/document.pdf",
      container: "#pspdfkit-container",
    }).then(async (instance) => {
      (window as any).instance = instance;
      //Enter your search term inside the quotes
      const results = await instance.search("Guide");
      let wordIsInPages = [0]
      if (results.size > 0) {
        const annotations = results.map((result) => {
          wordIsInPages.push(Number(result.pageIndex))
          console.log(result)
          return new PSPDFKit.Annotations.HighlightAnnotation({
            pageIndex: result.pageIndex,
            rects: result.rectsOnPage,
            boundingBox: PSPDFKit.Geometry.Rect.union(result.rectsOnPage)
          });
        });
        instance.create(annotations);
        const newState = instance.viewState.set('currentPageIndex', wordIsInPages[1])
        instance.setViewState(newState);
      }
    })
  }
}