import React, { createContext } from 'react';
import { UserSettings } from '../types/DefaultTypes';

interface SettingsContextInterface {
  settings: UserSettings;
  storeSettings: (settings: UserSettings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextInterface>({
  settings: {} as UserSettings,
  storeSettings: () => {},
  resetSettings: () => {}
});

const SettingsProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {

  const [settings, setSettings] = React.useState<UserSettings>({} as UserSettings);

  const storeSettings = (newSettings: UserSettings): void => {

    console.log('settingsContextStoring', newSettings);
    setSettings(() => newSettings);
  }

  const resetSettings = (): void => {
    setSettings({} as UserSettings);
  }

  return (
    <SettingsContext.Provider value={{storeSettings, resetSettings, settings}}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export default SettingsProvider;

export {
  useSettings
}

