<template>
    <div class="row pl-4 pr-4 pt-3">
        <div class="col-6">
            <ProductSearch />
        </div>
        <div class="col-4 select2">
            <label for="client">اختار العميل</label>
            <UserSearch />
        </div>
        <div class="col-2">
            <BillStatus />
        </div>
    </div>
</template>

<script>

import BillStatus from "./BillStatus.vue";
import UserSearch from "./UserSearch.vue"
import ProductSearch from "./ProductSearch.vue"
export default {
    name: 'MetaData',
    components: {
        BillStatus,
        UserSearch,
        ProductSearch
    },

}
</script>

<style scoped>
.row{
        text-align: right;
}
label{
    margin-bottom: 6px;
}
</style>