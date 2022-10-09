<template>
    <div class="form-group">
        <label for="status">حالة الفاتورة</label>
        <select name="status" id="status" class="form-control">
            <option value="">اختر حالة الفاتورة</option>
            <option value="draft">مسوده</option>
            <option value="loaded">تحت التحميل</option>
            <option value="onWay">فى الطريق</option>
            <option value="delivered">تم التوصيل</option>
            <option value="canceled">تم الغاء</option>
        </select>
    </div>
</template>

<style>
label{
    margin-bottom: 6px;
}
</style>