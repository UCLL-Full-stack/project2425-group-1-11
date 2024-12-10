import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Record } from "@types";
import RecordOverviewTable from "@components/records/RecordOverviewTable";
import RecordService from "@services/RecordService";

const Records: React.FC = () => {

    const [records, setRecords] = useState<Record[]>([]);


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

                
                

            </main>
        </>
        );
    };
export default Records;