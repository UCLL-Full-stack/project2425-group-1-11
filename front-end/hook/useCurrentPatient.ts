import { useState, useEffect } from 'react';
import PatientService from '@services/PatientService';
import { Patient } from '@types';

const useCurrentPatient = () => {
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async (userId: number) => {
            try {
                const response = await PatientService.getPatientByUserId(userId);
                if (response.ok) {
                    const patientData = await response.json();
                    setPatient(patientData);
                } else {
                    console.error('Failed to fetch patient data');
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.id) {
                    fetchPatient(user.id);
                }
            } catch (error) {
                console.error('Failed to parse user from sessionStorage:', error);
            }
        }
    }, []);

    return patient;
};

export default useCurrentPatient;