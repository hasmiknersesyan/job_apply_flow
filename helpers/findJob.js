"use strict";

const poEl = require('../objects/elements.json'),
    poConst = require('../objects/const.json'),
    EC = protractor.ExpectedConditions,
    waitTime = 5000,
    Q = require('q');

let _selectSkillByListIndex = (index) => {
    let def = Q.defer();

//should be added check for 2 ul lists also possibility to add more then 1 skill
    element(by.xpath(poEl.inputSkills)).click()
        .then(() =>  browser.wait(EC.visibilityOf(element(by.xpath(poEl.lstSkill1))), waitTime, 'wait for skills list opens'))
        .then(() => element(by.xpath(poEl.lstSkill1)).$$('li').get(index).click())
        .then(() => def.resolve())
        .catch((err) => def.reject(`SKILL: error - ${err}`));

    return def.promise;
};

let _selectLocationByListIndex = (locationIndex, cityIndex) => {
    let def = Q.defer();
    let elLoc, elCity;

    //make function more usable
    element(by.xpath(poEl.inputLoc)).click()
        .then(() =>  browser.wait(EC.visibilityOf(element(by.xpath(poEl.ulLocation))), waitTime, 'wait for location list opens'))
        .then(() => {
             elLoc = element(by.xpath(poEl.ulLocation)).$$('li').get(locationIndex);
            return elLoc.click();
        })
        .then(() => elCity = elLoc.$('ul').$$('li'))
        .then(() => {
                if(elCity) {
                    return elCity.get(cityIndex).click();
                }
                else {
                    return Q();
                }
         })
        .then(() => def.resolve())
        .catch((err) => def.reject(`Location: error - ${err}`));

    return def.promise;
};

let _applyInputs = (testObj) => {
    let def = Q.defer();

    browser.wait(EC.visibilityOf(element(by.xpath(poEl.jobApply.boxApply))), waitTime, 'wait for apply block displays')
        .then(() => {
            if(testObj.txtFirstName) {
                return  element(by.xpath(poEl.jobApply.txtFirstName)).clear().sendKeys(testObj.txtFirstName);
            } else {
                return Q();
            }
        })
        .then(() => {
                if(testObj.txtLastName) {
                return  element(by.xpath(poEl.jobApply.txtLastName)).clear().sendKeys(testObj.txtLastName);
            } else {
                return Q();
            }
        })
        .then(() => {
                if(testObj.txtEmail) {
                return  element(by.xpath(poEl.jobApply.txtEmail)).clear().sendKeys(testObj.txtEmail);
            } else {
                return Q();
            }
        })
        .then(() => {
                if(testObj.txtSumLetter) {
                return  element(by.xpath(poEl.jobApply.txtSumLetter)).clear().sendKeys(testObj.txtSumLetter);
            } else {
                return Q();
            }
        })
        .then(() => def.resolve())
        .catch((err) => def.reject(`Location: error - ${err}`));

    return def.promise;
};

module.exports = {
    SelectSkillByListIndex: _selectSkillByListIndex,
    SelectLocationByListIndex: _selectLocationByListIndex,
    ApplyInputs: _applyInputs
};



