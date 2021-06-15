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
            <v-toolbar-title>Atras</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>

        <v-divider/>

        <v-row>
            <v-col cols="9" class="profile-data-column">
                <div class="map-styles">
                    <vl-map data-projection="EPSG:4326">
                        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                        <vl-layer-tile>
                            <vl-source-osm></vl-source-osm>
                        </vl-layer-tile>

                        <vl-feature>
                            <vl-geom-point :coordinates="coordinates"></vl-geom-point>
                        </vl-feature>
                    </vl-map>
                </div>

            </v-col>

            <v-col cols="3" class="profile-data-column">
                <v-row style="margin-top: 15px; margin-left: 10px">
                    <v-img class="rounded-circle"
                           :src="`${this.profile.picture.medium}`"
                           :lazy-src="`${this.profile.picture.medium}`"
                           max-height=130
                           max-width=130>
                    </v-img>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" style="margin-left: -45px; margin-top: 100px;"
                                   v-on="on"
                                   :color="color"
                                   fab
                                   x-small
                                   @click="mark()">
                                <v-icon color="#ffffff">
                                    {{icon}}
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>{{this.favoriteText}}</span>
                    </v-tooltip>
                </v-row>

                <div style="margin-left: 15px; margin-top: 20px">
                    <div>
                        <span class="title-text">Nombre:</span><br/>
                        <span class="title-details">{{this.profile.name.title}} {{this.profile.name.first}} {{this.profile.name.last}}</span>
                    </div>

                    <div>
                        <span class="title-text">Correo:</span><br/>
                        <span class="title-details">{{this.profile.email}}</span>
                    </div>

                    <div>
                        <span class="title-text">Ciudad:</span><br/>
                        <span class="title-details"> {{this.profile.location.city}}</span>
                    </div>

                    <div>
                        <span class="title-text">Calle:</span><br/>
                        <span class="title-details"> {{this.profile.location.street.name}}</span>
                    </div>

                    <div>
                        <span class="title-text">Número:</span><br/>
                        <span class="title-details">{{this.profile.location.street.number}}</span>
                    </div>

                    <div>
                        <span class="title-text">Telefóno:</span><br/>
                        <span class="title-details">{{this.profile.phone}}</span>
                    </div>

                    <div>
                        <span class="title-text">Celular:</span><br/>
                        <span class="title-details">{{this.profile.cell}}</span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "ProfileDetails",
        props: {
            profile: Object
        },
        data() {
            return {
                zoom: 2,
                center: [0, 0],
                rotation: 0,
                geolocPosition: undefined,
                favoriteText: 'Marcar como favorito',
                icon: 'mdi-heart-plus',
                color: 'grey',
                coordinates: []
            }
        },
        methods: {
            ...mapMutations(["markOfFavorite"]),
            favoriteIconColor() {
                this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
                this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';
                this.color = this.profile.favorite == true ? 'indigo' : 'grey';

            },
            mark() {
                this.markOfFavorite(this.profile);
                this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';
                this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
                this.color = this.profile.favorite == true ? 'indigo' : 'grey';
            }
        },
        mounted() {
            this.favoriteIconColor();
            this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';
            this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
            this.color = this.profile.favorite == true ? 'indigo' : 'grey';
            this.coordinates = this.this.profile.location.coordinates;
        }
    }
</script>

<style scoped>
    .info-container {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: left !important;
        vertical-align: center !important;
        horiz-align: center !important;
        align-self: center !important;
    }

    .title-text {
        font-size: 12px;
    }

    .title-details {
        font-size: 14px;
        text-shadow: 0.4px 0.4px 1px black;
    }

    .map-styles {
        height: calc(100vh - 135px) !important;
    }

    .v-card {
        background: #f7f7f7;
    }


</style>
