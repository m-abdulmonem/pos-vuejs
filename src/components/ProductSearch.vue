<script>
import axios from 'axios'
import $ from 'jquery'

export default {
    name: "ProductSearch",
    data() {
        return {
            keywords: null,
            results: {},
            currency: [],
            totalPrice: [],
        }
    },
    watch: {
        async keywords() {
            ($("#search").val().length > 0) ? $(".search-list").show() : $(".search-list").hide();
            await this.search()
        },
    },
    mounted() {
        this.calc();
        this.total();
        this.delete();
        this.discount();
        
        if (!$("#search").is(":focus")) $(".search-list").hide()
    },
    methods: {
        formatter(num) {
            const formatter = Intl.NumberFormat("ar-EG", {
                'style': 'currency',
                currency: 'EGP',
                minimumFractionDigits: 2
            });

            return this.currency = formatter.format(num)
        },
        discount() {
            let vm = this;
            $("body").on("change", ".product-discount", function () {

                if (parseFloat($(this).val()) > parseFloat($(this).attr("max"))) {
                    $(this).val($(this).attr("max"));
                    this.$swal(` عفوا لايمكن قبول هذا الخصم الخصم المتاح هو ${vm.currencies($(this).attr("max"))} `, {
                        icon: "info",
                        timer: 3000
                    });
                }
                vm.total();
            })
        },
        total() {
            let price = 0, quantity = 0, discount = 0;

            $(".priceInput").each(function () {
                price += parseFloat($(this).val())
            });
            //, net = 0
            // $(".netInput").each(function () {
            //     net += parseFloat($(this).val())
            // });
            $(".quantity").each(function () {
                const profit = parseFloat($(this).val()) * parseFloat($(this).attr("profit"));
                $("#profitInput").val((profit / 2));
                quantity += parseFloat($(this).val())
            });
            $(".product-discount").each(function () {
                discount += parseFloat($(this).val()) * parseFloat($(this).closest("tr").find(".quantity").val())
            });
            //hidden inputs
            $("#totalQuantity").val(quantity);
            $("#totalPrice").val(price);
            //text

            $(".total-price").text(this.formatter(price));
            $(".total-net").text(this.formatter(price - discount));
            //
            this.prices = price;
        },
        calc() {
            let vm = this;
            $("body").on("change", ".quantity", function () {
                if ($(this).val() < 1) $(this).closest("tr").remove();
                const price = $(this).val() * $(this).attr("price");

                if (parseInt($(this).val()) > parseInt($(this).attr("max"))) {
                    $(this).val($(this).attr("max"));
                    this.$swal("عفوا الكمية المطلوبة اكبر من الموجودة", {
                        icon: "warning",
                        timer: 3000
                    });
                }

                const net = price - ($(this).val() * $(this).attr("discount"));
                $(this).closest("tr").find(".price").text(vm.formatter(price))
                    .closest("tr").find(".priceInput").val(price);

                $(this).closest("tr").find(".net").text(vm.formatter(net))
                    .closest("tr").find(".netInput").val(net);

                $(this).parent().closest("tr").find(".product-discount").attr("max", (parseFloat($(this).attr("profit")) * parseFloat($(this).val())) / 2);
                vm.total();

                if (vm.prices > parseFloat($("#credit").val())) {
                    $(this).val(parseInt($(this).val()) - 1);
                }
            });

        },
        async search() {
            this.results = (await axios.get(`/products/name`, { params: { keywords: this.keywords, id: $("#client").val() } })).data
                
        },
        delete() {
            let vm = this;
            $("body").on("click", ".btn-remove", function () {
                $(this).closest("tr").remove();
                vm.total();
            })
        },
        create(e) {
            let target;

            if (e.target.getAttribute("profit")) {
                target = e.target;
            } else {
                target = e.target.parentElement;
            }



            let options = [], maxDiscount = parseFloat(target.getAttribute("profit")) / 2;

            $.each(JSON.parse(target.getAttribute("stocks")), function (k, v) {
                options.push(`<option value="${k}">${v}</option>`);
            });

            let html = `<tr class="product-${target.getAttribute("id")}">`;


            html += `<th>${target.getAttribute("num")}</th>`;
            html += `<td>${target.getAttribute("code")}</td>`;
            html += `<td><input type="hidden" class="id" name="products[]" value="${target.getAttribute("id")}">${target.getAttribute("name")}</td>`;
            html += `<td><select name="stock_id[]" id="stocks" class="form-control">${options.join()}</select></td>`;
            html += `<td><input type="number" class="form-control quantity" style="width: 80px" max="${parseInt(target.getAttribute("quantity"))}" name="quantity[]" profit="${target.getAttribute("profit")}" discount="${target.getAttribute("discount") ?? 1}" price="${target.getAttribute("price")}" value="1"></td>`;
            html += `<td>${target.getAttribute("quantity")}</td>`;
            html += `<td><input type="hidden" value="${target.getAttribute("price")}" name="unitPrice[]">${this.formatter(target.getAttribute("price"))}</td>`;
            html += `<td>${parseInt(target.getAttribute("admin")) === 1 ? '<input type="number" step="any" style="width: 80px" name="product_discount" max="' + maxDiscount + '"  class="form-control product-discount">' : this.formatter(0)}</td>`;
            html += `<td><input type="hidden" class="priceInput" name="price[]" value="${target.getAttribute("price")}"><span class="price">${this.formatter(target.getAttribute("price"))}</span></td>`;
            html += `<td><input type="hidden" class="netInput" name="net[]" value="${target.getAttribute("price")}"><span class="net">${this.formatter(target.getAttribute("price"))}</span></td>`;
            html += `<td><span id="product-${target.getAttribute("id")}" class="btn btn-danger btn-remove"><i class="fa fa-times"></i></span></td>`;
            html += '<tr>';
            $("#productsTable").append(html);
            this.total();

            $(".search-list").hide().prev().val("");
            $(".btn-paid").data("returned", false);
            if (this.prices >= parseFloat($("#credit").val()))
                $(`.products-${target.getAttribute("id")}`)

        }
    }
}
</script>
<template>
    <div class="form-group">
        <label for="search">بحث عن منتج</label>
        <input type="text" id="search" class="form-control" v-model="keywords">

        <ul class="search-list list-unstyled" v-if="results != null">
            <li class="d-flex pb-3">
                <div class="col-6">الصنف</div>
                <div class="col-2">الكمية المتوفرة</div>
                <div class="col-2">السعر</div>
                <div class="col-2">الوزن</div>
            </li>
            <li class="search-item d-flex" @click="create" v-for="result in results" :id="result.id" :num="result.num"
                :key="result.id" :name="result.name" :code="result.code" :price="result.price"
                :stocks="JSON.stringify(result.stocks)" :quantity="result.quantity" :profit="result.profit"
                :discount="result.discount">
                <div class="col-6">{{ result.name }}</div>
                <div class="col-2">{{ result.quantity }}</div>
                <div class="col-2">{{ formatter(result.price) }}</div>
                <div class="col-2">{{ result.weight ? result.weight + " ك " : "" }}</div>
            </li>
        </ul>

    </div>
</template>



<style scoped >
.form-group {
    position: relative;
}

#search:focus {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: 0;
}

.search-list {
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

label {
    margin-bottom: 6px;
}
</style>
