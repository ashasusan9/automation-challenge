const { Section1 } = require('../objects/section-1')

describe('Section 1 ', () => {
  beforeEach(() => {
    cy.visit('/section-1', { timeout: 3000 });
    cy.url({ timeout: 3000 }).should('include', '/section-1');
  });
  
  it('Asserting table actions ',() => {
    Section1.actions.assertTableIsNotvisible();
    Section1.actions.clickTheShowTable();
    Section1.actions.assertTableIsVisible();
    Section1.actions.assertTableHas10Rows();
    Section1.actions.assertTableHas5Header();
    Section1.actions.assertTableUsers();  
    Section1.actions.assertAge();
  })

  it('Asserting Form actions ',() => {
    Section1.actions.assertFormIsNotVisible();
    Section1.actions.clickTheShowForm();
    Section1.actions.assertNameAgeFilled();
  })  
})

