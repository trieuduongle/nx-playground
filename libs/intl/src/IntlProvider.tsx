import { useCallback, useEffect, useState } from 'react';

import { shouldPolyfill } from '@formatjs/intl-pluralrules/should-polyfill';
import { usePrevious } from '@playground/hooks';
import { IntlProvider as BaseIntlProvider } from 'react-intl';
import { Locale } from './locale.enum';

interface IntlProviderProps {
  locale: Locale;
  messageLoader: (locale: Locale) => Promise<object>;
  onTranslationLoading?: (isLoading: boolean) => void;
}

type TranslationObject = Record<string, string>;
type MessageType = Partial<Record<Locale, TranslationObject>>;

const supportedLocales = Object.values(Locale);

const extractLanguage = (locale: Locale) => locale.split('-')[0];

export const IntlProvider: React.FCChildren<IntlProviderProps> = ({
  locale,
  messageLoader,
  onTranslationLoading,
  children,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState<MessageType>({});
  const [lang, setLang] = useState(extractLanguage(locale));
  const previousLocale = usePrevious(locale);

  const isMessageLoadingCallback = useCallback(
    (status: boolean) => onTranslationLoading && onTranslationLoading(status),
    [onTranslationLoading]
  );

  useEffect(() => {
    setInitialized(true);
    isMessageLoadingCallback(true);
  }, [isMessageLoadingCallback, locale]);

  useEffect(() => {
    isMessageLoadingCallback(true);

    const newLang = extractLanguage(locale);
    Promise.all([
      messageLoader(locale),
      shouldPolyfill(newLang)
        ? import(
            `@formatjs/intl-pluralrules/locale-data/${newLang.toLowerCase()}`
          )
        : Promise.resolve(true),
    ])
      .then(([result]) => {
        setMessages((values) => ({
          ...values,
          [locale]: result as TranslationObject,
        }));

        setLang(newLang);
      })
      .finally(() => isMessageLoadingCallback(false));
  }, [locale, messageLoader, isMessageLoadingCallback]);

  return initialized ? (
    <BaseIntlProvider
      messages={messages[locale] || messages[previousLocale]}
      locale={lang}
    >
      {children}
    </BaseIntlProvider>
  ) : null;
};
