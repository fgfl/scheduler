describe('Appointment', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    const student = 'Lydia Miller-Jones';
    const interviewer = 'Sylvia Palmer';

    cy.get('[data-testid=appointment]')
      .first()
      .next()
      .within($appt => {
        cy.get('[alt="Add"]').click();
        cy.get('[data-testid=student-name-input]').type(student);
        cy.get(`[alt="${interviewer}"]`).click();
        cy.contains(/save/i).click();
        cy.contains(/Saving/i).should('not.exist');
        cy.contains(student);
        cy.contains(interviewer);
      });
  });

  xit('test', () => {
    const student = 'Lydia Miller-Jones';
    const interviewer = 'Sylvia Palmer';

    const appt = cy
      .get('[data-testid=appointment]')
      .first()
      .next();

    appt.click();
  });
});
