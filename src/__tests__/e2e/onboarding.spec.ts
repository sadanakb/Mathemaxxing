import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure fresh onboarding
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/onboarding');
  });

  test('completes full onboarding: Bayern → Klasse 3 → Grundschule', async ({ page }) => {
    // Step 1: Bundesland
    await expect(page.getByText('In welchem Bundesland gehst du zur Schule?')).toBeVisible();
    await page.getByRole('radio', { name: /Bayern/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();

    // Step 2: Klasse
    await expect(page.getByText('In welche Klasse gehst du?')).toBeVisible();
    await page.getByRole('radio', { name: /Klasse 3/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();

    // Step 3: Schulform
    await expect(page.getByText('Welche Schulform besuchst du?')).toBeVisible();
    await page.getByRole('radio', { name: 'Grundschule' }).click();
    await page.getByRole('button', { name: /Los/ }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Hallo!')).toBeVisible();
  });

  test('shows correct Schulformen for Bayern Klasse 5', async ({ page }) => {
    await page.goto('/onboarding');

    // Select Bayern
    await page.getByRole('radio', { name: /Bayern/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();

    // Select Klasse 5
    await page.getByRole('radio', { name: /Klasse 5/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();

    // Check available Schulformen
    await expect(page.getByRole('radio', { name: 'Gymnasium' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Mittelschule' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Realschule' })).toBeVisible();
    // Grundschule should NOT be available for Klasse 5 in Bayern
    await expect(page.getByRole('radio', { name: 'Grundschule' })).not.toBeVisible();
  });

  test('back button navigates to previous step', async ({ page }) => {
    await page.getByRole('radio', { name: /Bayern/ }).click();
    await page.getByRole('button', { name: /Weiter/ }).click();

    // Should be on Klasse step
    await expect(page.getByText('In welche Klasse gehst du?')).toBeVisible();

    // Go back
    await page.getByRole('button', { name: /Zurück/ }).click();

    // Should be on Bundesland step again
    await expect(page.getByText('In welchem Bundesland gehst du zur Schule?')).toBeVisible();
  });
});
