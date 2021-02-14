describe('Home page', () => {
    it('shows a header that includes the input field', () => {
        cy.visit('/location?query=san')
        cy.get('header').should('be.visible').get('input').should('be.visible')
    })

    it('shows a list of locations that matches the search query', () => {
        cy.visit('/location?query=san')
        cy.get('article').should('have.length.gte', 1)
    })

    it('clicks on one of the location link', () => {
        cy.visit('/location?query=san')
        cy.get('article a').first().click()
        cy.url().should('contain', 'weather')
    })

    it('shows a message when there is no matching location', () => {
        cy.visit('/location?query=abc')
        cy.contains('No Results').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('shows a message when "query" param does not exist', () => {
        cy.visit('/location')
        cy.contains('No Results').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('shows a message when the GET request fails', () => {
        cy.intercept('GET', '/api/location/search', {
            forceNetworkError: true,
        })
        cy.visit('/location?query=san')
        cy.contains('No Results').should('be.visible')
        cy.get('article').should('not.exist')
    })

    it('searches and select the first suggestions', () => {
        cy.visit('/location')
        cy.get('input').type('san').should('have.value', 'san')
        cy.get('ul').should('exist')
        cy.get('li').first().click()
        cy.url().should('contain', 'weather')
    })

    it('searches and hits the search button', () => {
        cy.visit('/location')
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })

    it('searches and hits enter', () => {
        cy.visit('/location')
        cy.get('input').type('abc').should('have.value', 'abc')
        cy.get('button').click()
        cy.url().should('contain', 'location')
    })

    it.only('clicks on the header logo', () => {
        cy.visit('/location')
        cy.get('[alt="logo"]').click()
        cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    })
})
