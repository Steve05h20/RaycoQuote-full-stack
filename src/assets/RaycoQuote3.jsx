
import { useTranslation } from 'react-i18next';

const RaycoQuote3 = () => {
    const { t } = useTranslation();

    const termsAndConditions = [
        { title: t('termsAndConditions.raycoGroupTitle'), content: t('termsAndConditions.raycoGroup') },
        { title: "1.RAYCO GROUP OF COMPANIES:", content: t('termsAndConditions.raycoGroup') },
        { title: "2.SALES TERMS:", content: t('termsAndConditions.salesTerms') },
        { title: "3.ACCEPTANCE:", content: t('termsAndConditions.acceptance') },
        { title: "4.AMENDMENT:", content: t('termsAndConditions.amendment') },
        { title: "5.QUOTATIONS:", content: t('termsAndConditions.quotations') },
        { title: "6.PRICES:", content: t('termsAndConditions.prices') },
        { title: "7.ELECTION OF DOMICILE:", content: t('termsAndConditions.electionOfDomicile') },
        { title: "8.JUDICIAL PROCEEDINGS:", content: t('termsAndConditions.judicialProceedings') },
        { title: "9.PAYMENT:", content: t('termsAndConditions.payment') },
        { title: "10.RETURN AND CANCELLATION OF AN ORDER:", content: t('termsAndConditions.returnAndCancellation') },
        { title: "11.DELIVERY:", content: t('termsAndConditions.delivery') },
        { title: "12.DELIVERY DELAYS DUE TO THE BUYER OR FINAL CUSTOMER:", content: t('termsAndConditions.deliveryDelays') },
        { title: "13.SHIPPING, DAMAGE OR LOSS IN TRANSIT:", content: t('termsAndConditions.shipping') },
        { title: "14.DEFECTS:", content: t('termsAndConditions.defects') },
        { title: "15.CLAIMS:", content: t('termsAndConditions.claims') },
        { title: "16.COMPANY'S LIABILITY:", content: t('termsAndConditions.companyLiability') },
        { title: "17.OWNERSHIP OF GOODS SOLD:", content: t('termsAndConditions.ownershipOfGoods') },
        { title: "18.MORTGAGE ON MOVEABLE & IMMOVEABLE GOODS:", content: t('termsAndConditions.mortgage')+t('termsAndConditions.mortgageContinued') },
    ];

    return (
        <div className="bg-white w-[215.9mm] h-[279.4mm] mx-auto shadow-lg relative p-4 text-[8pt] leading-tight">
            <div className="absolute top-2 right-2 text-[7pt]">{t('form.page', { page: 3 })}</div>

            <h1 className="text-sm font-bold mb-2">{t('termsAndConditions.title')}</h1>

            <div className="grid grid-cols-2 gap-1.5">
                {termsAndConditions.map((term, index) => (
                    <div key={index} className="">
                        <h2 className="font-bold text-[8pt] mb-0.5">{term.title}</h2>
                        <p className="text-[7.5pt] leading-snug">{term.content}</p>
                    </div>
                ))}
            </div>

            {/* Pied de page */}
            <div className="bg-red-600 h-2 absolute bottom-0 left-0 right-0"></div>
        </div>
    );
};

export default RaycoQuote3;