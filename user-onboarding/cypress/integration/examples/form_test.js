describe('Testing Form', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    it('checks', () => {
        cy.get('input[name="text"]')
    })
})