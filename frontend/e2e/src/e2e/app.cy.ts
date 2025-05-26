import {getGreeting} from "../support/app.po";

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display landing page with welcome message", () => {
    // Check if we're on the landing page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    // Check for welcome message
    cy.contains("Welcome to the Rick and Morty Multiverse Explorer!").should(
      "exist"
    );
  });

  it("should navigate to inside page", () => {
    // Click the button to navigate to inside page
    cy.contains("button", "Go to Inside Page").click();
    cy.url().should("include", "/inside");
  });

  it("should handle invalid routes", () => {
    // Try to access a non-existent route
    cy.visit("/non-existent-route");
    // Should redirect to landing page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  describe("inside page", () => {
    beforeEach(() => {
      cy.visit("/inside");
    });

    it("should navigate to login page when trying to access favorite tab", () => {
      // Click the favorite tab which should redirect to login if not authenticated
      cy.contains("a", "Favorite").click();
      cy.url().should("include", "/auth");
    });

    it("should navigate to sign-up page when clicking Register", () => {
      // Visit auth page
      cy.visit("/auth");
      // Click on Register link
      cy.contains("Register").click();
      // Verify navigation to sign-up page
      cy.url().should("include", "/auth/sign-up");
    });

    it("should validate sign-up form fields", () => {
      // Visit sign-up page
      cy.visit("/auth/sign-up");

      // Verify form title
      cy.contains("Create Your Account").should("exist");

      // Verify button is initially disabled
      cy.contains("button", "Sign Up").should("be.disabled");

      // Fill in the form
      cy.get('input[placeholder="Enter your username"]').type("testuser");
      cy.get('input[placeholder="Enter your first name"]').type("John");
      cy.get('input[placeholder="Enter your last name"]').type("Doe");
      cy.get('input[placeholder="Enter your password"]').type("password123");

      // Verify button is now enabled
      cy.contains("button", "Sign Up").should("not.be.disabled");

      // Submit the form
      cy.contains("button", "Sign Up").click();

      // After successful sign-up, should redirect to home or login page
      cy.url().should("not.include", "/auth/sign-up");
    });

    it("should handle login attempts", () => {
      // Visit login page
      cy.visit("/auth");

      // Test invalid login
      cy.get('input[type="text"]').type("invaliduser");
      cy.get('input[type="password"]').type("invalidpass");
      cy.contains("button", "Login").click();
      cy.contains("Invalid username or password. Please try again.").should(
        "exist"
      );

      // Test successful login
      cy.get('input[type="text"]').clear();
      cy.get('input[type="text"]').type("testuser");
      cy.get('input[type="password"]').clear();
      cy.get('input[type="password"]').type("password123");
      cy.contains("button", "Login").click();
      // After successful login, should redirect to home or dashboard
      cy.url().should("not.include", "/auth");
    });

    it("should handle dark mode toggle and logout in settings", () => {
      // Navigate to settings page
      cy.visit("/inside/settings");

      // Check initial theme (assuming light mode is default)
      cy.get("html").should("not.have.class", "dark");

      // Toggle dark mode using the theme switcher component
      cy.get("lib-theme-switcher").click();

      // Verify dark mode is applied
      cy.get("html").should("have.class", "dark");

      // Toggle back to light mode
      cy.get("lib-theme-switcher").click();

      // Verify light mode is applied
      cy.get("html").should("not.have.class", "dark");
    });
  });
});
