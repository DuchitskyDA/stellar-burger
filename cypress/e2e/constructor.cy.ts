describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('ингредиент должен добавляться в коструктор', () => {
    cy.get('[data-cy=ingredients-mains]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauces]').contains('Добавить').click();
    cy.get('[data-cy=burger-constructor]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Ингредиент 4')
      .should('exist');
  });
});

describe('тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('открывается модальное окно при клике на ингредиент', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('закрывается при клике на крестик', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тесты оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'userOrder.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('fakeRefreshToken')
    );
    cy.setCookie('accessToken', 'fakeAccessToken');
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('сборка бургера для заказа и нажатие на кнопку заказа', () => {
    cy.get('[data-cy=ingredients-buns]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-mains]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauces]').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=order-number]').contains('1').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
