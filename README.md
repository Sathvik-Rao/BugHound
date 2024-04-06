
# BugHound
### Bughound Bug Tracking Software

**Overview:**
Bughound is a web-based bug recording and tracking software designed for authorized users. It facilitates efficient management of bugs across multiple products, ensuring streamlined communication and resolution within development teams.

**Key Features:**
- **User-friendly Interface:** Create, edit, and update bug reports effortlessly using a web browser.
- **Relational Database Storage:** Store error report content in relational tables, accessible via SQL for easy retrieval and analysis.
- **Comprehensive Search:** Search for bugs based on various fields such as program, severity, status, and more.
- **Dynamic Fields:** Release and version data dynamically correspond to program changes, ensuring accurate bug tracking.
- **Attachments:** Attach images, memory dumps, and text files to bug reports for detailed documentation.
- **Secure Access:** Authorized users required for login, ensuring the security of sensitive bug data.

**Contents of the Problem Report:**
- **Problem Summary:** Concise description of the issue encountered.
- **Report Type:** Categorization of the problem (e.g., coding error, design issue, suggestion).
- **Severity:** Rating indicating the seriousness of the problem, ranging from minor to fatal.
- **Attachments:** Additional files or documents relevant to the bug report.
- **Reproducibility:** Indication of whether the problem can be reproduced, aiding developers in diagnosing and fixing the issue.
- **Problem Details:** Detailed explanation of the problem, including steps to reproduce and error messages.
- **Suggested Fix:** Optional suggestion for resolving the issue.
- **Reported By:** Contact information of the reporter for further clarification, if needed.
- **Date Discovered:** Date when the problem was initially discovered, assisting in identifying the version affected.

**Additional Fields (Optional):**
- **Functional Area:** Categorization of the affected functional area.
- **Assigned To:** Group or individual responsible for fixing the problem.
- **Comments:** Space for additional notes or discussions regarding the problem.
- **Status:** Current status of the bug report (e.g., open, closed, resolved).
- **Priority:** Assigned priority level indicating the urgency of fixing the problem.
- **Resolution:** Current resolution status of the problem (e.g., fixed, pending, cannot be reproduced).


# Setup Dev Environment
## Database (PostgreSQL)
```sql
1. Create user:
    CREATE ROLE bughounduser WITH LOGIN PASSWORD 'bughound123';
    CREATE DATABASE bughound OWNER bughounduser;
    GRANT ALL PRIVILEGES ON DATABASE bughound TO bughounduser;

2. Delete user:
    REVOKE ALL PRIVILEGES ON DATABASE bughound FROM bughounduser;
    SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'bughound';
    DROP DATABASE bughound;
    DROP ROLE bughounduser;
```

## Backend (Spring Boot)
```java
1. Cross-Origin Resource Sharing (CORS) Configuration:
    - In 'BugHoundController.java'(`src/main/java/com/og/bughound/controller/BugHoundController.java`), CORS is configured to allow requests from a specific frontend IP and port.
    - The base URL for the frontend is set to http://localhost:5173/

    @CrossOrigin(origins = "http://192.168.5.186:5173/", allowCredentials = "true")

    // front end url
    private String baseUrl = "http://localhost:5173/";

2. Model Configuration:
    - Date format for the `BugForm` class is specified as "yyyy-MM-dd".
    - (`src/main/java/com/og/bughound/model/BugForm.java`)

    private final String dateFormat = "yyyy-MM-dd";

3. Default admin user:
    - Initially an admin user is created to login and they can change the password in frontend(admin edits page) and insert users.
    - Passwords should be hashed using Bcrypt and then inserted into DB ([Bcrypt Tool](https://www.browserling.com/tools/bcrypt))
    - (`bughound_backend/bughound/src/main/resources/schema.sql`)

    default username: admin
    default password: j;0dTY85wlT5zMI

4. Application Properties:
    - Configuration for connecting to the PostgreSQL database is provided in `application.properties` 
    - (`bughound_backend/bughound/src/main/resources/application.properties`)
    
    spring.datasource.url=jdbc:postgresql://localhost:5432/bughound
    spring.datasource.username=bughounduser
    spring.datasource.password=bughound123
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    spring.sql.init.mode=always
    spring.jpa.hibernate.naming.physical-strategy=com.og.bughound.config.CustomPhysicalNamingStrategy

5. (`bughound_backend/bughound/pom.xml`):
    - java version 17
    - spring boot version 3.2.4

6. Set JAVA_HOME

7. Build the Project:
    - After Maven clean and build, the backend can be run using `java -jar target/bughound-0.0.1-SNAPSHOT.jar`.
```

## Frontend (React)
```javascript
1. This command will install all the dependencies listed in your package.json file.
    npm install

2. Configure Backend URL: In (`src/App.tsx`) file, set the backend URL as follows:
    //backend url
    const baseUrl = "http://" + window.location.hostname + ":8080";
    set backend url

3. Run the project: 
    npm run dev

4. Build the Project:
    npm run build
```

## Docker
```yaml
Starting Containers: docker-compose up
Stopping Containers: docker-compose down

Environment Variables: 
    - In your `docker-compose.yml`, ensure that environment variables are properly set to override the properties in your Spring/Database configurations. These environment variables will be used for database username, password, etc.

Initializing Database: 
    - If you need to insert test datasets into your database during initialization, uncomment the line in your `docker-compose.yml`: (- ./SampleQuery.sql:/docker-entrypoint-initdb.d/SampleQuery.sql)

Cleanup: 
    - After you're done with your Docker containers, it's good practice to delete any unused volumes, images, and containers. You can use Docker commands like `docker volume prune`, `docker image prune`, and `docker container prune` for this purpose.
```
```
