import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import LanguageSwitcher from './LanguageSwitcher';
import RaycoQuote1 from './RaycoQuote1';
import RaycoQuote2 from './RaycoQuote2';
import RaycoQuote3 from './RaycoQuote3';
import RaycoQuote4 from './RaycoQuote4';
import { gsap } from 'gsap';
import logo from './rayco-uni.png';
import logoRayco from './rayco-logo@300x.png';
import duoLogo from './duo-logo.svg';

const LoadingScreen = ({ onComplete }) => {
  const greetingRef = useRef(null);
  const greetings = ['Bonjour', 'Good morning', 'Buenos días'];

  useEffect(() => {
    let currentIndex = 0;

    const animateGreeting = () => {
      if (currentIndex >= greetings.length) {
        onComplete();
        return;
      }

      const greeting = greetings[currentIndex];

      gsap.timeline()
        .to(greetingRef.current, {
          duration: 0.3,
          opacity: 0,
          y: -20,
          ease: 'power2.in',
          onComplete: () => {
            greetingRef.current.textContent = greeting;
          }
        })
        .to(greetingRef.current, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              currentIndex++;
              animateGreeting();
            }, 500);
          }
        });
    };

    animateGreeting();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
    <img src={logo} alt="alt logo" class="w-72 m-20" />
      <h1 ref={greetingRef} className="text-6xl font-bold text-red-600">
        {greetings[0]}
      </h1>
      <div className="flex justify-end space-x-1 m-20 items-center">
            <img src={duoLogo} alt="duo-logo" className="h-10" />
          </div>
    </div>
  );
};

const CombinedRaycoQuote = () => {
    const { t } = useTranslation();
    const componentRef = useRef();
    const [loading, setLoading] = useState(true);

    const handleLoadingComplete = () => {
        setLoading(false);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'rayco_quote',
        onBeforeGetContent: () => {
            return new Promise((resolve) => {
                resolve();
            });
        },
        onAfterPrint: () => {
            // You can perform actions after printing here
        },
    });

    if (loading) {
        return <LoadingScreen onComplete={handleLoadingComplete} />;
    }

    return (
        <div className="relative">
            <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
                <LanguageSwitcher />
            </div>

            <div ref={componentRef} className="max-w-[215.9mm] mx-auto">
                <div className="rayco-quote-page">
                    <RaycoQuote1 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote2 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote3 />
                </div>
                <div className="rayco-quote-page">
                    <RaycoQuote4 />
                </div>
            </div>

            <button
                onClick={handlePrint}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
                {t('exportToPDF')}
            </button>
        </div>
    );
};

export default CombinedRaycoQuote;