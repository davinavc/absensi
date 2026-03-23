import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';

export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Attendances
                </h2>
            }
        >
            <Head title="Attendances" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex mt-2 justify-between items-center'>
                                <h1 className='font-bold text-xl '>Users Data</h1>
                            </div>
                            <table className='min-w-full'>
                                <thead>
                                    <tr className="border-b-2">
                                        <th className='px-6 py-3 text-left text-lg font-medium text-black'>Tanggal</th>
                                        <th className='px-6 py-3 text-left text-lg font-medium text-black'>Name</th>
                                        <th className='px-6 py-3 text-left text-lg font-medium text-black'>Status</th>
                                        <th className='px-6 py-3 text-left text-lg font-medium text-black w-1/2'>Deskripsi</th>
                                        <th className='px-6 py-3 text-left text-lg font-medium text-black w-1/2'>Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map((attendance) => (
                                        <tr key={attendance.id} className='border-b odd:bg-white even:bg-slate-200'>
                                            <td className='px-6 py-4'>
                                                {attendance.created_at}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {attendance.user.name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {attendance.status}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {attendance.status !== 'attend' ? attendance.description : '-'} 
                                            </td>
                                            <td className='px-6 py-4'>
                                                {attendance.address} 
                                            </td>
                                            {/* <td className='px-6 py-4'>
                                                <Link 
                                                    className='`inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
                                                    href={route("users.edit", attendance.id)}> 
                                                    Edit
                                                </Link>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='flex mt-2 justify-between items-center'>
                                <label>Total : {attendances.total}</label>
                            </div>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
