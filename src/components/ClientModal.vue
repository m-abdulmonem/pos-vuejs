<template>
          <div class="row">
        <div class="col-6">
            <div class="form-group ">
                <label for="name">اسم العميل</label>
                <input type="text" class="form-control " id="name" placeholder="اسم العميل" name="name">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-6">
            <div class="form-group">
                <label for="phone">رقم الهاتف</label>
                <input type="text" class="form-control " id="phone" placeholder="رقم الهاتف" name="phone">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
    </div>
    <!-- ./row -->
    <div class="row">
        <div class="col-6">
            <div class="form-group ">
                <label for="trader">نوع الحساب</label>
                <select class="form-control" name="trader" id="trader">
                    <option value="false">زبون</option>
                    <option value="true">عميل</option>
                </select>
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-6">
            <div class="form-group ">
                <label for="discount">الخصم</label>
                <input type="number" class="form-control " id="discount" disabled placeholder="الخصم" name="discount">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->

        <div class="col-6">
            <div class="form-group ">
                <label for="credit_limit">حد الائتمان</label>
                <input type="number" step="any" class="form-control " id="credit_limit" placeholder="حد الائتمان"
                    name="credit_limit">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-6">
            <div class="form-group ">
                <label for="maximum_repayment_period">اقصى مده للسداد</label>
                <input type="number" class="form-control" id="maximum_repayment_period" placeholder="اقصى مده للسداد"
                    name="maximum_repayment_period">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->

        <div class="col-6">
            <div class="form-group ">
                <label for="creditor">الدائن</label>
                <input type="number" class="form-control" id="creditor" placeholder="الدائن" name="creditor">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->
        <div class="col-6">
            <div class="form-group ">
                <label for="debtor">المدين</label>
                <input type="number" class="form-control" id="debtor" placeholder="المدين" name="debtor">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->

        <div class="col-12">
            <div class="form-group ">
                <label for="address">العنوان</label>
                <input type="text" class="form-control  " id="address" placeholder="العنوان" name="address">
                <div class="alert alert-danger hide"></div>
            </div>
        </div>
        <!-- ./col -->

    </div>
    <!-- ./row -->


</template>

<script>

export default {

    mounted() {
    },
    methods : {
        create(){
            
            console.log("btn  cliecked");
        }
    }
}
</script>