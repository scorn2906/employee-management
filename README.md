# Employee Management

Mini project for a technical assessment — employee management app built with Angular + PrimeNG + Tailwind. Four pages: login, employee list, add employee, and employee detail. Everything runs on dummy data (in-memory), no real backend hooked up yet.

## Stack

- Angular (standalone components + signals)
- PrimeNG for UI components (table, dropdown, datepicker, toast, etc.)
- Tailwind CSS for styling
- TypeScript
## What's done

**Login**
Username/password form with validation. The login flow actually works (redirects, handles wrong/correct credentials), just the credentials themselves are hardcoded in the code for now, not hitting a real API.

**Employee List**
- 100 dummy records, generated on app load.
- Paging + adjustable rows per page (10/25/50/100).
- Sorting on every column.
- Search by name/username AND status at the same time (both have to match).
- "Add Employee" button that goes to the add page.
- Action column has Edit (yellow notification) and Delete (red notification, with a confirmation dialog before it actually deletes).
- If you open a detail page and come back, whatever you searched/filtered before stays put — doesn't reset.
  **Add Employee**
- Every field is required, can't save if something's empty.
- Birth date uses a date picker, can't pick a date in the future.
- Email gets validated for proper format.
- Basic salary only accepts numbers.
- Group is a searchable dropdown with 10 dummy group names.
- Save persists the data, Cancel goes back to the list without saving anything.
  **Employee Detail**
- Shows all the employee's info, salary formatted as Rupiah (Rp xx.xxx,xx), birth date formatted too.
- OK button goes back to the list, and whatever you had searched before is still there.
## Running it

You'll need Node.js (18+, suggestion using node v26) and Angular CLI installed. If you don't have Angular CLI yet:

\`\`\`bash
npm install -g @angular/cli
\`\`\`

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Start the dev server:

\`\`\`bash
ng serve
\`\`\`

Open \`http://localhost:4200\`.

Login with:
- username: \`admin\`
- password: \`password123\`
## Build

\`\`\`bash
ng build
\`\`\`

Output goes to the \`dist/\` folder.

## Notes

All employee data is dummy, generated in memory when the app first loads — so it doesn't need any backend/API to run. Adding/deleting data only persists for the current browser session, refreshing the page resets it back to the initial data.

Dependency injection across these components uses \`inject()\` instead of constructor injection, since it's a better fit for standalone components.
