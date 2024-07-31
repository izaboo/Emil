import { test, expect, Page } from '@playwright/test';
import { DemoCentralBasePage } from '../helpers/pages/base-page';
import { BoardPage } from '../helpers/pages/board';
import { readFile } from '../helpers/files/csv';

test.describe("General action to get filtered customers revenue data ", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
  });

  test('Download csv file for customers and verify summarized revenue', async () => {
    await expect(page).toHaveTitle(/DemoCentral/);
    const startPage = new DemoCentralBasePage(page);

    await expect(startPage.heading).toBeVisible({ timeout: 10000 });
    await startPage.contentBrowserOpen.click();
    await startPage.askQ.click();
    await startPage.financialServices.click();
    await startPage.contentBrowserClose.click();
    const boardPage = new BoardPage(page);

    await expect(boardPage.getIframeElementByText('Transaction Trends')).toBeVisible();
    await boardPage.getIframeElementByLabel('Customers').click();
    await expect(boardPage.getIframeElementByText('Customer Details')).toBeVisible();
    await boardPage.getIframeElementByLabel('Controls').click();;

    await boardPage.startDate.fill('2023/11/23');
    await boardPage.endDate.fill('2023/11/23');

    await expect(boardPage.getIframeElementByText('Credit Card')).toBeVisible();

    await boardPage.getIframeElementByLabel('All').click();
    await expect(boardPage.getIframeElementByLabel('Select all')).toBeChecked();
    await boardPage.getIframeElementByText('Select all').click();
    await expect(boardPage.getIframeElementByLabel('Select all')).not.toBeChecked();
    await boardPage.getIframeElementByText('MasterCard').click();
    await expect(boardPage.getIframeElementByLabel('MasterCard').last()).toBeChecked();
    await boardPage.creditCardMenu.click();

    await boardPage.getIframeElementByLabel('Table, Customer List').hover()
    await boardPage.dataMenu.click();

    const downloadPromise = page.waitForEvent('download');
    await boardPage.exportCsv.click();
    const download = await downloadPromise;
    const suggestedFilename = download.suggestedFilename();
    await download.saveAs("./data/" + suggestedFilename);

    const fileContentArray = readFile(suggestedFilename);
    let cumulativeIncome = 0;
    fileContentArray.forEach((element) => {
      const currentPerson = element.split(",")
      cumulativeIncome += Number(currentPerson[currentPerson.length - 1]);
    });
    console.log(cumulativeIncome);
    expect(cumulativeIncome).toBe(13915.15);
  });
});