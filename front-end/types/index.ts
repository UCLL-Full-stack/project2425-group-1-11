export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
};
  
export type Doctor = {
    id: number;
    user: User;
    department: string;
    description: string;
    appointments: Appointment[];
};
  
export type Patient = {

};

export type Record = {

};

export type Appointment = {
    id: number;
    startDate: string;
    endDate: string;
    comment: string;
    doctor: Doctor;
    patient: Patient;
};