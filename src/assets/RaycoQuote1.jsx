import { useTranslation } from 'react-i18next';
import logo from './rayco-uni.png';
import logoRayco from './rayco-logo@300x.png';
import logoSysco from './sysco-logo@300x.png';

const RaycoQuote1 = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white w-[215.9mm] h-[279.4mm] mx-auto shadow-lg relative text-[9pt] leading-tight overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-red-900 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Rayco logo" className="h-16 mr-2" />
          <span className="text-white text-base font-bold">{t('header.quoteForm')}</span>
        </div>
        <div className="text-right text-white">
          <div className="flex justify-end space-x-1 mb-1 items-center">
            <img src={logoRayco} alt="RaycoWylie logo" className="h-4" />
            <img src={logoSysco} alt="RaycoSyscomak logo" className="h-8" />
          </div>
          <p className="text-[7pt]">{t('header.companyName')}</p>
          <p className="text-[7pt]">{t('header.address.street')}</p>
          <p className="text-[7pt]">{t('header.address.city')}, {t('header.address.province')}</p>
          <p className="text-[7pt]">{t('header.address.country')}</p>
        </div>
      </div>

      {/* Main content */}
      <form className="bg-white p-3">
        <div className="flex justify-end text-[7pt] mb-3">{t('form.page', { page: 1 })}</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-3">
              <label htmlFor="quotation" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.quotation')}</label>
              <input type="text" id="quotation" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
            <div className="mb-3">
              <label htmlFor="dateIssued" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.dateIssued')}</label>
              <input type="date" id="dateIssued" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="paymentTerms" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.paymentTerms')}</label>
              <span className="text-[9pt] block p-1.5 bg-blue-100">{t('form.paymentBeforeShipment')}</span>
            </div>
            <div className="mb-3">
              <span className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.shippingTerms')}</span>
              <span className="text-[9pt] block p-1.5 bg-blue-100">{t('form.exWorks')}</span>
            </div>
            <div>
              <span className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.expiration')}</span>
              <span className="text-[9pt] block p-1.5 bg-blue-100">{t('form.expirationDays')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-red-600 font-bold text-[11pt] mb-3">{t('form.customer.title')}</h2>
            <div className="mb-3">
              <label htmlFor="customerName" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.customer.fullName')}</label>
              <input type="text" id="customerName" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
            <div className="mb-3">
              <label htmlFor="customerAddress" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.customer.address')}</label>
              <textarea id="customerAddress" rows="2" className="w-full bg-blue-100 p-1.5 text-[9pt]"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="customerContact" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.customer.contactPerson')}</label>
              <input type="text" id="customerContact" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
            <div>
              <label htmlFor="customerPhone" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.customer.telephone')}</label>
              <input type="tel" id="customerPhone" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
          </div>
          <div>
            <h2 className="text-red-600 font-bold text-[11pt] mb-3">{t('form.rayco.title')}</h2>
            <div className="mb-3">
              <label className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.rayco.officeAddress')}</label>
              <textarea className="w-full bg-blue-100 p-1.5 text-[9pt]" rows="2" readOnly value={t('header.address.full')}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="raycoContact" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.rayco.contactPerson')}</label>
              <input type="text" id="raycoContact" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
            <div className="mb-3">
              <label htmlFor="raycoPhone" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.rayco.phone')}</label>
              <input type="tel" id="raycoPhone" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
            <div>
              <label htmlFor="raycoEmail" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.rayco.email')}</label>
              <input type="email" id="raycoEmail" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-red-600 font-bold text-[11pt] mb-3">{t('form.shippingInfo.title')}</h2>
          <div className="mb-3">
            <label htmlFor="shippingAddress" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.shippingInfo.shippingAddress')}</label>
            <input type="text" id="shippingAddress" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
          </div>
          <div>
            <label htmlFor="shippingContact" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.shippingInfo.contact')}</label>
            <input type="text" id="shippingContact" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-3">
            <label htmlFor="quoteDescription" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.quoteDescription')}</label>
            <textarea id="quoteDescription" rows="4" className="w-full bg-blue-100 p-1.5 text-[9pt]"></textarea>
          </div>
          <div>
            <label htmlFor="currency" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.currency')}</label>
            <select name="currency" id="currency" className='bg-blue-100 p-1.5 text-[9pt]'>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="EGP">EGP</option>
              <option value="SGD">SGD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalPrice" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.totalPrice')}</label>
            <input type="text" id="totalPrice" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
          </div>
          <div>
            <label htmlFor="priceRange" className="text-red-600 font-bold text-[10pt] block mb-1.5">{t('form.priceRange')}</label>
            <input type="text" id="priceRange" className="w-full bg-blue-100 p-1.5 text-[9pt]" />
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="bg-red-600 h-2 absolute bottom-0 left-0 right-0"></div>
    </div>
  );
};

export default RaycoQuote1;