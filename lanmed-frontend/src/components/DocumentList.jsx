import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

function DocumentList() {
    const { t } = useTranslation();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchDocuments = async () => {
            if (user) {
                try {
                    const docRef = collection(db, `users/${user.uid}/documents`);
                    const docSnap = await getDocs(docRef);
                    const docList = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setDocuments(docList);
                } catch (error) {
                    console.error("Error fetching documents:", error);
                }
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [user]);

    // View Document in Modal
    const handleView = async (id) => {
        try {
            const docRef = doc(db, `users/${user.uid}/documents/${id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSelectedDocument(docSnap.data());
            } else {
                alert(t('document_not_found', 'Document not found.'));
            }
        } catch (error) {
            console.error("Error viewing document:", error);
        }
    };

    // Close Modal
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
                                        {new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleView(doc.id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {t('view', 'View')}
                                    </button>
                                    <button
                                        onClick={() => handleDownload(doc.id)}
                                        className="text-green-500 hover:underline"
                                    >
                                        {t('download', 'Download')}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="text-red-500 hover:underline"
                                    >
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

            {/* Modal to Preview Document */}
            {selectedDocument && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                        <h2 className="text-2xl font-bold text-primary mb-4">{t('document_preview', 'Document Preview')}</h2>
                        <p><strong>{t('name')}:</strong> {selectedDocument.pdfName || t('unknown')}</p>
                        <p><strong>{t('dob')}:</strong> {selectedDocument.dob || t('na')}</p>
                        <p><strong>{t('allergies')}:</strong> {selectedDocument.allergies || t('none')}</p>
                        <p><strong>{t('medications')}:</strong> {selectedDocument.medications || t('none')}</p>
                        <p><strong>{t('symptoms')}:</strong> {selectedDocument.symptoms || t('na')}</p>
                        <p><strong>{t('symptom_start_date')}:</strong> {selectedDocument.symptomStartDate || t('na')}</p>
                        <p><strong>{t('symptom_start_time')}:</strong> {selectedDocument.symptomStartTime || t('na')}</p>
                        <p><strong>{t('medication_taken')}:</strong> {selectedDocument.medicationTaken || t('none')}</p>
                        <p><strong>{t('doctor_questions')}:</strong> {selectedDocument.doctorQuestions || t('none')}</p>
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
