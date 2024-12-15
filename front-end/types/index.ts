export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
    email?: string;
    role?:string;
    fullName?:string;
};
export type Doctor = {
    id?: number;
    user: User;
    department: string;
    description: string;
    appointments?: Appointment[];
};
  
export type Patient = {
    id?: number;
    user: User;
    records?: Record[];
};

export type Record = {
    id?: number;
    title: string;
    description: string;
};

export type Appointment = {
    id?: number;
    startDate: string;
    endDate: string;
    comment: string;
    doctor?: Doctor;
    patient?: Patient;
};

export type Clinic = {
    id?: number;
    address: string;
    contactNumber: number;
    rating: number;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};