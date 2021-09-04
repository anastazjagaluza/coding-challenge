import 'cypress-react-selector';

describe("Main integration test", () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.waitForReact(1000, '#root');
  });
  
  it('Renders initially 10 pokemon cards', () => {
    cy.get("div.container-cards").find(".card-container").should("have.length", 10);
  })
  
  it("Renders 20 pokemon cards if passed in URL", () => {
    cy.visit('http://localhost:3000?limit=20');
    cy.get("div.container-cards").find(".card-container").should("have.length", 20);
  })
  
  it("Is possible to change limit through the buttons", () => {
    cy.get("select#select-limits").select("20");
    cy.wait(3000);
    cy.get("div.container-cards").find(".card-container").should("have.length", 20);
  })
  
  it("Is possible to see new pokemon through buttons", () => {
    cy.get(".card-container").first().then(($el) => {
      cy.contains("Next").click();
      cy.wait(2000);
      cy.get(".card-container").first().then(($newEl) => {
        expect($el).to.not.equal($newEl);
      })
    })
  })
  
  it("Is possible to search for a name", () => {
    cy.get("input[type=text]").type("bulbasaur");
    cy.get("select#select-category").select("Name", {force: true});
    cy.get("button").contains("Search").click();
    cy.wait(2000);
    cy.get("div.container-cards").find(".card-container").should("have.length", 1);
    cy.get("div.container-cards").contains("Bulbasaur");
  })
  
  it("Is possible to search for an ability", () => {
    cy.get("input[type=text]").type("blaze");
    cy.get("select#select-category").select("Abilities", {force: true});
    cy.get("button").contains("Search").click();
    cy.wait(4000);
    cy.get("div.container-cards").contains("blaze");
  })
  
  it("is possible to sort by name", () => {
    cy.get(".card-container").first().then(($el) => {
      cy.get("select#select-sortby").select("Name", {force: true});
      cy.wait(2000);
      cy.get(".card-container").first().then(($newEl) => {
        expect($el).to.not.equal($newEl);
      })
    })
  })

});