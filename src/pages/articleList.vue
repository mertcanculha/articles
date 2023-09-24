<script>
export default {
  name: "Dashboard",
  data() {
    return {
      detail: "",
      detailModal: false,
      okumaListem: [],
      adminUsersFields: [
        { key: "başlık", label: "Başlık" },
        {
          key: "özet",
          label: "Özet",
        },
        {
          key: "yayın_tarihi",
          label: "Yayın Tarihi",
        },
        {
          key: "detail",
          label: "Detay",
        },
        { key: "list", label: "Listeden Çıkar" },
      ],
    };
  },

  created() {
    this.okumaListem = JSON.parse(localStorage.getItem("makalelerlist")) || [];
  },
  methods: {
    openDeatilList(data) {
      this.detail = data.item.özet;
      this.detailModal = true;
    },
    removeList(data) {
      const removedItemIndex = this.okumaListem.findIndex(
        (item) => item.id === data.item.id
      );
      if (removedItemIndex !== -1) {
        this.okumaListem.splice(removedItemIndex, 1);
        localStorage.setItem("makalelerlist", JSON.stringify(this.okumaListem));
        this.$toast.open({
          message: "Makale başarıyla okuma listesinden çıkarıldı.",
          type: "info",
          duration: 5000,
          dismissible: true,
        });
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="text-center">
      <b-table responsive hover :fields="adminUsersFields" :items="okumaListem" show-empty>
        <template #empty>
          <div style="text-align: center; font-size: 20px">
            <span>
            Listeniz henüz boş <b-icon icon="emoji-frown"></b-icon>
            </span>
          </div>
        </template>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(başlık)="data">
          <div style="max-width: 250px">
            {{ data.value }}
          </div>
        </template>
        <template v-slot:cell(özet)="data">
          <div style="max-width: 450px">
            {{ data.value }}
          </div>
        </template>
        <template v-slot:cell(yayın_tarihi)="data">
          <div style="max-width: 200px">
            {{ data.value }}
          </div>
        </template>

        <template #cell(detail)="data">
          <b-button v-b-tooltip.hover title="Detayı Görüntüle" pill variant="info" size="sm"
            @click="openDeatilList(data)">
            <span><b-icon color="white" icon="trash"></b-icon></span>
          </b-button>
        </template>

        <template #cell(list)="data">
          <b-button v-b-tooltip.hover title="Okuma Listemden Çıkar" pill variant="warning" size="sm"
            @click="removeList(data)">
            <span><b-icon color="white" icon="trash"></b-icon></span>
          </b-button>
        </template>
      </b-table>
    </div>

    <b-modal hide-header-close centered v-model="detailModal" hide-footer content-class="shadow" title="Detay">
      <p class="my-2">
        <code>{{ detail }}</code>
      </p>
    </b-modal>
  </div>
</template>
