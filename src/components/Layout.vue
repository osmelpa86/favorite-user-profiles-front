<template>
    <v-app>
        <v-app-bar app>

            <v-spacer></v-spacer>

            <v-tooltip bottom v-if="$router.currentRoute.path == '/'">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" style="margin-right: 15px;"
                           v-on="on"
                           color="indigo"
                           fab
                           x-small
                           @click="$router.push({ name: 'favorites'})">
                        <v-icon color="#ffffff">
                            mdi-file-excel
                        </v-icon>
                    </v-btn>
                </template>
                <span>Exportar favoritos</span>
            </v-tooltip>

            <v-tooltip bottom v-if="$router.currentRoute.path == '/'">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" style="margin-right: 15px;"
                           v-on="on"
                           color="indigo"
                           fab
                           x-small
                           @click="readProfiles()">
                        <v-icon color="#ffffff">
                            mdi-database-import
                        </v-icon>
                    </v-btn>
                </template>
                <span>Cargar datos</span>
            </v-tooltip>
        </v-app-bar>
        <!-- Provides the application the proper gutter -->
        <v-main>
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import api from "../service/apiService";
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "Layout",
        data() {
            return {
                profiles: [],
            }
        },
        methods: {
            ...mapMutations(["loadProfiles"]),
            async readProfiles() {
                await api.getAll()
                    .then(response => {
                        const results = response.data.results
                        for (const [i, value] of response.data.results.entries()) {
                            this.profiles.push({
                                id: i + 1,
                                gender: value.gender,
                                name: {
                                    title: value.name.title,
                                    first: value.name.first,
                                    last: value.name.last
                                },
                                email: value.email,
                                nat: value.nat,
                                dob: {
                                    date: value.dob.date,
                                    age: value.dob.age
                                },
                                registered: {
                                    date: value.registered.date,
                                    age: value.registered.age
                                },
                                location: {
                                    street: {
                                        number: value.location.street.number,
                                        name: value.location.street.name
                                    },
                                    city: value.location.city,
                                    state: value.location.state,
                                    country: value.location.country,
                                    postcode: value.location.postcode,
                                    coordinates: {
                                        latitude: value.location.coordinates.latitude,
                                        longitude: value.location.coordinates.longitude
                                    },
                                    timezone: {
                                        offset: value.location.timezone.offset,
                                        description: value.location.timezone.description
                                    }
                                },
                                phone: value.phone,
                                cell: value.cell,
                                picture: {
                                    large: value.picture.large,
                                    medium: value.picture.medium,
                                    thumbnail: value.picture.thumbnail
                                },
                                favorite: false,
                            })
                        }
                    }).catch(e => {
                        console.log(e);
                    });
                this.loadProfiles(this.profiles);
            },
        }
    }
</script>

<style scoped>

</style>
