JSON SERVER ASSIGNMENT Q1-Q6 - ONE HTML + ONE JAVASCRIPT FILE

FILES
- index.html       : common page with dropdown to select Q1-Q6
- assignment.js    : all six question implementations
- Q1_live_search/db.json
- Q2_employee_dashboard/db.json
- Q3_task_manager/db.json
- Q4_multi_api_dashboard/db.json
- Q5_college_timetable/db.json
- Q6_user_registration/db.json

IMPORTANT
The code is combined into one index.html and one assignment.js file.
The six db.json files remain separate, as required by the assignment.
Each JSON Server must run on its own port.

SETUP
1. Extract this ZIP file.
2. Open the extracted folder in VS Code.
3. Open Terminal in VS Code.
4. Install JSON Server once:
   npm install -g json-server

START THE SIX SERVERS
Open six separate terminals in VS Code. In each terminal, run the command below from the main extracted folder:

Terminal 1:
   json-server --watch Q1_live_search/db.json --port 3001

Terminal 2:
   json-server --watch Q2_employee_dashboard/db.json --port 3002

Terminal 3:
   json-server --watch Q3_task_manager/db.json --port 3003

Terminal 4:
   json-server --watch Q4_multi_api_dashboard/db.json --port 3004

Terminal 5:
   json-server --watch Q5_college_timetable/db.json --port 3005

Terminal 6:
   json-server --watch Q6_user_registration/db.json --port 3006

RUN THE PROJECT
1. Keep all six server terminals running.
2. Open index.html using VS Code Live Server.
3. Select Q1, Q2, Q3, Q4, Q5, or Q6 from the dropdown.
4. Test the features.

NOTES
- Q1 uses jQuery AJAX GET.
- Q2 uses XMLHttpRequest GET and PATCH, with optimistic update and rollback.
- Q3 uses jQuery AJAX GET and PATCH.
- Q4 uses Fetch and Promise.all.
- Q5 uses Fetch with a selected day.
- Q6 uses Axios GET for duplicate email checking and POST for registration.
- Internet is required to load the jQuery and Axios CDN libraries.
