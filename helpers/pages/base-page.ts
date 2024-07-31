import { Locator, Page } from "@playwright/test";

export class DemoCentralBasePage {
  page: Page;

  heading: Locator;
  contentBrowserOpen: Locator;
  contentBrowserClose: Locator;
  askQ: Locator;
  financialServices: Locator;

  
  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText('Welcome to QuickSight DemoCentral');
    this.contentBrowserOpen = page.locator('#MiniBrowsePanelClosedFolder');
    this.contentBrowserClose = page.locator('#MiniBrowsePanelOpenFolder');
    this.askQ = page.getByText('Ask Q');
    this.financialServices = page.getByText('Q - Financial Services Card');
  
  }

}
