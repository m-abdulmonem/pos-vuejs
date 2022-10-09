<script>

import InvoiceProducts from '@/components/Invoice/InvoiceProducts.vue';
import Header from '@/components/Invoice/Header.vue';
import Receipt from '@/components/Invoice/Receipt.vue';
import axios from 'axios'

export default {
    props: ['invoiceId'],
    name: 'InvoiceView',
    components: {
        InvoiceProducts,
        Header,
        Receipt
    },
    data() {
        return {
            data: {},
            client: {},
            products: {},
            // settings: {},
            user: JSON.parse(sessionStorage.getItem("user"))
        }
    },

    async mounted() {
        this.data = await this.getInvoice();
        this.client = this.data.client;
        this.products = this.data.products;

        // this.settings = await this.getSettings();
    },
    methods: {
        async getInvoice() {
            const id = this.invoiceId ? this.invoiceId : this.$route.params.invoiceId;

            let response = await axios.get(`invoice/${id}/print`);

            return response.data[0]
        },
        toIndiaDigits(str) {
            var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return str.replace(/[0-9]/g, function (w) {
                return id[+w]
            });
        },
        // async getSettings() {
        //     let response = await axios.get('settings');

        //     return response.data[0];
        // }
    }
}

</script>


<template>
    <div>
        <!-- title row -->
        <div class="row">
            <Header />
        </div>
        <!-- info row -->
        <div class="row invoice-info">
            <div class="col">
                <h4>رقم الفاتورة : <span> {{ (data.code) }} </span></h4>
                <h4>العميل : <span> {{ client.name }} </span> </h4>
                <h4>العنوان : <span> {{ client.address }} </span> </h4>
            </div>
            <!-- /.col -->
            <div class="col">
                <h4>التاريخ : <span> {{ (data.created_at) }} </span></h4>
                <h4>رقم الهاتف : <span> {{ (client.phone) }} </span></h4>
                <h4>الكمية : <span> {{ (data.quantity) }}</span></h4>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->

        <InvoiceProducts :products="products" />


        <div class="row main-info total">
            <ul class="list-unstyled d-flex w-100" style="font-size: 25px">
                <li class="col-4"><span class="title">الاجمالى : </span> {{ data.price }}</li>
                <li class="col-4"><span class="title">الخصم : </span> {{ data.discount }}</li>
                <li class="col-4"><span class="title">الصافى : </span> {{ data.net }}</li>
            </ul>
            <ul class="list-unstyled d-flex w-100" style="font-size: 25px">
                <li class="col-8">{{ data.spell_out }}</li>
                <li class="col-4"><span class="title">رصيد السابق : </span> {{ client.prevBalance }}</li>
            </ul>
            <ul class="list-unstyled d-flex w-100" style="font-size: 25px">
                <li class="col-8"></li>
                <li class="col-4"><span class="title">الرصيد الحالى : </span> {{ client.invoicecurrentBalance }}</li>
            </ul>
        </div>

        <div class="footer d-flex" style="font-size: 21px">
            <div class="col-6"><span>المستخدم : </span> {{ user.code }} - {{ user.name }}</div>
            <div class="col-6"><span>تاريخ الطباعة : </span> {{ data.now }}</div>
        </div>
        <!-- ./footer -->
    </div>
    <div class="page-break"></div>
    <div class="page-break"></div>
    <div>
        <Receipt :client="client" :settings="settings" :data="data" v-if="data.is_paid" />
    </div>

</template>


  <style>
  @import '../../public/css/pdf.css';
  </style>