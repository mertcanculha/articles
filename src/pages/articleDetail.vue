<script>
import { mapState } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      articlesID: "",
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
        { key: "edit", label: "Düzenle" },
        { key: "delete", label: "Sil" },
        { key: "list", label: "Listeye Ekle" },
      ],
      newTitle: "",
      updateDialog: false,
      deleteDialog: false,
      updateTitle: "",
      updateReleaseDate: "",
      updateSummary: "",
      selectedItemId: "",
    };
  },
  computed: {
    ...mapState(["makaleler"]),
    selectedArticles() {
      const articleID = this.$route.params.id;
      return this.makaleler.filter((makale) => makale.id === articleID);
    },
  },
  created() {
    this.articlesID = this.$route.params.id;
  },
  methods: {
    addToList(data) {
      console.log(data.item);
    },
    openUpdateDialog(data) {
      this.updateDialog = true;
      this.selectedItemId = data.item.id;
      this.updateTitle = data.item.başlık;
      this.updateReleaseDate = data.item.yayın_tarihi;
      this.updateSummary = data.item.özet;
    },
    openDeleteDialog(data) {
      this.deleteDialog = true;
      this.newTitle = data.item.başlık;
      this.selectedItemId = data.item.id;
    },
    deleteDialogOK() {
      this.$store.dispatch("deleteSingleArticle", this.selectedItemId);
      this.deleteDialog = false;
      this.$toast.open({
        message: "Makale başarıyla silinmiştir..",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
    },
    updateDialogOK() {
      const updatedData = {
        başlık: this.updateTitle,
        yayın_tarihi: this.updateReleaseDate,
        özet: this.updateSummary,
      };
      this.$store.dispatch("updateSingleArticle", {
        id: this.$route.params.id,
        newData: updatedData,
      });
      this.$toast.open({
        message: "Makale başarıyla güncellenmiştir.",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
      this.updateDialog = false;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="text-center">
      <b-table
        responsive
        hover
        :fields="adminUsersFields"
        :items="selectedArticles"
         show-empty
      >
      <template #empty>
  <div style="text-align: center; font-size: 20px">
    <span>
      <b-icon icon="emoji-frown"></b-icon>
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

        <template #cell(edit)="data">
          <b-button
            v-b-tooltip.hover
            title="Makaleyi Düzenle"
            pill
            variant="success"
            size="sm"
            @click="openUpdateDialog(data)"
          >
            <span><b-icon icon="pencil"></b-icon></span>
          </b-button>
        </template>
        <template #cell(delete)="data">
          <b-button
            v-b-tooltip.hover
            title="Makaleyi Sil"
            pill
            variant="danger"
            size="sm"
            @click="openDeleteDialog(data)"
          >
            <span><b-icon icon="trash-fill"></b-icon></span>
          </b-button>
        </template>

        <template #cell(list)="data">
          <b-button
            v-b-tooltip.hover
            title="Okuma Listeme Ekle"
            pill
            variant="primary"
            size="sm"
            @click="addToList(data)"
          >
            <span><b-icon icon="plus"></b-icon></span>
          </b-button>
        </template>
      </b-table>
    </div>

    <!-- update dialog -->
    <b-modal
      v-model="updateDialog"
      ref="modal"
      title="Makale Düzenle"
      centered
      size="lg"
      hide-header-close
      @ok="updateDialogOK"
    >
      <b-row class="text-center">
        <b-col cols="6">
          <b-form-group label="Makale Başlığı">
            <b-form-input v-model="updateTitle"></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="6">
          <b-form-group label="Makale Yayın Tarihi">
            <b-form-input
              v-model="updateReleaseDate"
            ></b-form-input> </b-form-group
        ></b-col>

        <b-col cols="12">
          <b-form-group label="Makale Özeti ">
            <b-form-textarea
              v-model="updateSummary"
            ></b-form-textarea> </b-form-group
        ></b-col>
      </b-row>

      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()">
          Güncelle
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Kapat
        </b-button>
      </template>
    </b-modal>
    <!-- delete dialog -->
    <b-modal
      v-model="deleteDialog"
      ref="modal"
      title="Makaleyi Sil"
      centered
      @ok="deleteDialogOK"
      size="lg"
      hide-header-close
    >
      <b-row class="text-center">
        <b-col cols="12">
          <span style="color: red">
            {{ newTitle }}
          </span>
          Adlı makaleyi silmek istediğinize emin misiniz?
        </b-col>
      </b-row>

      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()"> Sil </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Kapat
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
