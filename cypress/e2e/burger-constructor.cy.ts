describe('BurgerConstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.visit('/');
    cy.viewport(1920, 1080);
  });

  describe('Add ingredients to constructor', () => {
    it('add buns to constructor', () => {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('add main ingredients to constructor', () => {
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('add sause ingredients to constructor', () => {
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });
});
