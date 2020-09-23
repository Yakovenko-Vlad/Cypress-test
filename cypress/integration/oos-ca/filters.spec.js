import { filter } from '../../pages/filter';
import { crewMember } from '../../pages/crewMember';
import { board } from '../../pages/board';

context('Filters', () => {
	let users;
	before(() => {
		cy.fixture('crewMembers.json').then((data) => users = data);
	})

  beforeEach(() => {
    cy.visit('');
  })

  it('TC-001. Serching for existing crew member', () => {
    // 1. Search for user by name 'danielle' 
    filter.fillName(users.danielle_moore.firstName);
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 1.a There is one member card present on board with memeber-info - "name": "danielle" 
    crewMember.checkMembersExistOnBoard(users.danielle_moore.firstName);
    board.checkMembersPresentOnBoard(1);

    // 2 Search for user by city 'worcester' 
    cy.get(filter.fitersContainer).find(filter.nameField).clear()
    filter.fillCity(users.emma_stewart.city);
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 2.a There are all crew members on board are from 'worcester'
    crewMember.checkMembersExistOnBoard(users.emma_stewart.city);

    // 3. Fill name and city fields with any existing member data
    filter.serchMember(users.julia_cunningham.firstName, users.julia_cunningham.city);

    // 3.a Only one member with spevified data present on board
    crewMember.checkMembersExistOnBoard(users.julia_cunningham.firstName);
    crewMember.checkMembersExistOnBoard(users.julia_cunningham.city);
    board.checkMembersPresentOnBoard(1);

    // 4. Fill name field with any existing member full name
    filter.fillName(users.emma_stewart.fullName);
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 4.a There are no members present on app board
    board.checkMembersPresentOnBoard(0);

    // 5. Clear search criterias
    filter.clearSearch();

    // 5.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 6. Fill name field with any member last name
    cy.get(filter.fitersContainer).find(filter.cityField).clear()
    filter.fillName(users.emma_stewart.lastName);
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 6.a There is one member with specified last name present on board 
    crewMember.checkMembersExistOnBoard(users.emma_stewart.lastName);
    board.checkMembersPresentOnBoard(1);
  })


  it('TC-002. Serching for not existing crew member', () => {
    // 1. Fill name field with not existing member name
    filter.fillName('not-existing-name');
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 1.a There are no members on board
    board.checkMembersPresentOnBoard(0);

    // 2. Clear search criterias
    filter.clearSearch();

    // 2.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 3. Fill name field with not existing member name. FIll city field with existing crew member city  
    filter.serchMember('not-existing-name', users.julia_cunningham.city);

    // 3.a There are no members on board
    board.checkMembersPresentOnBoard(0);

    // 4. Clear search criterias
    filter.clearSearch();

    // 4.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 5. Fill name field with existing crew member name. FIll city field with not existing crew member city
    filter.serchMember(users.danielle_moore.firstName, 'not-existing-location');

    // 5.a There are no members on board
    board.checkMembersPresentOnBoard(0);

    // 6. Clear search criterias
    filter.clearSearch();

    // 6.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 7. Fill name field with existing crew member name. FIll city field with not existing crew member city
    filter.serchMember('not-existing-name', 'not-existing-location');

    // 7.a There are no members on board
    board.checkMembersPresentOnBoard(0);

    // 8. Clear search criterias
    filter.clearSearch();

    // 8.a All members are present on board
    board.checkMembersPresentOnBoard(5);
  })


  it('TC-003. Serching for crew members by incomplete name\city', () => {
    // 1. FIll name field with common part of the name of the several crew members
    filter.fillName('ll');
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 1.a All visible members have name which includes specified substring
    crewMember.checkMembersExistOnBoard('ll');
    board.checkMembersPresentOnBoard(2);

    // 2. Clear search criterias
    filter.clearSearch();

    // 2.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 3. FIll city field with common part of the last name of the several crew members
    cy.get(filter.fitersContainer).find(filter.nameField).clear()
    filter.fillCity('he');
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 3.a All visible members have city which includes specified substring
    crewMember.checkMembersExistOnBoard('he');
    board.checkMembersPresentOnBoard(2);

    // 4. Clear search criterias
    filter.clearSearch();

    // 4.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 5. FIll name field with common part of the city of the several crew members
    cy.get(filter.fitersContainer).find(filter.cityField).clear()
    filter.fillName('wart');
    cy.get(filter.fitersContainer).find(filter.submitBtn).click();

    // 5.a All visible members have city which includes specified substring
    crewMember.checkMembersExistOnBoard('stewart');
    board.checkMembersPresentOnBoard(1);

    // 6. Clear search criterias
    filter.clearSearch();

    // 6.a All members are present on board
    board.checkMembersPresentOnBoard(5);

    // 7. FIll filter fieldswith common parts of the city and name of the any crew member
    filter.serchMember('ll', 'he');

    // 7.a There is one member with specified data present on board 
    board.checkMembersPresentOnBoard(1);

    // 8. FIll filter fieldswith common parts of the city and name of the different crew members
    filter.serchMember('li', 'cester');

    // 8.a There are no members on board
    board.checkMembersPresentOnBoard(0);

    // 9. Clear search criterias
    filter.clearSearch();

    // 9.a All members are present on board
    board.checkMembersPresentOnBoard(5);
  })
})