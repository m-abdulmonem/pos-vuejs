<script>
import axios from 'axios'
import $ from 'jquery'


export default {
    data() {
        return {
            keywords: null,
            clients: []
        }
    },
    watch: {
        keywords() {
            ($("#clientSearch").val().length < 1) ? $(".client-search-list").hide() : $(".client-search-list").show();

            this.search()
        },
    },

    methods: {
        search() {
            axios.get(`clients/name`, { params: { keywords: this.keywords, id: $("#clientSearch").val() } })
                .then((response) => this.clients = response.data[0])
        },
        selected(e) {
            let id = e.target,
             inputClientId = $("#clientId"),inputSearch  = $("#clientSearch");

            if (!id.getAttribute("id")) {
                let $parent = e.target.parentElement;

                inputClientId.val($parent.getAttribute("id"));
                inputSearch.val($parent.getAttribute("name"))
            } else {
                inputClientId.val(id.getAttribute("id"))
                inputSearch.val(id.getAttribute("name"))
            }

            $(".client-search-list").hide()
        }
    }
}
</script>


<template>
    <div class="form-group">
        <input type="text" id="clientSearch" class="form-control" v-model="keywords" placeholder="بحث عن عميل">

        <ul class="client-search-list list-unstyled" v-if="clients.length > 0">
            <li class="d-flex pb-3">
                <div class="col-6">اسم العميل</div>
                <div class="col-2">حد الائتمان</div>
            </li>
            <li class="client-search-item d-flex" @click="selected" v-for="client in clients" :id="client.id" :name="client.text"
                :key="client.id">
                <div class="col-6">{{ client.text }}</div>
                <div class="col-2">{{ client.remaining }}</div>
            </li>
        </ul>

    </div>
</template>

<style scoped >
.form-group {
    position: relative;
}

#clientSearch:focus {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: 0;
}

.client-search-list {
    background: #fff;
    display: block;
    min-height: 30px;
    position: absolute;
    padding: 1.5rem .75rem;
    width: 100%;
    margin-bottom: 1rem;
    z-index: 1;
    border: 1px solid #ced4da;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-weight: bold;
    cursor: pointer;
}

li:nth-child(even) {
    color: #117a8b;
}

li:nth-child(odd) {
    color: #212529;
}
</style>