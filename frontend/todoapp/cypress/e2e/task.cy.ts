describe('add new task to the list', () => {
  it('focus on input using parent block', () => {
    cy.visit('/');
    cy.get('app-buttombar').click();
    cy.get('app-buttombar').find('input').should("be.focused");
  });

  it('can add new task to the list', () => {
    cy.visit('/');
    cy.get('app-buttombar').click().type("hello{enter}");
    cy.get('p:last').contains("hello");
  });
});

describe('change status of the list', () => {
  it('change status to todo by clicking message', () => {
    cy.visit('/');
    cy.get('p:last').click().invoke('attr',"data-task").should('eq','doing');
    cy.get('p:last').click().invoke('attr',"data-task").should('eq','done');
  });

  it('change status using button', () => {
    cy.visit('/');

    cy.get('p:last').next().find('button[s=todo]').click().invoke('attr',"data-active").should('eq','true');
    cy.get('p:last').invoke('attr',"data-task").should('eq','todo');

    cy.get('p:last').next().find('button[s=doing]').click().invoke('attr',"data-active").should('eq','true');
    cy.get('p:last').invoke('attr',"data-task").should('eq','doing');

    cy.get('p:last').next().find('button[s=done]').click().invoke('attr',"data-active").should('eq','true');
    cy.get('p:last').invoke('attr',"data-task").should('eq','done');
  });
});

describe('delete task from list', () => {
  it('delete hello', () => {
    cy.visit('/');
    const id = cy.get('p:last').invoke('attr','id');
    cy.get('p:last').next().find('button:last').click();
    cy.get('p:last').invoke('attr','id').should('not.eq', id);
  });
});