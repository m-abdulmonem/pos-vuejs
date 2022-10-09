<template>
    <Header :settings="settings" />
    <div class="receipt-content" v-for="item in count" :key="item">
        <div class="border">
            <div class="text-center title">المستلم</div>
            <!-- info row -->
            <div class="row invoice-info mt-5">
                <div class="col-12">
                    <div class="row">
                        <div class="col-6">
                            <h4 class="mb-3">رقم الفاتورة : <span> {{ (data.code) }} </span></h4>
                        </div>
                        <div class="col-6">
                            <h4 class="mb-3">التاريخ : <span> {{ data.created_at }} </span></h4>
                        </div>
                        <div class="col-12">
                            <h4 class="mb-3">العميل : <span> {{ client.name}}
                                </span></h4>
                        </div>
                        <div class="col-6">
                            <h4 class="mb-3">الاجمالى : <span> {{ data.price }} </span></h4>
                        </div>
                        <div class="col-6">
                            <h4>الكمية : <span>  {{ (data.quantity) }}</span></h4>
                        </div>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-6">

                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->

            <!-- info row -->
            <div class="row invoice-info mt-5 text-center" style="padding: 20px 0">
                <div class="col-6">
                    <h2>المدفوع : <span> </span></h2>
                </div>
                <!-- /.col -->
                <div class="col-6">
                    <h2>المتبقى : <span> </span></h2>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
            <!-- info row -->
            <div class="row invoice-info mt-5" style="padding-bottom: 5%">
                <div class="col-6">
                    <h4>توقيع المستلم : <span> ................ </span></h4>
                </div>
                <!-- /.col -->
                <div class="col-6">
                    <h4>توقيع المندوب : <span> ................ </span></h4>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
    </div>

</template>


<script>
import Header from './Header.vue';
export default {

    props:['client','data','settings'],
    components:[
        Header
    ],
    data() {
        return {
            count: [1, 2]
        }
    }

}

</script>


<style>
@media print {
    .payments-voucher {
        max-height: 100%;
        overflow: hidden;
        page-break-after: always;
    }

    .border:first-of-type {
        margin-bottom: 8%;
    }

    .receipt-content {
        padding: 20px 0;
    }
}

.receipt-content {
    padding: 40px 30px;
}

.invoice-info {
    font-size: 40px;
}


</style>