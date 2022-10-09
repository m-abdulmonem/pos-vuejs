<template>
    <div class="row">
        <div class="col">
            <div class="form-group ">
                <label for="paid">المبلغ المدفوع</label>
                <input type="text" class="form-control" id="paid" v-model="paid" placeholder="المبلغ المدفوع"
                    name="postpaid">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col" v-if="user.id != 1 && user.discount_limit > 0">
            <div class="form-group ">
                <label for="discountInput">خصم</label>
                {{ discount }}
                <input type="text" class="form-control" v-model="discount" id="discountInput" placeholder="خصم"
                    name="discount">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col d-flex align-items-center align-content-center">
                <h4>الاجمالى : <span class="total-net"></span></h4>
            </div>
            <!-- ./col -->
            <div class="col d-flex align-items-center align-content-center">
                <h4>الباقى : <span class="remaining"></span></h4>
            </div>
            <!-- ./col -->
        </div>
    </div>
    <!-- ./row -->
</template>

<script>

import $ from 'jquery'

export default {
    name: 'HomeView',
    data() {
        return {
            discount: null,
            paid: null,
            user: JSON.parse(sessionStorage.getItem("user")),
        }
    },
    mounted() {

    },
    watch: {
  
        paid() {
            const paidInput = $("#paid").val();

            let remaining = parseFloat($("#totalPrice").val()) - parseFloat(paidInput),
                userLimit = parseFloat(`${this.user.credit_limit}`),
                admin = parseInt(`${this.user.id}`);

            if (admin !== 1 && (userLimit - remaining) < 0) {
                $("#btnSave").addClass("disabled").attr("disabled", "disabled");
                this.$swal("لقد وصلت لحد الائتمان", {
                    icon: "warning",
                    timer: 2000
                })
            } else
                $("#btnSave").removeClass("disabled").removeAttr("disabled");

            $(".remaining").text(this.formatter(remaining))
        },
        discount() {
            const discountInput = $("#discountInput"),
                remaining = parseFloat(this.user.discount_limit),
                price = parseFloat($("#totalPrice").val()) - parseFloat(discountInput.val()),
                net = price - parseFloat($("#paid").val());

            if ((remaining - parseFloat(discountInput.val())) >= 0) {
                if (parseFloat($("#profitInput").val()) >= parseFloat(discountInput.val())) {
                    $(".total-net").text(this.formatter(price));
                    $(".remaining").text(this.formatter(net))
                }
                else {
                    this.$swal(` هذا الخصم غير مسموح به المتاح هو ${this.formatter($("#profitInput").val())}`, {
                        icon: "warning",
                        timer: 3000
                    });
                    discountInput.val("");
                }
            } else {
                this.$swal("لقد وصلت للحد الاقصى للخصم", {
                    icon: "warning",
                    timer: 3000
                });

                discountInput.val("");
            }
        }
    },
    methods: {

      formatter(num) {
            const formatter = Intl.NumberFormat("ar-EG", {
                'style': 'currency',
                currency: 'EGP',
                minimumFractionDigits: 2
            });

            return formatter.format(num)
        },
    }
}



</script>

<style>
.hide {
    display: none;
}

.show {
    display: block;
}
</style>