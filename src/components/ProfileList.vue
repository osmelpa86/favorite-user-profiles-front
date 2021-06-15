<template>
    <v-card>
        <v-toolbar dense flat>
            <v-toolbar-title>Listado de perfiles</v-toolbar-title>

            <v-spacer></v-spacer>

            <transition name="fade" class="prueba">
                <div class='nickname-container' v-if="show">

                    <v-text-field style="margin-bottom: -25px;;"
                                  label="Nickname"
                                  outlined
                                  dense
                                  type="text"
                                  v-model="nickname"
                    ></v-text-field>

                    <v-btn style="margin-right: 10px;"
                           icon
                           color="indigo"
                           dark
                           @click="show= false, nickname=''"
                    >
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </div>


            </transition>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" style="margin-right: 15px;"
                           v-on="on"
                           color="indigo"
                           fab
                           x-small
                           :disabled="show==true && nickname == '' ? true : false"
                           @click="saveFavoriteProfiles()">
                        <v-icon color="#ffffff">
                            {{show == false ? 'mdi-content-save' : 'mdi-check'}}
                        </v-icon>
                    </v-btn>
                </template>
                <span>Guardar favoritos en memoria</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs"
                           v-on="on"
                           color="indigo"
                           fab
                           x-small
                           @click="openDrawer = drawer = !drawer">
                        <v-icon color="#ffffff">
                            mdi-filter
                        </v-icon>
                    </v-btn>
                </template>
                <span>Filtrar</span>
            </v-tooltip>

        </v-toolbar>

        <v-divider/>

        <v-data-table
                :headers="headers"
                :items="profileList"
                fixed-header
                class="elevation-1"
                id="list-profiles">

            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs"
                               v-on="on"
                               color="indigo"
                               @click="markOfFavorite(item)">
                            <v-icon>{{item.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus'}}</v-icon>
                        </v-btn>
                    </template>
                    <span>{{item.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito'}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs"
                               color="indigo"
                               @click="$router.push({ name: 'details', params: { profile: item }})"
                               v-on="on">
                            <v-icon>mdi-account-arrow-right</v-icon>
                        </v-btn>
                    </template>
                    <span>Detalles</span>
                </v-tooltip>
            </template>

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

        <v-navigation-drawer
                absolute
                right
                v-model="drawer"
                temporary>

            <v-toolbar dense dark color="indigo">
                <v-toolbar-title>Filtrar</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs"
                               v-on="on" icon @click="drawer=false">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar</span>
                </v-tooltip>
            </v-toolbar>

            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-select
                                v-model="gender"
                                :items="genreItems"
                                label="Género"
                                outlined
                                dense
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                v-model="age"
                                type="number"
                                label="Edad"
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-text-field
                        v-model="nationality"
                        label="Nacionalidad"
                        outlined
                        dense
                ></v-text-field>

                <v-row align="center"
                       justify="space-around" style="margin-bottom: 8px;">
                    <v-btn color="indigo" class="btn"
                           @click="gender=''; nationality=''; age=null;">
                        <v-icon left color="#ffffff">
                            mdi-close-circle
                        </v-icon>
                        <span style="color:#ffffff">Cancelar</span>
                    </v-btn>
                </v-row>
            </v-container>
        </v-navigation-drawer>

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
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "ProfileList",
        props: {},
        data() {
            return {
                show: false,
                nickname: '',
                alertIcon: 'mdi-information',
                alertColor: 'indigo',
                alertType: 'success',
                multiLine: false,
                snackbar: false,
                text: ``,
                timeout: 5000,
                genreItems: ['Seleccionar género', 'Masculino', 'Femenino'],
                loader: null,
                loading: false,
                drawer: false,
                gender: '',
                nationality: '',
                age: null,
                headers: [{
                    text: 'id',
                    value: 'id',
                    align: 'center'
                },
                    {
                        text: 'Género',
                        align: 'left',
                        sortable: true,
                        value: 'gender',
                        filter: f => {
                            const value = this.gender === 'Masculino' ? 'male' : this.gender === 'Femenino' ? 'female' : ''
                            if (value == '') return true;
                            return f === value
                        }
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
                        value: 'nat',
                        filter: f => {
                            return f.includes(this.nationality)
                        }
                    },
                    {
                        text: 'Fecha de nacimiento',
                        align: 'left',
                        sortable: true,
                        value: 'date_birth',
                        filter: f => {
                            const firstDate = moment(f, 'YYYY-MM-DD')
                            const secondDate = moment()
                            const duration = moment.duration(secondDate.diff(firstDate));
                            const years = duration.asYears();

                            if (!this.age) return true;
                            return Math.round(years) == this.age
                        }
                    },
                    {
                        text: 'Fecha de registro',
                        align: 'left',
                        sortable: true,
                        value: 'date_registration'
                    },
                    {
                        text: 'Acciones',
                        value: 'actions',
                        sortable: false,
                        align: 'center'
                    }],
            }
        },
        methods: {
            ...mapMutations(["markOfFavorite"]),
            openDrawer() {
                this.drawer = false;
            },
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('yyyy/MM/DD');
                }
            },
            async saveFavoriteProfiles() {
                if (this.show) {
                    const favorites = this.profileList.filter(x => x.favorite == true);
                    if (favorites.length !== 0) {
                        const body = {nickname: this.nickname, favorites: favorites};
                        await api.save(body).then(response => {
                        }).catch(e => {
                            console.log(e);
                        });
                        this.show = false;
                        this.nickname = '';
                        this.text = 'Se han guardado satisfactoriamente los perfiles de usuarios marcados como favoritos';
                        this.snackbar = true;
                    } else {
                        this.text = 'No se han marcado perfiles de usuarios como favoritos';
                        this.snackbar = true;
                        this.alertIcon = 'mdi-alert-circle';
                        this.alertColor = "error";
                    }
                } else {
                    this.show = true;
                }
            },
        },
        computed: {
            ...mapState(["profileList", "selectedProfile"]),
        },
        mounted() {
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

    .nickname-container {
        /*margin-top: 20px;*/
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        vertical-align: center !important;
        horiz-align: center !important;
        align-self: center !important;
    }

    .fade-enter {
        opacity: 0
    }

    .fade-enter-active {
        transition: opacity 2s ease
    }

    .fade-leave {
    }

    .fade-leave-active {
        transition: opacity 2s ease;
        opacity: 0
    }
</style>
