<script>
import ClientModal from './ClientModal.vue';
import axios from 'axios'
import $ from 'jquery'

$('body').on('click', 'btnCreateClient', function () {
    $('.createClient').submit()
})

function handleErrors(response) {
    for (const key in response) {
        $(`#${key}`).addClass("is-invalid").next(".alert").removeClass("hide").text(response[key][0]);
    }
}

export default {
    name: "ButtonsControl",
    data() {
        return {
            createClient: false,
            balanceBox: false,
            balance: 0
        };
    },
    methods: {


        showCreateClient() {
            this.createClient = true;
        },
        hideCreateClient() {
            this.createClient = false;
        },
        showBalanceBox() {
            this.balanceBox = true;
        },
        hideBalanceBox() {
            this.balanceBox = false;
        },
        create() {
            const vm = this;
            $('body').on('submit', '.createClient', function (e) {
                e.preventDefault();
                axios.post("client/create", new FormData(this))
                    .then((data) => {
                        $(this).trigger("reset");

                        vm.createClient = false;

                        vm.$swal.fire(data.data.text, {
                            'icon': "success",
                            'timer': 2000
                        });
                    })
                    .catch(e => handleErrors(e?.response?.data?.errors))
            })
        },
        closeDaily() {
            axios.put("daily/close", { balance: this.balance })
                .then(() => {
                    this.balanceBox = false;
                    this.$router.push({ name: 'daily' });
                })
        },
        printLasInvoice() {
            axios.get("invoice/last").then((response) => {
                this.$router.push({
                    name: 'invoice',
                    params: {
                        invoiceId: response.data[0]
                    }
                })
            })
        }
    },
    components: { ClientModal }
}
</script>

<template>
    <div class="controls">
        <div class="row">
            <!-- <div class="col"> -->
            <!-- <span class="btn btn-outline-primary w-100 m-1 btn-sell-medicine" data-toggle="modal" data-target="#medicinesModal">أدوية</span> -->
            <!-- </div> -->
            <div class="col">
                <span class="btn btn-outline-dark w-100 m-1" @click="printLasInvoice">طباعة اخر فاتورة</span>
            </div>
            <div class="col">
                <span class="btn btn-outline-secondary w-100 m-1 mt-0 btn-add" @click="createClient = !createClient"
                    id="save">تسجيل عميل جديد</span>
            </div>
            <!-- <div class="col"> -->
            <!-- <span class="btn btn-outline-warning w-100 m-1" data-toggle="modal" data-target="#discardedModal">مرتجع -->
            <!-- مبيعات</span> -->
            <!-- </div> -->
            <div class="col">
                <span class="btn btn-outline-danger w-100 m-1 btn-close-daily" @click="balanceBox = !balanceBox">اغلاق
                    اليومية</span>
            </div>
        </div>
    </div>
    <b-modal id="createClient" hide-footer title="انشاء عميل" v-model="createClient">

        <form class="createClient" method="post">
            <ClientModal />

            <div class="row modal-actions mt-3">
                <div class="col">
                    <input type="submit" class="btn btn-info" id=" btnCreateClient" @click="create" value='حفظ' />
                    <b-button class="" variant="btn btn-secondry" block @click="hideCreateClient">اغلاق</b-button>
                </div>
            </div>
        </form>
    </b-modal>
    <b-modal id="balanceBox" hide-footer title="اغلاق اليومية" v-model="balanceBox">
        <div class="col-12">
            <div class="form-group ">
                <label for="balance">رصيد الخزينة</label>
                <input type="text" class="form-control" id="balance" placeholder="رصيد الخزينة" name="balance"
                    v-model="balance">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <div class="row modal-actions mt-3">
            <div class="col">
                <input type="submit" class="btn btn-info" @click="closeDaily" value='حفظ وإغلاق' />
                <b-button class="" variant="btn btn-secondry" block @click="hideBalanceBox">اغلاق</b-button>
            </div>
        </div>
    </b-modal>
</template>


<style scoped>
.controls {
    margin-bottom: 50px;
}
</style>