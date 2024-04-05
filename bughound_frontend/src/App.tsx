import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Employee from "./model/Employee";
import BugForm from "./components/BugForm";
import AdminPage from "./components/AdminPage";

const App = () => {
  //backend url
  const baseUrl = "http://" + window.location.hostname + ":8080";

  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    document.title = "BugHound";

    const getEmployeeData = async () => {
      try {
        //Fetch CSRF token
        const csrfResponse = await fetch(baseUrl + "/getCsrfToken", {
          credentials: "include",
        });
        if (!csrfResponse.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        const csrfToken = await csrfResponse.json();
        if (csrfToken === null || csrfToken.length === 0) {
          throw new Error("Failed to fetch CSRF token");
        }
        setCsrfToken(csrfToken[0]);

        //Fetch employee data
        const response = await fetch(baseUrl + "/getEmployeeData", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        if (data === null) {
          throw new Error("Failed to fetch employee data");
        }
        setEmployeeData(data);
      } catch (error) {
        // alert("login at -> " + baseUrl + "/login\nerror -> " + error);
        window.location.href = baseUrl + "/login";
      }
    };

    getEmployeeData();

    return () => {
      setEmployeeData(null);
      setCsrfToken("");
    };
  }, []);

  return (
    <>
      {employeeData && (
        <Router>
          <Header
            profileName={employeeData.name}
            role={employeeData.role}
            logoutUrl={baseUrl + "/logout"}
          />
          <Routes>
            <Route
              path="/"
              element={<Home baseUrl={baseUrl} csrfToken={csrfToken} />}
            />
            <Route
              path="/bug"
              element={
                <BugForm
                  baseUrl={baseUrl}
                  csrfToken={csrfToken}
                  user={employeeData}
                />
              }
            />
            <Route
              path="/admin"
              element={
                employeeData.role === "ROLE_ADMIN" ? (
                  <AdminPage baseUrl={baseUrl} csrfToken={csrfToken} />
                ) : (
                  <NoPage />
                )
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
