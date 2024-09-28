import { render, screen, fireEvent } from '@testing-library/react';
import Index from './Index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';

// Mockeamos las dependencias externas como axios y Swal
jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  mixin: jest.fn(() => ({
    fire: jest.fn(),
  })),
}));

// Configuración básica del store de Redux para las pruebas
const store = createStore(rootReducer);

const renderWithProviders = (ui, options) =>
  render(
    <Provider store={store}>
      {ui}
    </Provider>,
    options
  );

describe('Index Component', () => {
  test('renders Dashboard de Campañas title', () => {
    renderWithProviders(<Index />);

    // Verificamos que el título se renderiza correctamente
    const titleElement = screen.getByText(/Dashboard de Campañas/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders Nueva Campaña button', () => {
    renderWithProviders(<Index />);

    // Verificamos que el botón de "Nueva Campaña" se renderiza correctamente
    const newCampaignButton = screen.getByText(/Nueva Campaña/i);
    expect(newCampaignButton).toBeInTheDocument();
  });

  test('renders search bar', () => {
    renderWithProviders(<Index />);

    // Verificamos que la barra de búsqueda se renderiza correctamente
    const searchInput = screen.getByLabelText(/Buscar campañas/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('opens campaign modal when Nueva Campaña button is clicked', () => {
    renderWithProviders(<Index />);

    const newCampaignButton = screen.getByText(/Nueva Campaña/i);

    // Simulamos el click en el botón de "Nueva Campaña"
    fireEvent.click(newCampaignButton);

    // Verificamos que el modal se abre correctamente (puedes usar el placeholder de tu modal)
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
