import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import Selectbox from '@/Components/Selectbox';
import { useState, useEffect } from "react";

export default function SubmitAttendance({ auth }) {
    const [transitioning, setTransitioning] = useState(false);    
    const { data, setData, post, errors, processing, recentlySuccessful } =
            useForm({
                status: "attend",
                description: "",
            });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("User Created");
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        };

        useEffect(() => {
            if(data.status === "attend"){
                setTransitioning(false);
            } else {
                setTransitioning(true);
            }
            
        }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Silahkan lakukan absensi" />
        
                <Selectbox
                    onChange ={(e) =>
                        setData("status", e.target.value)
                    }
                    className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "permit", label: "Izin" },
                        { value: "sick", label: "Sakit" },
                        { value: "leave", label: "Cuti" },
                        { value: "business_trip", label: "Dinas" },
                        { value: "remote_work", label: "Remote" },
                    ]}
                 /> 
                <InputError className="mt-2" message={errors.name} />
            </div>

            <Transition
                    show={transitioning}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                
                        <TextInput
                            onChange ={(e) =>
                                setData("status", e.target.value)
                            }
                            className="w-full"
                        /> 
                        <InputError className="mt-2" message={errors.name} />
                    </div>
            </Transition>
            
            
                
            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>
                
                {/* <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                </Transition> */}
            </div>
        </form>

    );
}
