import {crewMember} from './crewMember'

/**
 * Represents a page for crew members board 
 */
export class Board {
	constructor() {
    this.BoardContainer = '.App-container';
		this.column = '.App-column > div';
    this.columnTitle = '.App-column h2';
  }

  /**
   * Verifies that specified number of members are present on board
   * @param {number} membersNumber - number of members on board
   */
  checkMembersPresentOnBoard(membersNumber) {
    cy.get(this.BoardContainer).find(crewMember.crewMemberContainer).should('have.length', membersNumber);
  }

  /**
   * Verifies that column contains specified number of crew members
   * @param {string} columnName - column name on board 
   * @param {number} membersNumber - number of members in column
   */
  checkNumberOfMembersInColumn(columnName, membersNumber) {
    cy.get(this.columnTitle).contains(columnName).parents(this.column).children(crewMember.crewMemberContainer).
      should('have.length', membersNumber);
  }

  /**
   * Verifies that crew member present in specified column
   * @param {string} memberFullName - crew member full name
   * @param {string} columnName - column name
   */
  checkMemberPresentInColumn(memberFullName, columnName) {
    cy.get(this.columnTitle).contains(columnName).parents(this.column).should('contain', memberFullName)
  }
}

export const board = new Board()