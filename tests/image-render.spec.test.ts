import { test, expect } from '@playwright/test';

test('Image should be rendered with correct attributes', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Adjust the URL as needed
  const image = await page.$('img[alt="Next.js logo"]');
  expect(image).not.toBeNull();
  
  if (image) {
    const src = await image.getAttribute('src');
    console.log('Image src:', src);
    expect(src).toBe('https://nextjs.org/icons/next.svg');
    
    const width = await image.getAttribute('width');
    console.log('Image width:', width);
    expect(width).toBe('180');
  }
});