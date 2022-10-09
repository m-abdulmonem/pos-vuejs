<template>
    <table class="table table-striped table-hover table-bordered " id="productsTable">
        <thead>
            <tr class="">
                <th scope="col">#</th>
                <th scope="col" style="width: 120px">كود</th>
                <th scope="col">الصنف</th>
                <th scope="col">المخزن</th>
                <th scope="col">الكمية</th>
                <th scope="col">المتبقى</th>
                <th scope="col">سعر الوحدة</th>
                <th scope="col">الخصم</th>
                <th scope="col">الاجالى</th>
                <th scope="col">الصافى</th>
                <th scope="col">حذف</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</template>

<script>
    export default {
        name: "ProductsTable",

    }
</script>

