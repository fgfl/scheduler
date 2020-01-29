describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should visit root', () => {});

  it('should navigate to Tuesday', () => {
    cy.get('[data-testid=day]')
      .contains('li', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});
