import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import jsPDF from 'jspdf';

function DocumentList() {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchDocuments(currentUser.uid);
            } else {
                setDocuments([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchDocuments = async (userId) => {
        try {
            setLoading(true);
            const docRef = collection(db, `users/${userId}/documents`);
            const docSnap = await getDocs(docRef);

            if (docSnap.empty) {
                console.warn('No documents found.');
            } else {
                const docList = docSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt || null
                }));
                setDocuments(docList);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        setLoading(false);
    };

    const handleView = async (id) => {
        try {
            const docRef = doc(db, `users/${user.uid}/documents/${id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSelectedDocument(docSnap.data());
            } else {
                Swal.fire({
                    icon: 'error',
                    title: t('document_not_found', 'Document not found.')
                });
            }
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
            `Name: ${docData.documentData.translatedName || 'N/A'}`,
            `DOB: ${docData.documentData.translatedDob || 'N/A'}`,
            `Allergies: ${docData.documentData.translatedAllergies || 'None'}`,
            `Medications: ${docData.documentData.translatedMedications || 'None'}`,
            `Symptoms: ${docData.documentData.translatedSymptoms || 'N/A'}`,
            `Doctor Questions: ${docData.documentData.translatedQuestions || 'N/A'}`,
            `Notes: ${docData.documentData.translatedNotes || 'None'}`
        ];

        content.forEach((line, i) => {
            pdf.text(line, 10, 30 + i * 10);
        });

        pdf.save(`${docData.pdfName || 'document'}.pdf`);

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
                const docRef = doc(db, `users/${user.uid}/documents/${id}`);
                await deleteDoc(docRef);

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
                                    <h3 className="text-lg font-semibold">{doc.pdfName || t('unknown_document', 'Untitled Document')}</h3>
                                    <p className="text-sm text-secondary">
                                        {doc.createdAt?.seconds
                                            ? new Date(doc.createdAt.seconds * 1000).toLocaleDateString()
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
                        <p><strong>{t('name')}:</strong> {selectedDocument.documentData?.pdfName || t('unknown')}</p>
                        <p><strong>{t('dob')}:</strong> {selectedDocument.documentData?.dob || t('na')}</p>
                        <p><strong>{t('allergies')}:</strong> {selectedDocument.documentData?.allergies || t('none')}</p>
                        <p><strong>{t('medications')}:</strong> {selectedDocument.documentData?.medications || t('none')}</p>
                        <p><strong>{t('describe_symptoms')}:</strong> {selectedDocument.documentData?.symptoms || t('na')}</p>
                        <p><strong>{t('symptom_start_date')}:</strong> {selectedDocument.documentData?.symptomStartDate || t('na')}</p>
                        <p><strong>{t('symptom_start_time')}:</strong> {selectedDocument.documentData?.symptomStartTime || t('na')}</p>
                        <p><strong>{t('medication_taken')}:</strong> {selectedDocument.documentData?.medicationTaken || t('none')}</p>
                        <p><strong>{t('doctor_questions')}:</strong> {selectedDocument.documentData?.doctorQuestions || t('none')}</p>
                        <p><strong>{t('additional_notes')}:</strong> {selectedDocument.documentData?.notes || t('none')}</p>


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
