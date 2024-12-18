import Header from "@components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Record } from "@types";
import RecordOverviewTable from "@components/records/RecordOverviewTable";
import RecordService from "@services/RecordService";
import AddRecord from "@components/records/AddRecord";
import useCurrentPatient from "hook/useCurrentPatient";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Records: React.FC = () => {

    const [records, setRecords] = useState<Record[]>([]);
    const [showRecordForm, setShowRecordForm] = useState<boolean>(false);
    const patient = useCurrentPatient();

    const getAllRecords = async () => {
        const response = await RecordService.getAllRecords();
        const recordsData = await response.json();
        if (patient) {
            const patientRecords = recordsData.filter((record: Record) => record.patientId === patient.id);
            setRecords(patientRecords);
        }
    }

    const handleRecordCreated = (newRecord: Record) => {
        setRecords((prevRecord) => [...prevRecord, newRecord]);
    }

    const handleDelete = (id: number) => {
        setRecords((prevRecord) => prevRecord.filter(record => record.id !== id));
    }

    useEffect(() => {
        if (patient) {
            getAllRecords();
        }
    }, [patient]);

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
                    <RecordOverviewTable records={records} deleteRecord={handleDelete}></RecordOverviewTable>
                )}

                <button
                    onClick={() => setShowRecordForm(!showRecordForm)}
                    
                >
                  Add Record
                </button>

                {showRecordForm && (
                  <div className="w-full max-w-md">
                    <AddRecord onRecordCreated={handleRecordCreated}></AddRecord>
                  </div>
              )}

                

                
                

            </main>
        </>
        );
    };

    export const getServerSideProps = async ({ locale }: { locale: string }) => ({
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    });
export default Records;