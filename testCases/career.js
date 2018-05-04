    "use strict";

    const poEl = require('../objects/elements.json'),
        poConst = require('../objects/const.json'),
        hlFindJob = require('../helpers/findJob.js');

    describe('Job apply flow test ', () => {

        const EC = protractor.ExpectedConditions,
            waitTime = 5000;
        let isReady;

        beforeAll((done) => {
            browser.ignoreSynchronization = true;

            browser.get(poEl.url)
                .then(() => browser.driver.manage().window().maximize())
                .catch((err) => isReady = err)
                .finally(done);
        });

        it('should check page ui', (done) => {
            if(isReady) return done();

        browser.wait(EC.visibilityOf(element(by.xpath(poEl.txtTitle))), waitTime, 'wait for app loads')
            .then(() => {
                expect(element(by.xpath(poEl.txtTitle)).getText()).toBe(poConst.txtTitle, 'check page title');
                expect(element(by.xpath(poEl.txtHeader)).getText()).toBe(poConst.txtHeader, 'check page title');
                expect(element(by.xpath(poEl.inputJob)).isDisplayed()).toBe(true, 'check the job input is displayed');
                expect(element(by.xpath(poEl.inputLoc)).isDisplayed()).toBe(true, 'check the location input is displayed');
                expect(element(by.xpath(poEl.inputSkills)).isDisplayed()).toBe(true, 'check the skill input is displayed');
            })
            .catch((err) => {
                isReady = err;
                expect(isReady).toBeFalsy();
            })
            .finally(done);
        });

        it('should check job search for no result', (done) => {
            if(isReady) return done();

            element(by.xpath(poEl.inputJob)).clear().sendKeys(poConst.inputJob)
                .then(() => browser.wait(EC.visibilityOf($('[data-index]')), waitTime, 'wait for autocomplete job list displays'))
                .then(() => $$('[data-index]').get(0).click())
                .then(() => hlFindJob.SelectLocationByListIndex(2, 1))
                .then(() => hlFindJob.SelectSkillByListIndex(3))
                .then(() => element(by.xpath(poEl.btnFind)).click())
                .then(() => {
                    expect(element(by.xpath(poEl.addedSkill)).isDisplayed()).toBe(true, 'check the skill is added');
                    expect(element(by.xpath(poEl.addedSkill)).getText()).toBe(poConst.lblSkill, 'check page title');
                    expect(element(by.xpath(poEl.lblNoResult)).getText()).toBe(poConst.lblNoResult, 'check page title');
                })
                .catch((err) => {
                    isReady = err;
                    expect(isReady).toBeFalsy();
                })
                .finally(done);
            });

    });