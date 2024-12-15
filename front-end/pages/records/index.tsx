import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Record } from "@types";
import RecordOverviewTable from "@components/records/RecordOverviewTable";
import RecordService from "@services/RecordService";
import AddRecord from "@components/records/AddRecord";

const Records: React.FC = () => {

    const [records, setRecords] = useState<Record[]>([]);
    const [showRecordForm, setShowRecordForm] = useState<boolean>(false);


    const getAllRecords = async () => {
        const response = await RecordService.getAllRecords();
        const recordsData = await response.json();
        setRecords(recordsData);
    }


    useEffect(() => {
        getAllRecords();
    }, []);

    return (
        <>
            <Head>
                <title>Records</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Records</h1>
                <section>
                    <h2>Records overview</h2>
                </section>

                {records && (
                    <RecordOverviewTable records={records}></RecordOverviewTable>
                )}

                <button
                    onClick={() => setShowRecordForm(!showRecordForm)}
                    
                >
                  Add Record
                </button>

                {showRecordForm && (
                  <div className="w-full max-w-md">
                    <AddRecord></AddRecord>
                  </div>
              )}

                

                
                

            </main>
        </>
        );
    };
export default Records;