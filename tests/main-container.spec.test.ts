import { test, expect } from '@playwright/test';

test('Main container should be rendered', async ({ page }) => {
  console.log('Navigating to the page...');
  const startTime = Date.now();
  await page.goto('http://localhost:3000', { timeout: 60000 }); // Increased timeout to 60 seconds
  console.log('Page loaded in', Date.now() - startTime, 'ms');
  
  const elementStartTime = Date.now();
  const mainContainer = await page.$('div.grid');
  console.log('Element found in', Date.now() - elementStartTime, 'ms');
  console.log('Main container:', mainContainer);
  
  expect(mainContainer).not.toBeNull();
});