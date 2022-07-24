// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Modal } from '@playground/components';
import { IntlProvider, Locale } from '@playground/intl';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const messagesLoader = (locale: Locale) => {
  return import(`./translations/${locale}.json`);
};

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslationLoading, setITranslationLoading] = useState(false);

  const [locale, setLocale] = useState(Locale.EN_US);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLoading = useCallback((status: boolean) => {
    setITranslationLoading(status);
  }, []);

  return (
    <IntlProvider
      locale={locale}
      messageLoader={messagesLoader}
      onTranslationLoading={handleLoading}
    >
      {isTranslationLoading ? null : (
        <>
          <FormattedMessage id="lang" />

          <div>
            <button onClick={() => setLocale(Locale.EN_US)}>en</button>
            <button onClick={() => setLocale(Locale.HR_HR)}>hr</button>
          </div>
          <div>
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Open dialog
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <Modal.Title>Payment successful</Modal.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your payment has been successfully submitted. We've sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </Modal>
          </div>
        </>
      )}
    </IntlProvider>
  );
}

export default App;
