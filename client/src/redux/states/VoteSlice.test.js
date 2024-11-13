
import { expect, test } from 'vitest';
import voteReducer from './VoteSlice';
import { VoteAuth } from './VoteSlice';
import { configureStore } from '@reduxjs/toolkit';

// Configura una tienda de prueba
const store = configureStore({
    reducer: {
      vote: voteReducer,
    },
  });
  
  // Datos de usuario sintéticos
  const user = {
    id: 21,
    firstName: 'Pedro',
    lastName: 'Moreno',
    email: 'pedroporras641@gmail.com',
    role: 'student',
    profilePicture: '/uploads/21_profile/uploaded_file.jpg',
    isVerified: 1
  };


  const selectedCandidate= {
    candidate_id: 2,
    person_id: 2,
    campaign_id: 12,
    political_party: 'Partido B',
    campaign_slogan: 'Cambio Ahora',
    biography: 'Líder comprometido con el cambio social.',
    social_media_links: '',
    is_approved: 'true',
    national_id_number: 'ID0987654321',
    first_name: 'María',
    last_name: 'González',
    date_of_birth: '1985-07-22T05:00:00.000Z',
    gender: 'Female',
    phone_number: '987-654-3210',
    address: '456 Elm St',
    city: 'Guadalajara',
    state: 'Jalisco',
    country: 'México',
    profile_picture_url: '',
    occupation: 'Abogada',
    education_level: 'Universitario',
    marital_status: 'Soltera',
    program: 'Mexicana'
  };
  
  
  // Ejemplo de prueba para la acción addUser
  test('should dispatch VoteAut and change success state', async () => {
    // Despacha la acción addUser con los datos sintéticos
    await store.dispatch(VoteAuth({user, selectedCandidate}  ));
  
    // Verifica si el estado de éxito ha cambiado a true
    const state = store.getState().vote;
    expect(state.success).toBe(true);
  });