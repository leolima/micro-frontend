<template>
    <div id="app">
        <div class="foo"><b>Bem vindo</b> {{ user?.email }}</div>
        <div class="content">
            <div class="nav">
                <ul>
                    <li>
                        <a hre="/#">Home</a>
                    </li>
                    <li>
                        <a hre="/#">Monitor</a>
                    </li>
                    <li>
                        <a hre="/#">Tickets</a>
                    </li>
                    <li>
                        <a hre="/#">Home</a>
                    </li>
                </ul>
            </div>
            <div class="blocks">
                <div class="bg-1"/>
                <div class="bg-2"/>
                <div class="bg-3"/>
                <div class="bg-4"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import './app.css'

export default defineComponent({
  name: 'DashboardPage',
  props: ['user']
})
</script>