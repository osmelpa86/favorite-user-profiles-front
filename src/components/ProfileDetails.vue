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
            <v-col cols="6" class="profile-data-column">
                <v-row style="margin-top: 15px;"
                       align="center"
                       justify="center">
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
                                   color="indigo"
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

                <div style="margin-left: 15px">
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

            <v-col cols="6" class="profile-data-column">
<!--                <div>-->
<!--                    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"-->
<!--                            data-projection="EPSG:4326" style="height: 400px">-->
<!--                        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>-->

<!--                        <vl-geoloc @update:position="geolocPosition = $event">-->
<!--                            <template slot-scope="geoloc">-->
<!--                                <vl-feature v-if="geoloc.position" id="position-feature">-->
<!--                                    <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>-->
<!--                                    <vl-style-box>-->
<!--                                        <vl-style-icon src="src/assets/logo.png" :scale="0.4"-->
<!--                                                       :anchor="[0.5, 1]"></vl-style-icon>-->
<!--                                    </vl-style-box>-->
<!--                                </vl-feature>-->
<!--                            </template>-->
<!--                        </vl-geoloc>-->

<!--                        <vl-layer-tile id="osm">-->
<!--                            <vl-source-osm></vl-source-osm>-->
<!--                        </vl-layer-tile>-->
<!--                    </vl-map>-->
<!--                    <div style="padding: 20px">-->
<!--                        Zoom: {{ zoom }}<br>-->
<!--                        Center: {{ center }}<br>-->
<!--                        Rotation: {{ rotation }}<br>-->
<!--                        My geolocation: {{ geolocPosition }}-->
<!--                    </div>-->
<!--                </div>-->

                <vl-map data-projection="EPSG:4326" style="height: 400px">
                    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                    <vl-layer-tile>
                        <vl-source-osm></vl-source-osm>
                    </vl-layer-tile>

                    <vl-feature>
                        <vl-geom-point :coordinates="[38.726634,9.003391]"></vl-geom-point>
                    </vl-feature>
                </vl-map>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "ProfileDetails",
        props: {
            profile: null
        },
        data() {
            return {
                zoom: 2,
                center: [0,0],
                rotation: 0,
                geolocPosition: undefined,
                favoriteText: 'Marcar como favorito',
                icon: 'mdi-heart-plus'
            }
        },
        methods: {
            ...mapMutations(["markOfFavorite"]),
            favoriteIconColor() {
                this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
                this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';

            },
            mark() {
                this.markOfFavorite(this.profile);
                this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';
                this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
            }
        },
        mounted() {
            this.favoriteIconColor();
            this.icon = this.profile.favorite == true ? 'mdi-heart-remove' : 'mdi-heart-plus';
            this.favoriteText = this.profile.favorite == true ? 'Desmarcar como favorito' : 'Marcar como favorito';
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
