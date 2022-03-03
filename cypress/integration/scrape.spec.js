/// <reference types="cypress" />

// scrape.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


const URL = "https://www.hkex.com.hk/eng/sorc/options/stock_options_search.aspx"

// npx cypress open 

describe("Scrape hkex options data",()=>{



    it("main scrape",async ()=>{
        cy.visit(URL)
        
        cy.get(".btn_search", {timeout : 4000}).click()

        // cy.get("span.ui-slider-handle.ui-corner-all.ui-state-default")
            


        // left: 65.625%;

        // ui-slider-handle ui-corner-all ui-state-default

        // ui-slider-handle ui-corner-all ui-state-default


        // cy.get('input[test]')
        // .invoke('attr', 'test', 'my new value')
        // .should('have.attr', 'test', 'my new value')
    })




})