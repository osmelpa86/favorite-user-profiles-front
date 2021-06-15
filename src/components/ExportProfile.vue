<template>
    <v-card>
        <v-toolbar dense flat>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                           v-on="on"
                           small
                           @click="$router.go(-1)">
                        <v-icon dark>
                            mdi-arrow-left
                        </v-icon>
                    </v-btn>
                </template>
                <span>Filtrar</span>
            </v-tooltip>
            <v-toolbar-title>Listado de perfiles favoritos</v-toolbar-title>

            <v-spacer></v-spacer>

            <div style="margin-right: 12px;">
                <v-text-field style="margin-bottom: -25px; width: 200px;"
                              label="Nickname"
                              outlined
                              dense
                              type="text"
                              v-model="nickname"
                ></v-text-field>
            </div>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs"
                           v-on="on"
                           color="indigo"
                           fab
                           x-small
                           :disabled="nickname == '' ? true : false"
                           @click="loadData()">
                        <v-icon color="#ffffff">
                            mdi-filter
                        </v-icon>
                    </v-btn>
                </template>
                <span>Filtrar</span>
            </v-tooltip>

            <download-csv style="margin-left: 12px;"
                          :data="this.favoriteExports"
                          :separator-excel="true">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs"
                               v-on="on"
                               color="indigo"
                               fab
                               x-small
                               :disabled="favoriteExports.length == 0 ? true : false">
                            <v-icon color="#ffffff">
                                mdi-download
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Exportar</span>
                </v-tooltip>
            </download-csv>

        </v-toolbar>

        <v-divider/>

        <v-data-table
                :headers="headers"
                :items="favoriteProfiles"
                fixed-header
                class="elevation-1"
                id="list-profiles">

            <template v-slot:item.gender="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" large color="indigo"
                                v-on="on">{{item.gender ==='male' ? 'mdi-human-male' : 'mdi-human-female'}}
                        </v-icon>
                    </template>
                    <span>{{item.gender ==='male' ? 'Masculino' : 'Femenino'}}</span>
                </v-tooltip>
            </template>

            <template v-slot:item.name="{ item }">
                <span>{{item.name.title}} {{item.name.first}} {{item.name.last}}</span>
            </template>

            <template v-slot:item.date_birth="{ item }">
                {{ formatDate(item.dob.date)}}
            </template>

            <template v-slot:item.date_registration="{ item }">
                {{ formatDate(item.registered.date)}}
            </template>
        </v-data-table>

        <v-snackbar
                v-model="snackbar"
                :multi-line="multiLine"
                :timeout="timeout"
                bottom
                right
                :color="alertColor"
                :type="alertType">
            <v-icon>{{alertIcon}}</v-icon>
            {{ text }}
        </v-snackbar>
    </v-card>
</template>

<script>
    import api from "../service/apiMemoryService"
    import moment from 'moment'

    export default {
        name: "ExportProfile",
        data() {
            return {
                favoriteProfiles: [],
                favoriteExports: [],
                nickname: '',
                alertIcon: 'mdi-information',
                alertColor: 'indigo',
                alertType: 'success',
                multiLine: false,
                snackbar: false,
                text: ``,
                timeout: 5000,
                headers: [
                    {
                        text: 'Género',
                        align: 'left',
                        sortable: true,
                        value: 'gender',
                    },
                    {
                        text: 'Nombre',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    {
                        text: 'Correo',
                        align: 'left',
                        sortable: true,
                        value: 'email'
                    },
                    {
                        text: 'Nacionalidad',
                        align: 'left',
                        sortable: true,
                        value: 'nat'
                    },
                    {
                        text: 'Fecha de nacimiento',
                        align: 'left',
                        sortable: true,
                        value: 'date_birth'
                    },
                    {
                        text: 'Fecha de registro',
                        align: 'left',
                        sortable: true,
                        value: 'date_registration'
                    }],
            }
        },
        methods: {
            async loadData() {
                await api.getProfilesByNickName(this.nickname).then(response => {
                    this.favoriteProfiles = response.data;

                    this.favoriteExports = response.data.map(post => ({
                        Género: post.gender == 'male' ? 'Masculino' : 'Femenino',
                        Nombre: `${post.name.title} ${post.name.first} ${post.name.last}`,
                        Correo: post.email,
                        Nacionalidad: post.nat,
                        'Fecha de Nacimiento': post.dob.date,
                        'Fecha de Registro': post.registered.date
                    }));
                }).catch(e => {
                    this.text = 'No existen datos asociados a al Nickname :' + ' ' + this.nickname;
                    this.snackbar = true;
                });
            },

            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('yyyy/MM/DD');
                }
            },
        }
    }
</script>

<style scoped>
    .v-data-table /deep/ .sticky-header {
        position: sticky;
    }

    .v-data-table /deep/ .v-data-table__wrapper {
        overflow: unset;
    }

    #list-profiles /deep/ .v-data-footer {
        position: absolute !important;
        bottom: 0px !important;
        width: 99.2% !important;
        background: white;
    }

    #list-profiles /deep/ .v-data-table__wrapper {
        margin-bottom: 65px !important;
    }

    #list-profiles {
        max-height: calc(100vh - 135px) !important;
        overflow: auto;
    }
</style>
