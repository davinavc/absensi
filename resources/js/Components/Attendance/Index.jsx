import { usePage } from '@inertiajs/react';
import SubmitAttendance from '@/Components/Attendance/Submit';
import Submitted from '@/Components/Attendance/Submitted';

export default function Attendance() {
    const { submitted } = usePage().props;

    if(submitted){
        return <Submitted />
    } else {
        return <SubmitAttendance />
    }
}