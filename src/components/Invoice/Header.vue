<template>
    <div class="col-12">
        <div class="page-header ">
            <div class="col" style="padding-right: 30px !important;display: flex;">
                <div class="info">
                    <h4>{{ settings.name_ar }}</h4>
                    <p>{{ settings.address }}</p>
                    <p>{{ settings.phone }}</p>
                    <p>{{ settings.manger }}</p>
                </div>
            </div>
        </div>
        <!-- title -->
        <h3 class="text-center title">فاتورة مبيعات</h3>
        <!-- ./title -->
    </div>
    <!-- /.col -->

</template>


<script>
import axios from 'axios';


export default {
    name: "Header",
    data(){
        return {
            settings: {}
        }
    },
    async mounted() {

        this.print();
        await this.getSettings()
    },
    methods: {
        print() {
            let vm = this;
            window.onafterprint = function () {
                vm.$router.push("/")
            };
            setTimeout(() => {

                window.print();
            }, 3000)
        },
        async getSettings(){
            this.settings = (await axios.get('settings')).data[0];
        }
    },
}


</script>