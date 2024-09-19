import { toast } from "react-toastify";
import DataTable from "../dashboard/components/DataTable";
import {Modal} from "flowbite-react";
import { useGetHotelsQuery, useCreateHotelMutation } from "./hotelApiSlice";
import { Button } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hotel = () => {
    const [openModal, setOpenModal] = useState(false);
    const { data, isLoading, isError, refetch } = useGetHotelsQuery();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [createHotel, { isLoading: creatHotelLoading, isError: createHotelError }] = useCreateHotelMutation();

    const navigate = useNavigate();
    
    if (isError) {
        toast.error(`An error occured: Not Authorized`);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader bg-[#072FAD]"></div>
            </div>
        )
    }

    const onCloseModal = () => {
        setOpenModal(false);
    }

    const validate = () => {
        let temp = {};
        temp.name = name !== "" ? false : true;
        temp.email = email !== "" ? false : true;
        temp.location = location !== "" ? false : true;
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        validate()
        console.log({ name, email, location })
        try {
            await createHotel({ name, email, location }).unwrap();
            navigate("/hotel");
            setOpenModal(false)
            refetch();
        } catch (err) {
            toast.error("Failed to create the hotel: " + err);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 mt-20">
                <div className="flex items-center justify-between mb-20">
                    <div>
                        <h1 className="text-5xl font-bold">Hotels</h1>
                    </div>
                    <div>
                        <Button className="block text-white bg-[#072fad] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenModal(true)}>Add</Button>
                    </div>
                </div>
                <DataTable data={data} />
                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add hotel</h3>
                            <div className="relative bg-white rounded-lg dark:bg-gray-700">
                                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type hotel name" onChange={(e) => setName(e.target.value)} />
                                            {
                                                errors.name === true ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    Enter hotel name
                                                </span> : ""
                                            }
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type hotel email" onChange={(e) => setEmail(e.target.value)} />
                                            {
                                                errors.email === true ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    Enter hotel email
                                                </span> : ""
                                            }
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                            <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type hotel location" onChange={(e) => setLocation(e.target.value)} />
                                            {
                                                errors.location === true ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    Enter hotel location
                                                </span> : ""
                                            }
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white inline-flex items-center bg-[#62b532] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {
                                            creatHotelLoading ? <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin fill-gray-200 mx-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg> : <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        }
                                        Add hotel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal> 

            </div>
        </div>
    )
}


export default Hotel;