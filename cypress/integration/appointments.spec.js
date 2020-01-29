describe('Appointment', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  xit('should book an interview', () => {
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

  it('should edit an interview', () => {
    const newInterviewer = 'Tori Malcolm';
    const newStudent = 'Julia Child';

    cy.get('[data-testid=appointment]')
      .first()
      .within(() => {
        cy.get('[alt="Edit"]').click({ force: true });
        cy.get('[data-testid=student-name-input]')
          .clear()
          .type(newStudent);
        cy.get(`[alt="${newInterviewer}"]`).click();
        cy.contains(/save/i).click();
        cy.contains(/Saving/i).should('not.exist');
        cy.contains(newStudent);
        cy.contains(newInterviewer);
      });
  });
});
