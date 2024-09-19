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

  it('add ingredients to constructor', () => {
    cy.contains('Добавить').click();
  });
});
