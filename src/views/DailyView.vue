<script>
import axios from 'axios';
import Header from '@/components/Invoice/Header.vue';
import { mapActions } from 'vuex';

export default {
    components: {
        Header
    },
    data() {
        return {
            daily: {}
        }
    },
    async mounted() {
        await this.getDaily();


        let vm = this;

        window.onafterprint = () => vm.singOut();
    },
    methods: {
        ...mapActions({
            singOutAction: 'auth/signOut'
        }),
        singOut() {
            this.singOutAction();
            this.$router.replace({
                name: 'login'
            });

        },
        async getDaily() {
            this.daily = (await axios.get("daily/print")).data.data;
        }
    }
}
</script>
<template>
    <div class="row">
        <Header />
    </div>
    <div class="text-center title">اليومية</div>
    <!-- info row -->
    <div class="row invoice-info">
        <div class="col-12 mb-3">
            <h4>المستخدم : <span> {{ daily.user }} </span> </h4>
        </div>
        <!-- ./col -->
        <div class="col-6">
            <h4 class="mb-3">رقم اليومية : <span> {{ (daily.number) }} </span></h4>
            <h4 class="mb-3">وقت الفتح : <span> {{ daily.time_in }}
                </span> </h4>
            <h4 class="mb-3">صافى المبيعات : <span> {{ (daily.net_sales) }} </span> </h4>
            <h4 class="mb-3">الرصيد : <span> {{ (daily.balance) }} </span> </h4>
            <h4 class="mb-3">عدد العملاء : <span> {{ daily.clients_count }} </span> </h4>
        </div>
        <!-- /.col -->
        <div class="col-6">
            <h4 class="mb-3">التاريخ : <span> {{ daily.date }} </span>
            </h4>
            <h4 class="mb-3">وقت الخروج : <span> {{ daily.time_out }} </span></h4>
            <h4 class="mb-3">مرتجع بيع : <span> {{ (0) }} </span></h4>
            <h4 class="mb-3">العجز او الزياده : <span> {{ (daily.inc_dec) }}</span></h4>
            <h4 class="mb-3">عدد المنتجات المباعه : <span> {{ (1) }}</span></h4>
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->

</template>

<style>
@import '../../public/css/pdf.css';
</style>