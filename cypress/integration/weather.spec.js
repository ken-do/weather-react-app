describe('Home page', () => {
    it('shows a header that includes the input field', () => {
        cy.visit('/weather/2487956')
        cy.get('header').should('be.visible').get('input').should('be.visible')
    })

    it('shows a list of weather forecasts for the current location', () => {
        cy.visit('/weather/2487956')
        cy.get('article').should('have.length.gte', 1)
    })

    it('shows a message when there is no matching location', () => {
        cy.visit('/weather/123456')
        cy.contains('Data Not Available').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('shows a message when woeid param does not exist', () => {
        cy.visit('/weather')
        cy.contains('Data Not Available').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('shows a message when the GET request fails', () => {
        cy.intercept('GET', '/api/location', {
            forceNetworkError: true,
        })
        cy.visit('/weather/2487956')
        cy.contains('Data Not Available').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('searches and select the first suggestions', () => {
        cy.visit('/weather')
        cy.get('input').type('san').should('have.value', 'san')
        cy.get('ul').should('exist')
        cy.get('li').first().click()
        cy.url().should('contain', 'weather')
    })

    it('searches and hits the search button', () => {
        cy.visit('/weather')
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })

    it('searches and hits enter', () => {
        cy.visit('/weather')
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })

    it.only('clicks on the header logo', () => {
        cy.visit('/weather')
        cy.get('[alt="logo"]').click()
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    })
})
