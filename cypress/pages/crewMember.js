/**
 * Represnts a page for Crew Member card on app board
 */
export class CrewMember {
	constructor() {
		this.crewMemberContainer = '.CrewMember-container';

		this.crewMemberInfo = '.CrewMember-info';
		this.crewMemberFullName = '.CrewMemeber-name div:first-child';
		this.crewMemberLocation = '.CrewMemeber-name div:last-child';

		this.moveMemberLeftBtn = '.CrewMember-toolbar button:not([class])';
		this.moveMemberRightBtn = '.CrewMember-toolbar button.CrewMember-up';
	}

	/**
   * Verifies that specified member is present in any board column. 
	 * @param {string} searchParameter - member name or city
   */
	checkMembersExistOnBoard(searchParameter) {
		cy.get(this.crewMemberContainer).find(this.crewMemberInfo).each($el => cy.wrap($el).should('contain', searchParameter))
	}
	
	/**
   * Move specified crew member to the left column on a board by button
	 * @param {string} memberFullName - crew member full name
   */
	moveMemberToTheLeftCollumn(memberFullName) {
		cy.get(this.crewMemberContainer).contains(memberFullName).parents(this.crewMemberContainer).then(el => 
			cy.wrap(el).find(this.moveMemberLeftBtn).click())
	}

	/**
   * Move specified crew member to the right column on a board by button
	 * @param {string} memberFullName - crew member full name
   */
	moveMemberToTheRightCollumn(memberFullName) {
		cy.get(this.crewMemberContainer).contains(memberFullName).parents(this.crewMemberContainer).then(el => 
			cy.wrap(el).find(this.moveMemberRightBtn).click())
	}
}

export const crewMember = new CrewMember()