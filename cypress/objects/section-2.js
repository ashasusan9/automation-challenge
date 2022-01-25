const Section2 = {
 
  elements: {
    networkCall: '[data-test=network-call-button]',
    newTabButton: '[data-test=new-tab-button]',
    fileDownloadButton :'[data-test=file-download-button]' 
  },

  actions: {
    
     clickNetworkRequestButton () {
      cy.intercept("GET", "/todos/1").as("getTodo");
      cy.get(Section2.elements.networkCall).click();
      cy.wait('@getTodo', { timeout: 45000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.id).to.eq(1);
        expect(interception.response.body.title).to.eq("Abnormally long network call!");

      }) 
    },
 
    AssertNewTab(){
     
      //Checking the properties of the href 
      cy
      .get(Section2.elements.newTabButton).parent()
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

      //Can remove target="_blank" attribute so that the new page is opened in the same tab cypress has access to 
      //Used this document for finding this solution https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js

      cy.get(Section2.elements.newTabButton).parent().invoke('removeAttr', 'target')
      cy.get(Section2.elements.newTabButton).click();
      cy.url().should('equals', 'http://localhost:8080/')
     },
 

     AssertDownload(){
      cy.get(Section2.elements.fileDownloadButton).click();
      cy.verifyDownload('javascript-logo.png',{ timeout: 25000 })
    },
     
  }, 
}

module.exports = { Section2 }

