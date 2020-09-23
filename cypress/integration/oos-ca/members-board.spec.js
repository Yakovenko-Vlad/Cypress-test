import { crewMember } from '../../pages/crewMember';
import { board } from '../../pages/board';

context('Crew members board', () => {
	let users, columns;
	before(() => {
		cy.fixture('crewMembers.json').then((data) => users = data);
		cy.fixture('columnNames.json').then((data) => columns = data);
	})

	beforeEach(() => {
		cy.visit('');
	});

	it('TC-004. Move crew members across board colums', () => {
		// 1. Move 'julia cunningham' member from 'Hired' to the 'Interviewing' board column
		crewMember.moveMemberToTheLeftCollumn(users.julia_cunningham.fullName);

		// 1.a Specified member present in 'Interviewing' column. There are no any members in 'Hired' column
		board.checkMemberPresentInColumn(users.julia_cunningham.fullName, columns.interviewing);
		board.checkNumberOfMembersInColumn(columns.interviewing, 1);
		board.checkNumberOfMembersInColumn(columns.hired, 0);

		// 2. Move 'julia cunningham' member from 'Interviewing' to the 'Applied' board column
		crewMember.moveMemberToTheLeftCollumn(users.julia_cunningham.fullName);

		// 2.a Specified member present in 'Applied' column. There are no any members in 'Interviewing' column.
		//     All members present in 'Applied' column
		board.checkMemberPresentInColumn(users.julia_cunningham.fullName, columns.applied);
		board.checkNumberOfMembersInColumn(columns.interviewing, 0);
		board.checkNumberOfMembersInColumn(columns.applied, 5);

		// 3. Move 'lloyd gonzalez' member from 'Applied' to the 'Interviewing' board column
		crewMember.moveMemberToTheRightCollumn(users.lloyd_gonzalez.fullName);

		// 3.a Specified member present in 'Interviewing' column. There are 4 members in 'Applied' column
		board.checkMemberPresentInColumn(users.lloyd_gonzalez.fullName, columns.interviewing);
		board.checkNumberOfMembersInColumn(columns.interviewing, 1);
		board.checkNumberOfMembersInColumn(columns.applied, 4);

		// 4. Move 'danielle moore' member from 'Applied' to the 'Interviewing' board column
		crewMember.moveMemberToTheRightCollumn(users.danielle_moore.fullName);

		// 4.a Specified member present in 'Interviewing' column. There are 3 members in 'Applied' column.
		//     There are 2 members in 'Interviewing' column
		board.checkMemberPresentInColumn(users.danielle_moore.fullName, columns.interviewing);
		board.checkNumberOfMembersInColumn(columns.interviewing, 2);
		board.checkNumberOfMembersInColumn(columns.applied, 3);

		// 5. Move 'danielle moore' member from 'Interviewing' to the 'Hired' board column
		crewMember.moveMemberToTheRightCollumn(users.danielle_moore.fullName);

		// 5.a Specified member present in 'Hired' column. There are 1 member in 'Hired' column. There are 1 member in 'Interviewing' column
		board.checkMemberPresentInColumn(users.danielle_moore.fullName, columns.hired);
		board.checkNumberOfMembersInColumn(columns.interviewing, 1);
		board.checkNumberOfMembersInColumn(columns.hired, 1);
	});
});
