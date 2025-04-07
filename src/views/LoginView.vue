<script setup>
import { federatedSignIn } from 'aws-amplify/auth'

const login = () => {
  federatedSignIn() // öffnet die Cognito Login UI
}
</script>
