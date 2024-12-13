const path = require("path");

describe('Test with  backend', () => {

  beforeEach('Login to the application',() => {
   cy.intercept({method:'Get',path:'tags'}, {fixture: 'mockTagsAPI.json'});
   cy.loginToApplication();
  })
  

  it('verify correct request and response', () => {
    cy.intercept({method:'Post',path:'articles'}).as('postArticles');
    cy.contains(' New Article ').click();
    cy.get('[placeholder="Article Title"]').type('Title of the article');
    cy.get('[formcontrolname="description"]').type('Description of the article');
    cy.get('[formcontrolname="body"]').type('Content of the article');
    cy.contains(' Publish Article ').click();

    cy.wait('@postArticles');
    cy.get('@postArticles').then((xhr) => {
      console.log(xhr)
       expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.request.body.article.body).to.equal('Content of the article');
      
    });
  })

  it('Mock Api call and verify the response', () => {
    cy.get('.tag-list').should('contain', 'Cypress').and('contain', 'Automation');
  });


})