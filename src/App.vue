<template>
    <div id="app">

        <pagination
                :current="currentPage"
                :total="totalPhotos"
                :perPage="perPage"
                @page-changed="fetchPhotos"
        ></pagination>

        <section class="grid">
            <div class="grid__item card" v-for="photo in photos">
                <div class="card__body">
                    <img :src="photo.urls.small" alt="img">
                </div>
                <div class="card__footer media">
                    <img :src="photo.user.profile_image.small" alt="user" class="media__obj">
                    <div class="media__body">
                        <a :href="photo.user.portfolio_url" target="_blank">{{photo.user.name}}</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Pagination from './components/Pagination.vue'
    import VueResource from 'vue-resource'

    let appID = '79937c0efcd3d8c49b50a9bbc75057dcad87b6d1aeea26e8f60868d53d8df6aa';

    export default {
        name: 'app',
        data() {
            return {
                photos: [],
                totalPhotos: 0,
                perPage: 9,
                currentPage: 1
            }
        },
        components: {
          pagination: Pagination
        },
        methods: {
            fetchPhotos(page) {
                let options = {
                    params: {
                        client_id: appID,
                        page: page,
                        per_page: this.perPage
                    }
                };
                this.$http.get('https://api.unsplash.com/photos', options)
                    .then((res) => {
                        console.log(res);
                        this.photos = res.data;
                        this.totalPhotos = parseInt(res.headers.get('x-total'));
                        this.currentPage = page;
                    })
                    .catch((err) => console.log(err))
            },
        },
        created() {
            this.fetchPhotos(this.currentPage)
        }
    }
</script>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #f5f6f7;
        display: flex;
        justify-content: center;
        padding: 80px 0;
    }

    #app {
        width: 100%;
    }

    .grid {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 auto;
    }

    .grid__item{
        width: 30%;
        flex-grow: 1;
        flex-shrink: 1;
        margin: 0 20px 40px;
    }

    .card {
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(0,0,0,.2);
        border-radius: 2px;
        line-height: 0;
        cursor: pointer;
    }

    .card:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,.2);
    }

    .card__body {
        width: 100%;
        height: 215px;
        overflow: hidden;
        background-color: #eee;
    }

    .card__body img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card__footer {
        width: 100%;
        padding: 10px 15px;
    }

    .media__obj {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #d8d8d8;
        margin-right: 15px;
        float: left;
    }

    .media__body {
        width: 100%;
        height: 32px;
        line-height: 32px;
    }

    .media__body a {
        font-size: 15px;
        color: #999;
    }

    .media__body a:hover {
        text-decoration: none;
    }



</style>
