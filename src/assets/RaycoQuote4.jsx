import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';

const RaycoQuote4 = ({ isPreparingExport }) => {
    const { t } = useTranslation();
    const [companyDate, setCompanyDate] = useState('');
    let [customerSignedBy, setCustomerSignedBy] = useState('');
    const [customerDate, setCustomerDate] = useState('');

    const companySignatureRef = useRef();
    const customerSignatureRef = useRef();
    const signedByRef = useRef();

    const clearSignature = useCallback((ref) => {
        ref.current.clear();
    }, []);

    const termsAndConditions = [
        { title: "19.BUYER'S DEFAULT:", content: t('termsAndConditions.buyerDefault') },
        { title: "20.NEW PARTS LIMITED WARRANTY:", content: t('termsAndConditions.newPartsWarranty') },
        { title: "21.REFURBISHED PART LIMITED WARRANTY:", content: t('termsAndConditions.refurbishedPartsWarranty') },
        { title: "22.FEES NOT COVERED BY THE WARRANTY:", content: t('termsAndConditions.feesNotCovered') },
        { title: "23.WARRANTY'S IMPLEMENTATION:", content: t('termsAndConditions.warrantyImplementation') },
        { title: "24.INVALIDITY:", content: t('termsAndConditions.invalidity') },
        { title: "25.INSTALLATION / REPAIRS:", content: t('termsAndConditions.installationRepairs') },
        { title: "26.NATIONAL STANDARDS:", content: t('termsAndConditions.nationalStandards') },
    ];

    const InputOrText = ({ value, onChange, type, id, className }) => {
        if (isPreparingExport) {
            return <span className={className}>{value}</span>;
        }
        return (
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={className}
            />
        );
    };

    const handleCompanyDateChange = (e) => setCompanyDate(e.target.value);
    const handleCustomerDateChange = (e) => setCustomerDate(e.target.value);
    const handleCustomerSignedByChange = () => {
        
        let write = signedByRef.current.value
        setCustomerSignedBy(
            write
        )
    };

    return (
        <div className="bg-white w-[215.9mm] h-[279.4mm] mx-auto shadow-lg relative p-4 text-[7pt] leading-tight">
            <div className="absolute top-2 right-2 text-[7pt]">{t('form.page', { page: 4 })}</div>

            <div className="space-y-2">
                {termsAndConditions.map((term, index) => (
                    <div key={index}>
                        <h2 className="font-bold text-[8pt] mb-0.5">{term.title}</h2>
                        <p className="text-[7.5pt] leading-snug">{term.content}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <p className="text-[7pt] mb-1">{t('termsAndConditions.revisionDate')}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold text-[8pt] mb-1">{t('termsAndConditions.onBehalfOfCompany')}</p>
                        <div className="flex items-end mb-0.5">
                            <div>
                                <label className="text-[7pt] mr-1">{t('termsAndConditions.signature')}:</label>
                                <div className="border border-gray-400 w-52 h-16">
                                    <SignatureCanvas
                                        ref={companySignatureRef}
                                        canvasProps={{ width: 220, height: 60, className: 'signature-canvas' }}
                                    />
                                </div>
                            </div>
                            {!isPreparingExport && (
                                <button onClick={() => clearSignature(companySignatureRef)} className="text-[6pt] text-blue-600 ml-1">
                                    clear signature
                                </button>
                            )}
                        </div>
                        <div>
                            <label htmlFor="companyDate" className="text-[7pt] mr-1">{t('termsAndConditions.date')}:</label>
                            <InputOrText
                                type="date"
                                id="companyDate"
                                value={companyDate}
                                onChange={handleCompanyDateChange}
                                className="border-b border-gray-400 text-[7pt] w-24 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[8pt] mb-1">{t('termsAndConditions.onBehalfOfCustomer')}</p>
                        <p className="text-[7pt] mb-1">{t('termsAndConditions.agreedToQuote')}</p>

                        <div className="flex items-end mb-0.5">
                            <div>
                                <label className="text-[7pt] mr-1">{t('termsAndConditions.signature')}:</label>
                                <div className="border border-gray-400 w-52 h-16">
                                    <SignatureCanvas
                                        ref={customerSignatureRef}
                                        canvasProps={{ width: 220, height: 60, className: 'signature-canvas' }}
                                    />
                                </div>
                            </div>
                            {!isPreparingExport && (
                                <button onClick={() => clearSignature(customerSignatureRef)} className="text-[6pt] text-blue-600 ml-1">
                                    clear signature
                                </button>
                            )}
                        </div>
                        <div className="flex items-end mb-0.5">
                            <div>
                                <label htmlFor="customerDate" className="text-[7pt] mr-1">{t('termsAndConditions.date')}:</label>
                                <InputOrText
                                    type="date"
                                    id="customerDate"
                                    value={customerDate}
                                    onChange={handleCustomerDateChange}
                                    className="border-b border-gray-400 text-[7pt] w-24 focus:outline-none"
                                />
                            </div>
                            <div className="flex ml-2">
                                <label htmlFor="customerSignedBy" className="text-[7pt] mr-1">{t('termsAndConditions.signedBy')}:</label>
                                <input
                                        type={"text"}
                                        id={"customerSignedBy"}
                                        value={customerSignedBy}
                                        onChange={()=>handleCustomerSignedByChange()}
                                        className="border-b border-gray-400 text-[7pt] w-24 focus:outline-none"
                                        ref={signedByRef}
                                />
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pied de page */}
            <div className="bg-red-600 h-2 absolute bottom-0 left-0 right-0"></div>
        </div>
    );
};

export default RaycoQuote4;
