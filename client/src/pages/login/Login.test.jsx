import { render, screen, fireEvent } from "@testing-library/react"; // React Testing Library methods
import { MemoryRouter } from "react-router-dom"; // MemoryRouter for routing in tests
import { describe, it, expect, vi } from "vitest"; // Vitest methods for testing
import store from "../../redux/store";
import Login from "./Login";
import { Provider } from "react-redux";

// Mock dispatch function from useDispatch
vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useDispatch: () => vi.fn(),
}));

// Mock de react-redux
vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    // Deja Provider sin mockear
  };
});

describe("Login Component", () => {
  it("renders login form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check if the 'Iniciar sesión' title is rendered
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();



    // Check if email input is present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Check if password input is present
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Check if the user type dropdown is present
    expect(screen.getByLabelText(/Tipo de Usuario/i)).toBeInTheDocument();

    // Check if the remember me checkbox is present
    expect(screen.getByLabelText(/Recordarme/i)).toBeInTheDocument();

    // Check if the login button is present
    expect(screen.getByRole("button", { name: /Ingresar/i })).toBeInTheDocument();
  });

  it("handles input changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    // const userTypeSelect =screen.getByLabelText(/userType/i);



    // Simulate typing an email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    // Simulate typing a password
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");



   // Open the select options
  //  fireEvent.mouseDown(userTypeSelect);
    
  //  // Select student type
  //  const studentOption = screen.getByTestId('student-type');
  //  fireEvent.click(studentOption);
   
  //  // Check if the selected value is updated
  //  expect(userTypeSelect).toHaveTextContent('Estudiante');

    
  });

  it("toggles password visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/contraseña/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Password should initially be hidden
    expect(passwordInput.type).toBe("password");

    // Click the toggle button to show the password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    // Click the toggle button to hide the password again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });
});
