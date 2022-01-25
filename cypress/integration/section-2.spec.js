const { Section2 } = require('../objects/section-2')

describe('API tests ', () => {
  beforeEach(() => {
    cy.visit('/section-2', { timeout: 3000 });
    cy.url({ timeout: 3000 }).should('include', '/section-2');
  });

  it('New Tab',() => {
    Section2.actions.AssertNewTab();  
  }) 

  it('Waiting for network calls',() => { 
    Section2.actions.clickNetworkRequestButton();
  })

  it('Download File',() => {
    Section2.actions.AssertDownload();
    //Followed https://www.npmjs.com/package/cy-verify-downloads but I am having an error related to path.join.
  })
})

