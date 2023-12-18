import { AppointmentContext } from "../contexts/AppointmentContext";
import { useContext } from "react";

export const useAppointmentContext = () => {
    const context = useContext(AppointmentContext);
    if(!context) {
        throw Error("useAppointmentContext must be used inside an DatacontextProvider")
    }
    return context
}