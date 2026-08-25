import { expect, test } from '@playwright/test';

const legalPages = [
  {
    path: 'about',
    title: 'Sobre Binary Coffee',
    content: 'Binary Coffee es una comunidad principalmente compuesta por desarrolladores de software',
  },
  {
    path: 'privacy-policy',
    title: 'Políticas de Privacidad de Binary Coffee',
    content: 'la privacidad de nuestros visitantes',
  },
  {
    path: 'cookies',
    title: 'Políticas de Cookie para Binary Coffee',
    content: '¿Qué son las Cookies?',
  },
  {
    path: 'code-of-conduct',
    title: 'Código de conducta',
    content: 'Nuestro compromiso',
  },
  {
    path: 'term-of-use',
    title: 'Términos y condiciones de uso',
    content: '1. Términos',
  },
] as const;

test.describe('Legal pages', () => {
  for (const legalPage of legalPages) {
    test(`should load /${legalPage.path} and show expected information`, async ({ page }) => {
      const url = `https://dev.binarycoffee.dev/${legalPage.path}`;

      await page.goto(url);

      await expect(page).toHaveURL(url);
      await expect(page.getByRole('heading', { name: legalPage.title })).toBeVisible();
      await expect(page.getByText(legalPage.content, { exact: false })).toBeVisible();
    });
  }
});
