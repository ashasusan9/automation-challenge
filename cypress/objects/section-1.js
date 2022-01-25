const Section1 = {
  literals: {
    Name: 'Anna',
    Age: '34'
  },

  elements: {
    showTable: '[data-test=table-toggle-button]',
    userTable:'[data-test=user-table]' ,
    tableHeader:'[data-test=table-header]',
    formButton:'[data-test=form-toggle-button]',
    signupForm:'[data-test=signup-form]',
    fullNameInput: '[data-test=full-name-input]',
    ageInput: '[data-test=age-input]',
    submitButton: '[data-test=submit-btn]',
    nurseInput:'[data-test=nurse-input]'
  },

  actions: {
    clickTheShowTable(){
      cy.get(Section1.elements.showTable).click();
     },

    clickTheShowForm(){
      cy.get(Section1.elements. formButton).click();
     },

    assertTableIsNotvisible(){
       cy.get(Section1.elements.userTable).should('not.be.visible');
     },

    assertTableIsVisible(){
      cy.get(Section1.elements.userTable).should('be.visible');
    },

    assertFormIsVisible(){
      cy.get(Section1.elements.signupForm).should('be.visible');
    },

    assertTableHas10Rows(){
      cy.get(Section1.elements.userTable)
      .find('tbody tr').should('have.length', 11)      
    },

    assertTableHas5Header(){
      cy.get(Section1.elements.tableHeader)
      .find('th').should('have.length', 5)      
    },

    assertTableUsers(){
      cy.get(Section1.elements.userTable).then($el => {
        cy.wrap($el).find("tr").then($els => {
            expect($els.filter(index => $els.eq(index).is(':contains(user)'))).to.have.length(6);
     })
    })    
    },

    assertAge(){
      cy.get("tbody > tr> :nth-child(4)").each(($el, index) => {
        const dob = $el.text();
        if ((Date.parse(dob) <= Date.parse('1/25/1962'))) {
          cy.get("tbody > tr> :nth-child(4)").eq(index).then(function(Field) {
            const Fieldtext = Field.text();
            expect(Fieldtext).to.be.oneOf(['8/2/1956','5/25/1952','4/21/1955']);
          })
        }
      })
      },

    assertFormIsNotVisible(){
      cy.get(Section1.elements.signupForm).should('not.be.visible');
    },

    assertNameAgeFilled(){
      cy.get(Section1.elements.fullNameInput).type(Section1.literals.Name);
      cy.get(Section1.elements.fullNameInput).should('have.value', Section1.literals.Name)
      cy.get(Section1.elements.ageInput).type(Section1.literals.Age);
      cy.get(Section1.elements.ageInput).should('have.value', Section1.literals.Age)
    
      cy.get('select').select('female').should('have.value', 'female');
      cy.get(Section1.elements.nurseInput).check()
      .should('be.checked') ;
      cy.get(Section1.elements.submitButton).click();
      cy.on('window:alert',(txt)=>{
        //Mocha assertions
        expect(txt).to.contains('Form submitted!');
     })
    },
  },
}

module.exports = { Section1 }
