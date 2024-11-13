import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import store from '../../redux/store';
import Register from './Register';

describe('Register Component', () => {
  test('renders Register component correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    // Verifica que los elementos se rendericen
    expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cedula/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument(); // Cambié aquí
  });

  test('updates input values and validates them', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const firstNameInput = screen.getByLabelText(/nombres/i);
    const lastNameInput = screen.getByLabelText(/apellidos/i);
    const dniInput = screen.getByLabelText(/cedula/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    
    // Simula la entrada en los campos
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(dniInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    // Verifica que los valores se actualicen
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(dniInput.value).toBe('12345678');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123!');
  });

  test('displays validation errors for invalid inputs', () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
  
    const firstNameInput = screen.getByLabelText(/nombres/i);
    const lastNameInput = screen.getByLabelText(/apellidos/i);
    const dniInput = screen.getByLabelText(/cedula/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /registrar/i });
  
    // Simula la entrada de datos inválidos
    fireEvent.change(firstNameInput, { target: { value: 'da2' } }); // Campo vacío
    fireEvent.change(lastNameInput, { target: { value: 'das2' } }); // Campo vacío
    fireEvent.change(dniInput, { target: { value: '123' } }); // DNI inválido
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } }); // Email inválido
    fireEvent.change(passwordInput, { target: { value: 'short' } }); // Contraseña corta


    // Simula el envío del formulario
    fireEvent.click(submitButton);
  
    // Verifica que se muestren errores de validación
    expect(screen.getByText(/Debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/el email no es válido/i)).toBeInTheDocument();
    expect(screen.getByText(/El nombre solo debe contener letras/i)).toBeInTheDocument();
    expect(screen.getByText(/El apellido solo debe contener letras/i)).toBeInTheDocument();
    
  });


  
});
