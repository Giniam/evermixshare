import { ExpoConfig, ConfigContext } from 'expo/config';


export default ({ config }: ConfigContext): ExpoConfig => {
    const isStaging = process.env.APP_VARIANT === 'staging';
    const productionConfig: ExpoConfig = {
      ...config,
      name: 'Evermix',
      extra: {
        eas: {
          projectId: '8c24d46b-xxxx-45f1-xxxx-xxx571c7xxxx',
        },
        UPLOAD_API: 'https://upload.evermix.com',
        UPLOAD_ON_STOP: true
      }
    };
  
    if (isStaging) {
      return {
        ...productionConfig,
        name: '(Stg)Evermix',
        ios: {
          ...productionConfig.ios,
          bundleIdentifier: 'evermix.staging.ios',
        },
        android: {
          ...productionConfig.android,
          package: 'evermix.staging.droid',
        },
        extra: {
          ...productionConfig.extra,
          UPLOAD_API: 'http://192.168.0.34:11044',
          UPLOAD_ON_STOP: true
        },
      };
    }
  
    return productionConfig;
  };