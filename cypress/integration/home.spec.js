describe('Home page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('focuses on the input field and shows a search button', () => {
        cy.get('input').should('be.visible').should('be.focused')
        cy.get('button').should('be.visible')
    })

    it('does not break when the API request fails', () => {
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.intercept('GET', '/api/location', { forceNetworkError: true })
        cy.get('input').should('be.visible')
        cy.get('button').should('be.visible')
    })

    it('searches and selects the first suggestion', () => {
        cy.get('input').type('san').should('have.value', 'san')
        cy.get('ul').should('exist')
        cy.get('li').first().click()
        cy.url().should('contain', 'weather')
    })

    it('searches and clickes the Search button', () => {
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })

    it('searches and hits Enter', () => {
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })
})
