CREATE TABLE IF NOT EXISTS "Program" (
  "Program_ID" SERIAL,
  "Program_Name" varchar(100) UNIQUE NOT NULL,
  PRIMARY KEY ("Program_ID")
);

CREATE TABLE IF NOT EXISTS "Team" (
  "Team_ID" SERIAL,
  "Team_Name" varchar(100) UNIQUE NOT NULL,
  PRIMARY KEY ("Team_ID")
);

CREATE TABLE IF NOT EXISTS "Employee" (
  "Employee_ID" SERIAL,
  "Team_ID" int,
  "Name" varchar(100),
  "Username" varchar(100) UNIQUE NOT NULL,
  "Password" varchar(100) NOT NULL,
  "Role" varchar(100) NOT NULL,
  "Designation" varchar(100),
  PRIMARY KEY ("Employee_ID"),
  CONSTRAINT "FK_Employee.Team_ID"
    FOREIGN KEY ("Team_ID")
      REFERENCES "Team"("Team_ID")
);

CREATE TABLE IF NOT EXISTS "Functional_Area" (
  "Functional_Area_ID" SERIAL,
  "Area_Name" varchar(100) UNIQUE NOT NULL,
  PRIMARY KEY ("Functional_Area_ID")
);

CREATE TABLE IF NOT EXISTS "Bug" (
  "Problem_Report_Number" SERIAL,
  "Program_ID" int,
  "Report_Type" varchar(100),
  "Severity" varchar(100),
  "Problem_Summary" varchar(8000) NOT NULL,
  "Can_Reproduce" boolean,
  "Problem_Description" varchar(8000) NOT NULL,
  "Suggested_Fix" varchar(8000),
  "Reported_By" int NOT NULL,
  "Date_Reported" date,
  "Functional_Area_ID" int,
  "Assigned_To_Employee_ID" int,
  "Assigned_To_Team_ID" int,
  "Comments" varchar(8000),
  "Status" varchar(100),
  "Priority" varchar(100),
  "Resolution" varchar(100),
  "Resolution_Version" varchar(100),
  "Resolved_By" int,
  "Resolved_Date" date,
  "Resolution_Tested_By" int,
  "Resolution_Tested_Date" date,
  PRIMARY KEY ("Problem_Report_Number"),
  CONSTRAINT "FK_Bug.Program_ID"
    FOREIGN KEY ("Program_ID")
      REFERENCES "Program"("Program_ID"),
  CONSTRAINT "FK_Bug.Reported_By"
    FOREIGN KEY ("Reported_By")
      REFERENCES "Employee"("Employee_ID"),
  CONSTRAINT "FK_Bug.Resolved_By"
    FOREIGN KEY ("Resolved_By")
      REFERENCES "Employee"("Employee_ID"),
  CONSTRAINT "FK_Bug.Resolution_Tested_By"
    FOREIGN KEY ("Resolution_Tested_By")
      REFERENCES "Employee"("Employee_ID"),
  CONSTRAINT "FK_Bug.Functional_Area_ID"
    FOREIGN KEY ("Functional_Area_ID")
      REFERENCES "Functional_Area"("Functional_Area_ID"),
  CONSTRAINT "FK_Bug.Assigned_To_Employee_ID"
    FOREIGN KEY ("Assigned_To_Employee_ID")
      REFERENCES "Employee"("Employee_ID"),
  CONSTRAINT "FK_Bug.Assigned_To_Team_ID"
    FOREIGN KEY ("Assigned_To_Team_ID")
      REFERENCES "Team"("Team_ID")
);

CREATE TABLE IF NOT EXISTS "Attachment" (
  "Attachment_ID" SERIAL,
  "Problem_Report_Number" int,
  "File_Name" varchar(300) NOT NULL,
  "Attachment_Content" bytea NOT NULL,
  PRIMARY KEY ("Attachment_ID"),
  CONSTRAINT "FK_Attachment.Problem_Report_Number"
    FOREIGN KEY ("Problem_Report_Number")
      REFERENCES "Bug"("Problem_Report_Number")
);

-- Insert the initial admin user if it doesn't exist
INSERT INTO "Employee" ("Name", "Username", "Password", "Role", "Designation")
SELECT
    'Admin' AS "Name",
    'admin' AS "Username",
    '$2a$10$rtYv.QappwgoR3sxzMwJf.NwQdOip8MdkWIOqtj1EuZX9LTlHyGmS' AS "Password", --j;0dTY85wlT5zMI
    'ROLE_ADMIN' AS "Role",
    'Administrator' AS "Designation"
WHERE NOT EXISTS (
    SELECT 1 FROM "Employee" WHERE "Username" = 'admin'
);