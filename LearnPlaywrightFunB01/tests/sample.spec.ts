import { test, expect } from '@playwright/test';

test("My First Test", async function ({page}) {
    expect(12).toBe(12)

})

test.skip("My second test", async function({page}) {
    expect(100).toBe(101)
})

test("My third Test", async function ({page}) {
    expect(2.0).toBe(2.0)

})

test("My fourth Test", async function ({page}) {
    expect("Phuc Do").toContain("Phuc")
})

test("My fifth Test", async function ({page}) {
    expect(true).toBeTruthy()
})

test("My fifth01 Test", async function ({page}) {
    expect(false).toBeFalsy()
})

test("My sixth Test", async function ({page}) {
    expect("Phuc Do".includes("Phuc")).toBeTruthy()
})