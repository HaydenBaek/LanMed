import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { deleteDocument, getDocument, getDocuments } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

function DocumentList() {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchDocuments();
        } else {
            setDocuments([]);
            setLoading(false);
        }
    }, [user]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const docList = await getDocuments();
            setDocuments(docList || []);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        setLoading(false);
    };

    const handleView = async (id) => {
        try {
            const docData = await getDocument(id);
            setSelectedDocument(docData);
        } catch (error) {
            console.error("Error viewing document:", error);
        }
    };

    const handleDownload = (docData) => {
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text("Document Details", 10, 10);
        pdf.setFontSize(12);

        const content = [
            `Name: ${docData.translated_patient_name || 'N/A'}`,
            `DOB: ${docData.translated_patient_dob || 'N/A'}`,
            `Allergies: ${docData.translated_patient_allergies || 'None'}`,
            `Medications: ${docData.translated_patient_medications || 'None'}`,
            `Symptoms: ${docData.translated_symptoms || 'N/A'}`,
            `Doctor Questions: ${docData.translated_questions || 'N/A'}`,
            `Notes: ${docData.translated_notes || 'None'}`
        ];

        content.forEach((line, i) => {
            pdf.text(line, 10, 30 + i * 10);
        });

        pdf.save(`${docData.pdf_name || 'document'}.pdf`);

        Swal.fire({
            icon: 'success',
            title: t('download_starting', 'Download Starting...'),
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: t('confirm_delete', 'Are you sure you want to delete this document?'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('delete', 'Delete'),
            cancelButtonText: t('cancel', 'Cancel'),
        });

        if (result.isConfirmed) {
            try {
                await deleteDocument(id);

                setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));

                Swal.fire({
                    icon: 'success',
                    title: t('document_deleted', 'Document deleted successfully.'),
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error deleting document:", error);
                Swal.fire({
                    icon: 'error',
                    title: t('delete_failed', 'Failed to delete document.'),
                });
            }
        }
    };

    const closeModal = () => {
        setSelectedDocument(null);
    };

    return (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-6">{t('past_documents', 'Past Documents')}</h2>

            {loading ? (
                <p className="text-secondary">{t('loading', 'Loading...')}</p>
            ) : documents.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {documents.map((doc) => (
                        <li key={doc.id} className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{doc.pdf_name || t('unknown_document', 'Untitled Document')}</h3>
                                    <p className="text-sm text-secondary">
                                        {doc.created_at
                                            ? new Date(doc.created_at).toLocaleDateString()
                                            : t('unknown_date')}
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <button onClick={() => handleView(doc.id)} className="text-blue-500 hover:underline">
                                        {t('view', 'View')}
                                    </button>
                                    <button onClick={() => handleDownload(doc)} className="text-green-500 hover:underline">
                                        {t('download', 'Download')}
                                    </button>
                                    <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:underline">
                                        {t('delete', 'Delete')}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-secondary">{t('no_documents', 'No documents found.')}</p>
            )}

            {selectedDocument && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            {t('document_preview', 'Document Preview')}
                        </h2>
                        <p><strong>{t('name')}:</strong> {selectedDocument.pdf_name || t('unknown')}</p>
                        <p><strong>{t('dob')}:</strong> {selectedDocument.patient_dob || t('na')}</p>
                        <p><strong>{t('allergies')}:</strong> {selectedDocument.patient_allergies || t('none')}</p>
                        <p><strong>{t('medications')}:</strong> {selectedDocument.patient_medications || t('none')}</p>
                        <p><strong>{t('describe_symptoms')}:</strong> {selectedDocument.symptoms || t('na')}</p>
                        <p><strong>{t('symptom_start_date')}:</strong> {selectedDocument.symptom_start_date || t('na')}</p>
                        <p><strong>{t('symptom_start_time')}:</strong> {selectedDocument.symptom_start_time || t('na')}</p>
                        <p><strong>{t('medication_taken')}:</strong> {selectedDocument.medication_taken || t('none')}</p>
                        <p><strong>{t('doctor_questions')}:</strong> {selectedDocument.doctor_questions || t('none')}</p>
                        <p><strong>{t('additional_notes')}:</strong> {selectedDocument.notes || t('none')}</p>


                        <div className="flex justify-end mt-6">
                            <button
                                onClick={closeModal}
                                className="bg-primary hover:bg-secondary text-white py-2 px-6 rounded-lg"
                            >
                                {t('close', 'Close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default DocumentList;
