/**
 * Represnts a page for filters feature
 */
export class Filter {
	constructor() {
		this.fitersContainer = 'form#filters';
		this.nameField = '#name';
		this.cityField = '#city';
		this.submitBtn = 'button[type="submit"]';
		this.clearBtn = 'button[type="button"]';
  }

  /**
   * Fill name field action
   * @param {string} name - crew member name
   */
  fillName(name) {
    cy.get(this.fitersContainer).find(this.nameField).clear().type(name);
  }

  /**
   * Fill city field action
   * @param {string} cityName - city name
   */
  fillCity(cityName) {
    cy.get(this.fitersContainer).find(this.cityField).clear().type(cityName);
  }

  /**
   * Search for crew member by specified memeber name and city
   * @param {string} name - crew member name
   * @param {string} city - crew member city name
   */
  serchMember(name, city) {
    this.clearSearch();
    this.fillName(name)
    this.fillCity(city)
    cy.get(this.fitersContainer).find(this.submitBtn).click();
  }

  /**
   * Clear search criterias from filter fields
   */
  clearSearch() {
    cy.get(this.fitersContainer).find(this.clearBtn).click();
  }
}

export const filter = new Filter()