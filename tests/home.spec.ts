import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the Qantas logo and hotel count', async ({ page }) => {
        // Check logo
        const logo = page.getByAltText('Qantas Logo');
        await expect(logo).toBeVisible();

        // Check hotel count
        const hotelCount = page.getByText(/hotels in/);
        await expect(hotelCount).toBeVisible();
        const countText = await hotelCount.textContent();
        expect(countText).toMatch(/\d+ hotels in Sydney/);
    });

    test('should display sort by price component with correct options', async ({ page }) => {
        // Check sort label
        const sortLabel = page.getByText('Sort by');
        await expect(sortLabel).toBeVisible();

        // Check sort select exists with correct options
        const sortSelect = page.locator('select');
        await expect(sortSelect).toBeVisible();

        const options = await sortSelect.locator('option').all();
        expect(options.length).toBe(2);

        // Verify option texts
        const optionTexts = await Promise.all(options.map(option => option.textContent()));
        expect(optionTexts).toContain('Price low-high');
        expect(optionTexts).toContain('Price high-low');
    });

    test('should reorder hotels when changing sort option', async ({ page }) => {
        // Get initial hotel prices
        const getPrices = async () => {
            return await page.$$eval('.text-3xl.font-medium.text-black',
                elements => elements.map(element => {
                    const price = element.textContent?.replace(/[^0-9]/g, '');
                    return price ? parseInt(price) : 0;
                })
            );
        };

        const initialPrices = await getPrices();
        expect(initialPrices.length).toBeGreaterThan(0);

        // Sort low to high 
        await page.selectOption('select', 'price-asc');
        await page.waitForTimeout(500);

        // Verify prices are in ascending order
        const sortedAscPrices = await getPrices();
        const isAscending = sortedAscPrices.every((price, index) =>
            index === 0 || price >= sortedAscPrices[index - 1]
        );
        expect(isAscending).toBeTruthy();

        // Verify the same prices are present, just in different order
        expect(sortedAscPrices.sort((a, b) => a - b))
            .toEqual(initialPrices.sort((a, b) => a - b));

        // Change sort to high to low
        await page.selectOption('select', 'price-desc');
        await page.waitForTimeout(500);

        // Verify prices are now in descending order
        const sortedDescPrices = await getPrices();
        const isDescending = sortedDescPrices.every((price, index) =>
            index === 0 || price <= sortedDescPrices[index - 1]
        );
        expect(isDescending).toBeTruthy();
    });
}); 