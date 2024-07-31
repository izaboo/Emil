import { Locator, Page } from "@playwright/test";
import { DemoCentralBasePage } from "./base-page";

export class BoardPage extends DemoCentralBasePage {
  page: Page;
  boardIframe: Locator;
  sheetName: Locator;
  startDate: Locator;
  endDate: Locator;
  creditCardMenu: Locator;
  dataMenu: Locator;
  exportCsv: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.boardIframe = page.frameLocator('iframe').first().getByTestId('analysis_text_title');
    this.sheetName = page.frameLocator('iframe').first().getByTestId('analysis_text_title');
    this.startDate = this.getIframeElementById('date_picker_0');
    this.endDate = this.getIframeElementById('date_picker_1');

    this.dataMenu = this.getIframeElementById('analysis_visual_dropdown_menu_button');
    this.creditCardMenu = page.frameLocator('iframe').first().locator('#menu- > div').first();
    this.exportCsv = page.frameLocator('iframe').first().getByRole('menuitem', { name: 'Export to CSV' });
  }

  getIframeElementById(id: string): Locator {
    return this.page.frameLocator('iframe').first().getByTestId(id);
  }

  getIframeElementByText(text: string): Locator {
    return this.page.frameLocator('iframe').first().getByText(text);
  }

  getIframeElementByLabel(text: string): Locator {
        return this.page.frameLocator('iframe').first().getByLabel(text, { exact: true });
  }

}
