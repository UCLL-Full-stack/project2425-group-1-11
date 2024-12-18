import { useState, useEffect } from 'react';
import UserService from '@services/UserService'; // Import the UserService to fetch patient data
import PatientService from '@services/PatientService';
import { Patient } from '@types';

const useCurrentPatient = () => {
    const [patientUser, setPatientId] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatientId = async (userId: number) => {
            try {
                const response = await PatientService.getPatientByUserId(userId);
                if (response.ok) {
                    const patient = await response.json();
                    setPatientId(patient);
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
                    fetchPatientId(user.id);
                }
            } catch (error) {
                console.error('Failed to parse user from sessionStorage:', error);
            }
        }
    }, []);

    return patientUser;
};

export default useCurrentPatient;