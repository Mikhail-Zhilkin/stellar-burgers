describe('Тесты для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Должен отображать список ингредиентов', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  describe('Тест работы модального окона ингредиента', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.contains('li', 'Краторная булка N-200i').find('a').click();
      cy.get(`[data-cy=modal]`).contains('h3', 'Детали ингредиента');
      cy.contains('h3', 'Краторная булка N-200i');
    });

    it('Закрытие по клику на крестик', () => {
      cy.contains('li', 'Краторная булка N-200i').find('a').click();
      cy.get(`[data-cy=modal]`)
        .contains('h3', 'Детали ингредиента')
        .get(`[data-cy=closeButton]`)
        .click();
    });

    it('Закрытие по клику на оверлей', () => {
      cy.contains('li', 'Краторная булка N-200i').find('a').click();
      cy.get(`[data-cy=modal]`)
        .contains('h3', 'Детали ингредиента')
        .get(`[data-cy=closeOverlay]`)
        .click({ force: true });
    });
  });

  describe('Добавление ингредиентов из списка в конструктор', () => {
    it('Добавление булоки и начинки', () => {
      cy.contains('li', 'Краторная булка N-200i').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      window.localStorage.setItem('refreshToken', 'refreshToken');
      cy.setCookie('accessToken', 'accessToken');
    });

    it('Создать заказ', () => {
      cy.contains('li', 'Краторная булка N-200i').find('button').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('button', 'Оформить заказ').click();
      cy.contains('h2', '79748').should('exist');
      cy.get(`[data-cy=modal]`)
        .contains('h2', '79748')
        .get(`[data-cy=closeButton]`)
        .click();
      cy.contains('h2', '79748').should('not.exist');
      cy.get('[data-cy=bunTop]').should('not.exist');
      cy.get('[data-cy=ingredients]').should('not.exist');
      cy.get('[data-cy=bunBottom]').should('not.exist');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });
});
