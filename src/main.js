import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 🔐 NEU: AWS Amplify
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

// Konfiguriere Amplify mit deinen Cognito-Daten
Amplify.configure(awsExports)

createApp(App).use(router).mount('#app')
