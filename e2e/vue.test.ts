import { test, expect } from '@playwright/test';

const AUTH_PAGE = '/auth';

test('visits the app root url', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Главная страница');
})

test('test auth', async ({ page }) => {
    await page.goto(AUTH_PAGE);

    // Заполняем форму
    await page.locator('[type="email"]').first().fill('user@example.com');
    await page.locator('[name="adress"]').first().fill(' dfd d fd gfdgdfgfd gfdg dfgd fdf ');
    await page.locator('[name="password"], [type="password"]').first().fill('password123');
    await page.locator('button:has-text("Войти")').click();

    // Ждем, когда URL ИЗМЕНИТСЯ (станет не таким, как был)
    await page.waitForURL(url => {
        return !url.toString().includes(AUTH_PAGE); // URL больше не содержит /login
    });
})

test('add product to cat', async ({ page }) => {
    await page.goto('/product/1');
    await page.locator('.product_add').click();

    const catNumberContent =  await page.locator('.cat_number').first().textContent();
    await expect(page.locator('.cat_number').first()).toHaveText('1');
})