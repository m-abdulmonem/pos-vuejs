<template>
    <div class="list">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>المنتج</th>
                    <th>سعر الوحدة</th>
                    <th>الكمية</th>
                    <th>الوزن</th>
                    <th>الاجمالى</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">

                    <th>{{ index + 1 }}</th>
                    <th>{{ product.name }}</th>
                    <th>{{ product.piece_price }}</th>
                    <th>{{ product.quantity }}</th>
                    <th>{{ product.totalWeight }}</th>
                    <th>{{ product.price }}</th>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script>

export default {
    props: ['products'],

}

</script>