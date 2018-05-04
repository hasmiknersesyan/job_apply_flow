"use strict";

const poEl = require('../objects/elements.json'),
    poConst = require('../objects/const.json'),
    test_data = require('../objects/testData.json'),
    hlFindJob = require('../helpers/findJob.js');

describe('Job apply flow test ', () => {
    const EC = protractor.ExpectedConditions,
        waitTime = 5000;
    let isReady;

    let applyJob = (testObj) => {
        it('should validate apply fields and process', (done) => {
            hlFindJob.ApplyInputs(testObj)
                .then(() => element(by.xpath(poEl.jobApply.btnSubmit)).click())
            //add checks for field errors
                .catch((err) => {
                    isReady = err;
                    expect(isReady).toBeFalsy();
                })
                .finally(done);
        });
    }

    beforeAll((done) => {
        browser.ignoreSynchronization = true;

        browser.get(poEl.url)
            .then(() => browser.driver.manage().window().maximize())
            .catch((err) => isReady = err)
            .finally(done);
        });

    it('should check job page', (done) => {
        if(isReady) return done();

        browser.wait(EC.visibilityOf(element(by.xpath(poEl.txtTitle))), waitTime, 'wait for app loads')
            .then(() =>  element(by.xpath(poEl.inputJob)).clear().sendKeys(poConst.inputJob))
            .then(()=> browser.wait(EC.visibilityOf($('[data-index]')), waitTime, 'wait for autocomplete job list displays'))
            .then(() => $$('[data-index]').get(0).click())
            .then(() => element(by.xpath(poEl.btnFind)).click())
            .then(()=> browser.wait(EC.visibilityOf(element(by.xpath(poEl.lbljobResult))), waitTime, 'wait for job result displays'))
            .then(() => {
                expect(element(by.xpath(poEl.btnApply)).isDisplayed()).toBe(true, 'check the apply button is added');
                return element(by.xpath(poEl.btnApply)).click();
            })
            .then(() => browser.wait(EC.visibilityOf(element(by.xpath(poEl.jobApply.txtHeader))), waitTime, 'wait for jpb page loads'))
            .then(() => expect(element(by.xpath(poEl.jobApply.boxApply)).isDisplayed()).toBe(true, 'check the Apply bloc displays'))
            .catch((err) => {
                isReady = err;
                expect(isReady).toBeFalsy();
            })
            .finally(done);
    });

    for(let i = 0 ; i < test_data.applyForJob.length; i++) {
        describe('validate fields', () => {
            applyJob(test_data.applyForJob[i]);
    });
    }
});