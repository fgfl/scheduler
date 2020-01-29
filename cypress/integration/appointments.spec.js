describe('Appointment', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:8001/api/debug/reset');
    cy.visit('/');
  });

  it('should book an interview', () => {
    // cy.contains('li', 'Monday');
    cy.get('[data-testid=appointment]').within(appt => {
      cy.contains('h4', '1pm')
        .parent()
        .siblings();
    });
    // cy.log(sib);
  });
});
