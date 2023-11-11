import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseAxios from "../../api/axiosClient";
import Pagination from "../../components/common/User/Footer/Pagination";
import { useSelector } from "react-redux";
import { CSVLink } from 'react-csv';

const TableUsers = () => {
  const [userList, setUserList] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [isUpdated, setIsUpdated] = useState<any>(false)
  const [searchInput, setSearchInput] = useState<any>("");
  const [totalPage, setTotalPage]= useState()
  const page= useSelector((state:any)=> state.pagination)
  const handleGetDataa = async () => {
    await BaseAxios.get(`/users?page=${page}`)
      .then((response) => {setUserList(response.data.result), setTotalPage(response.data.totalPage)} )
      .catch((error) => {
        console.log(error);
      })
      await BaseAxios.get(`/users`)
      .then((response) => {setUsers(response.data)} )
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { handleGetDataa() }, [isUpdated])
  useEffect(() => {
    const searchResult = userList?.filter((item: any) => {
      return (
        item?.firstName?.toLowerCase().includes(searchInput?.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(searchInput?.toLowerCase())
      );
    });
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setUserList(searchResult);
    }
  }, [searchInput]);

  const handleChangeStatus = async (id: any) => {
    await BaseAxios.put(`/users/${id}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
    setIsUpdated(!isUpdated)
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const getRank = (rank: any) => {
    switch (rank) {
      case 1:
        return "New Member";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      default:
        return "Unknown Rank";
    }
  };
  const getStatus= (status:number) => {
switch (status) {
  case 1:
    return "Email not confirmed";
    case 2: 
    return "Active";
    case 3:
    return "Inactive";
}
  }

  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 search ">
      <CSVLink
          data={users}
          filename={"users_list.csv"}
          className="btn-export-file"
        >
          Export file
        </CSVLink>;
        <label htmlFor="table-search" className="sr-only ">
          Search
        </label>
        <div className="relative mt-1 ml-30px">
          <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchInput}
            onChange={handleChange}
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg tableUser">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">
                #
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Member
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 && userList?.map((item: any, index: number) => (
              <tr
                key={String(item?.id)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.firstName}{item?.lastName}
                </th>
                <td className="px-4 py-4">{item?.email}</td>
                <td className="px-4 py-4">{getRank(item?.rank)}</td>
                <td
                  style={{ display: "flex", gap: "5px" }}
                  className="px-4 py-5"
                >
                  <span> {getStatus(item?.status)}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    style={{
                      backgroundColor: "#333",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px",
                      color: "#fff",
                      display: (item?.roleId === 2|| item?.status==1)? "none": "block"
                    }}
                    onClick={() => handleChangeStatus(item?.id)}
                  >
                    Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div><Pagination totalPage={totalPage}/></div>
    </>
  );
};

export default TableUsers;
