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
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

setOptions({ 
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly"
     });

export default function SubmitAttendance({ auth }) {
    const [transitioning, setTransitioning] = useState(false);    
    const { data, setData, post, transform, errors, processing, recentlySuccessful } =
            useForm({
                status: "attend",
                description: "",
                latitude: "",
                longitude: "",
                prepareData: {},
                address: "",
            });

        const getLatLing = (e) => {
            e.preventDefault();
            navigator.geolocation.getCurrentPosition(
                function (position){
                    createGeocorder(position.coords);
                },
                function (error){
                    alert("Tidak bisa mendapatkan lokasi");
                }
            )
        }

        function createGeocorder(coordinates){
            importLibrary("geocoding").then(({ Geocoder }) => {
                const geocoder = new Geocoder();
                geocoder.geocode({ 
                    location: { 
                        lat: coordinates.latitude, 
                        lng: coordinates.longitude 
                    },
                })
                .then((response) => {
                    if(!response.results[0]){
                        alert("Tidak bisa menemukan lokasi");
                        return;
                    }
                    let objLocation = {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        address: response.results[0].formatted_address,
                    };
                    setData("prepareData", objLocation);
                })
                .catch((e) => {
                    console.log("Gagal membaca koordinat: ", e);
                });
            });
        }
    
        const submit = (e) => {
            e.preventDefault();
        };

        useEffect(() => {
            if (data.prepareData.hasOwnProperty("address")){
                transform((data) => ({
                    ...data.prepareData,
                    status: data.status,
                    description: data.description,
                }))
                post(route('attendances.submit'), {
                    preserveScroll: true,
                    onSuccess: () => {
                        alert("Absensi Success");
                    },
                    onError: (errors) => {
                        console.log(errors);
                    },
                });
            }

        }, [data.prepareData]);

        useEffect(() => {
            if(data.status === "attend"){
                setTransitioning(false);
            } else {
                setTransitioning(true);
            }
            
        }, [data.status]);

    return (
        <form onSubmit={getLatLing} className="mt-6 space-y-6">
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
                                setData("description", e.target.value)
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
