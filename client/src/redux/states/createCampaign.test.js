import { expect, test } from 'vitest';
import CreateCampaignReducer from './CreateCampaign';
import { CreateCampaign } from './CreateCampaign';
import { configureStore } from '@reduxjs/toolkit';

// Configura una tienda de prueba
const store = configureStore({
  reducer: {
    campaignCreate: CreateCampaignReducer,
  },
});

// Datos de usuario sintéticos
const mockUserData = {
  campaignId: '',
  name: 'Elecciones Presidenciales 2025',
  description: 'cwecwe',
  startDate: '2024-10-26T06:53',
  endDate: '2024-11-09T06:53',
  imageUrl: 'blob:http://localhost:5173/a472ebec-eaeb-4c61-b0d7-1949e7ac9855',
  uploadImage: 'fake-image.png', // Simula el archivo de imagen como una cadena
  status: 'Planificada'
};

// Ejemplo de prueba para la acción CreateCampaign
test('should dispatch CreateCampaign and change success state', async () => {
  // Despacha la acción CreateCampaign con los datos sintéticos
  await store.dispatch(CreateCampaign(mockUserData));

  // Verifica si el estado de éxito ha cambiado a true
  const state = store.getState().campaignCreate;
  expect(state.success).toBe(true);
});
