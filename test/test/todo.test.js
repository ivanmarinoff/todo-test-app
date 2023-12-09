const {test, expect} = require('@playwright/test');

test('user can add a task', async ({page}) => {
    await page.goto('https://to-do-test-app.onrender.com');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskTest = await page.textContent('.task');
    expect(taskTest).toContain('Test Task');
});

test('user can delete a task', async ({page}) => {
    await page.goto('https://to-do-test-app.onrender.com');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task',
        tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');

});

test('user can mark a task as completed', async ({page}) => {
    await page.goto('https://to-do-test-app.onrender.com');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    const completedTask = await page.$('.task .task-complete');
    expect(completedTask).not.toBeNull();
});

test('user can filter task', async ({ page }) => {
    await page.goto('https://to-do-test-app.onrender.com');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.click('#filter', 'Completed');

    const incompletedTask = await page.$('.task:not(.completed)');
    expect(incompletedTask).toBeNull();
});

