
import { useTranslation } from 'react-i18next';

const RaycoQuote3 = () => {
    const { t } = useTranslation();

    const termsAndConditions = [
        { title: t('termsAndConditions.raycoGroupTitle'), content: t('termsAndConditions.raycoGroup') },
        { title: t('termsAndConditions.salesTermsTitle'), content: t('termsAndConditions.salesTerms') },
        { title: t('termsAndConditions.acceptanceTitle'), content: t('termsAndConditions.acceptance') },
        { title: t('termsAndConditions.amendmentTitle'), content: t('termsAndConditions.amendment') },
        { title: t('termsAndConditions.quotationsTitle'), content: t('termsAndConditions.quotations') },
        { title: t('termsAndConditions.pricesTitle'), content: t('termsAndConditions.prices') },
        { title: t('termsAndConditions.electionOfDomicileTitle'), content: t('termsAndConditions.electionOfDomicile') },
        { title: t('termsAndConditions.judicialProceedingsTitle'), content: t('termsAndConditions.judicialProceedings') },
        { title: t('termsAndConditions.paymentTitle'), content: t('termsAndConditions.payment') },
        { title: t('termsAndConditions.returnAndCancellationTitle'), content: t('termsAndConditions.returnAndCancellation') },
        { title: t('termsAndConditions.deliveryTitle'), content: t('termsAndConditions.delivery') },
        { title: t('termsAndConditions.deliveryDelaysTitle'), content: t('termsAndConditions.deliveryDelays') },
        { title: t('termsAndConditions.shippingTitle'), content: t('termsAndConditions.shipping') },
        { title: t('termsAndConditions.defectsTitle'), content: t('termsAndConditions.defects') },
        { title: t('termsAndConditions.claimsTitle'), content: t('termsAndConditions.claims') },
        { title: t('termsAndConditions.companyLiabilityTitle'), content: t('termsAndConditions.companyLiability') },
        { title: t('termsAndConditions.ownershipOfGoodsTitle'), content: t('termsAndConditions.ownershipOfGoods') },
        { title: t('termsAndConditions.mortgageTitle'), content: t('termsAndConditions.mortgage') + t('termsAndConditions.mortgageContinued') },
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