import { Timestamp } from "firebase/firestore";

export interface OrdenI {
    id: string;
    numero: number;
    descripcion: string;
    fechaAtencion: Timestamp
    created: Timestamp
    edited: Timestamp;
}