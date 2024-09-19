import { toast } from "react-toastify";
import DataTable from "../dashboard/components/DataTable";
import Modal from "../dashboard/components/Modal";
import { useGetHotelsQuery } from "./hotelApiSlice";

const Hotel = () => {
    const { data, isLoading, isError } = useGetHotelsQuery()
    
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

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 mt-20">
                <div className="flex items-center justify-between mb-20">
                    <div>
                        <h1 className="text-5xl font-bold">Hotels</h1>
                    </div>
                    <div>
                        <button data-modal-target="static-modal" data-modal-toggle="static-modal" className="block text-white bg-[#072fad] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            Add
                        </button>
                    </div>
                </div>
                <DataTable data={data} />
                <Modal />

            </div>
        </div>
    )
}


export default Hotel;