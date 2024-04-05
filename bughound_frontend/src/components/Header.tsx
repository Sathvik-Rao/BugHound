import { useState, useRef, useEffect } from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; // Importing profile icon from react-icons library
import { useNavigate } from "react-router-dom";

interface Props {
  profileName: string;
  role: string;
  logoutUrl: string;
}

const Header = ({ profileName, role, logoutUrl }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const USER_ICON_COLOR =
    role === "ROLE_ADMIN"
      ? "gold"
      : role === "ROLE_MANAGER"
      ? "LightBlue"
      : "white";

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="mr-auto">
          BugHound
        </Navbar.Brand>
        <Nav className="ml-auto">
          <div
            className="profile-icon-container"
            onClick={toggleDropdown}
            ref={dropdownRef}
            role="button"
            tabIndex={0}
          >
            <FaUser color={USER_ICON_COLOR} size={20} />
            {showDropdown && (
              <Dropdown.Menu show={showDropdown} align="end">
                <Dropdown.Item>Hi, {profileName}</Dropdown.Item>
                {role === "ROLE_ADMIN" && (
                  <Dropdown.Item onClick={() => navigate("/admin")}>
                    Admin Edits
                  </Dropdown.Item>
                )}
                <Dropdown.Item href={logoutUrl}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
