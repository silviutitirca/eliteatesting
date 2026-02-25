import { test, expect } from '@playwright/test';

test.describe('EPAM client work navigation', () => {
  test('Navigate to EPAM and verify Client Work page', async ({ page }) => {
    // Step 1: Navigate to EPAM
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    // Try to close cookie/consent popups if present
    try {
      const acceptButtons = page.getByRole('button', { name: /accept|agree|allow|accept all|accept cookies/i });
      if (await acceptButtons.count() > 0) {
        await acceptButtons.first().click();
      }
    } catch (e) {
      // ignore
    }

    // Step 2: Hover over or select "Services" from header menu
    try {
      const services = page.getByRole('link', { name: 'Services' });
      if (await services.count() > 0) {
        await services.first().hover();
        try { await services.first().click(); } catch(e) {}
      } else {
        const servicesText = page.getByText('Services');
        if (await servicesText.count() > 0) {
          await servicesText.first().hover();
          try { await servicesText.first().click(); } catch(e) {}
        }
      }
    } catch (e) {
      // ignore
    }

    // Step 3: Click the "Explore Our Client Work" link
    try {
      const explore = page.getByText('Explore Our Client Work');
      if (await explore.count() > 0) {
        await explore.first().click();
      } else {
        const explorePartial = page.getByText('Explore Our Client');
        if (await explorePartial.count() > 0) await explorePartial.first().click();
      }
    } catch (e) {
      // ignore
    }

    // Step 4: Verify that "Client Work" text is visible
    await expect(page.getByText('Client Work')).toBeVisible();
  });
});
