<template>
  <nav class="navbar">
    <a href="/">Jugendwarte FF Manching</a>
    <ul>
      <li><router-link to="/">Start</router-link></li>
      <li><router-link to="/mitglieder">Mitglieder</router-link></li>
    </ul>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #eee;
}
ul {
  display: flex;
  gap: 1rem;
}
@media (max-width: 600px) {
  ul {
    flex-direction: column;
  }
}
</style>
