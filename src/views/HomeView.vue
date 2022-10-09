<template>

  <NavBar isNav="true" />

  <div class="container-fluid">
    <ButtonsControl />
    <div class="row">
      <div class="col">
        <form class="createInvoice" method="post">
          <div class="card">
            <input type="hidden" id="clientId" name="client_id">
            <input type="hidden" id="credit">
            <input type="hidden" id="profitInput">
            <input type="hidden" value="postpaid" name="debt">
            <input type="hidden" value="daily" name="daily">
            <input type="hidden" name="total_price" id="totalPrice">
            <input type="hidden" name="total_quantity" id="totalQuantity">
            <div class="card-header">
              <h3 class="card-title float-right">قائمة المنتجات</h3>
              <b-button @click="modalShow = !modalShow" class="btn-save btn-paid"><i class="fa fa-save"></i> حفظ
              </b-button>
            </div>
            <div class="card-body">
              <MedtaData />
              <br />
              <ProductsTable />
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col">
                  <div class="balance-text">
                    الاجمالى : <span class="odd total-price" id=""></span>
                  </div>
                </div>
                <div class="col">
                  <div class="balance-text">
                    الصافى : <span class="odd total-net" id=""></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <b-modal id="paidInvoice" hide-footer title="عملية الدفع" v-model="modalShow">
              <InvoicePaid />

              <div class="row modal-actions">
                <div class="col">
                  <input type="submit" name="submit" class="btn btn-info" id="btnCreateInvoice" @click="paid"
                    value='طباعة الفاتورة' />
                  <b-button class="" variant="btn btn-secondry" block @click="hideModal" type="submit">اغلاق</b-button>
                </div>
                <!-- <div class="col"></div> -->
              </div>
            </b-modal>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import ButtonsControl from '@/components/ButtonsControl.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import MedtaData from "@/components/MetaData.vue"
import InvoicePaid from '@/components/InvoicePaid.vue'
import $ from 'jquery'
import axios from 'axios'


$('body').on('click', '#btnCreateInvoice', function () {
  $('.createInvoice').submit()
})


export default {
  name: 'HomeView',
  components: {
    NavBar,
    ButtonsControl,
    ProductsTable,
    MedtaData,
    InvoicePaid
  },
  data() {
    return {
      modalShow: false,
      createClient: false,
      products: {}
    }
  },
  mounted() {

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
    showModal() {
      this.modalShow = true
    },
    hideModal() {
      this.modalShow = false
    },

    paid() {
      const vm = this;
      $('body').on('submit', '.createInvoice', function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        formData.append('postpaid',$('#paid').val())

        axios.post("invoices", formData)
          .then((data) => vm.responseHandler(data.data, $(this)))
          .catch(e => vm.handleErrors(e?.response?.data?.errors))

      })
    },
    handleErrors(response) {
      for (const key in response) {
        $(`#${key}`).addClass("is-invalid").next(".alert").removeClass("hide").text(response[key][0]);
      }
    },
    responseHandler(data, el) {

      $("body").find("tbody tr").remove();
      $("#remaining,.total-net,.total-price").text(this.formatter(0));
      el.trigger("reset");
      $("#paid").val("");
      this.modalShow = false

      this.$swal(data.text, {
        'icon': "success",
        'timer': 2000
      });
      this.$router.push({
        name: 'invoice',
        params: { invoiceId: data.data[1].id }
      })
    },
  }
}
</script>

<style scoped>
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  color: inherit;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  display: flex !important;
  justify-content: space-between !important;
}

.card-footer {
  text-align: right;
  background-color: #fff !important;

}

.modal-actions {
  float: left;
}
</style>