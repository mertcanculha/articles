<script>
import { mapState } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
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
        { key: "detail", label: "Detay" },
        { key: "list", label: "Listeye Ekle" },
      ],
      updateDialog: false,
      createDialog: false,
      deleteDialog: false,
      newTitle: "",
      newReleaseDate: "",
      newSummary: "",
      updateTitle: "",
      updateReleaseDate: "",
      updateSummary: "",
      search: "",
      selectedItemId: "",
    };
  },
  computed: {
    ...mapState(["makaleler"]),
    filterArticles() {
      if (this.search.length < 4) {
        return this.makaleler;
      }
      return this.makaleler.filter((makale) => {
        return makale.başlık.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    eklenenMakale() {
      return this.$store.state.yeniMakale;
    },
    selectedMakale() {
      return this.$store.state.makaleler.find(
        (makale) => makale.id === this.selectedItemId
      );
    },
  },

  methods: {
    goToDetailPage(data) {
      this.$router.push({
        name: "article-detail",
        params: { id: data.item.id },
      });
    },
    goToListPage() {
      this.$router.push("/article-list");
    },
    addToList(data) {
      const existingList =
        JSON.parse(localStorage.getItem("makalelerlist")) || [];
      const isAlreadyInList = existingList.some(
        (item) => item.id === data.item.id
      );
      if (!isAlreadyInList) {
        existingList.push(data.item);
        localStorage.setItem("makalelerlist", JSON.stringify(existingList));
        this.$toast.open({
          message: "Makale başarıyla okuma listesine eklendi.",
          type: "success",
          duration: 5000,
          dismissible: true,
        });
      } else {
        this.$toast.open({
          message: "Bu makale zaten okuma listesinde bulunuyor.",
          type: "warning",
          duration: 5000,
          dismissible: true,
        });
      }
    },
    resetCreateDialog() {
      this.newTitle = "";
      this.newReleaseDate = "";
      this.newSummary = "";
    },
    createDialogOK() {
      const yeniMakale = {
        başlık: this.newTitle,
        yayın_tarihi: this.newSummary,
        özet: this.newSummary,
      };
      this.$store.dispatch("addNewArticle", yeniMakale);
      this.createDialog = false;
      this.$toast.open({
        message: "Makale başarıyla eklenmiştir.",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
    },
    openUpdateDialog(data) {
      this.updateDialog = true;
      this.selectedItemId = data.item.id;
      this.updateTitle = data.item.başlık;
      this.updateReleaseDate = data.item.yayın_tarihi;
      this.updateSummary = data.item.özet;
    },
    updateDialogOK() {
      const updatedData = {
        başlık: this.updateTitle,
        yayın_tarihi: this.updateReleaseDate,
        özet: this.updateSummary,
      };
      this.$store.dispatch("updateArticle", {
        id: this.selectedItemId,
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
    openDeleteDialog(data) {
      this.deleteDialog = true;
      this.newTitle = data.item.başlık;
      this.selectedItemId = data.item.id;
    },
    deleteDialogOK() {
      this.$store.dispatch("deleteArticle", this.selectedItemId);
      this.deleteDialog = false;
      this.$toast.open({
        message: "Makale başarıyla silinmiştir..",
        type: "success",
        duration: 5000,
        dismissible: true,
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="button-container">
      <b-button
        v-b-tooltip.hover
        title="Okuma Listeme Git"
        variant="outline-primary"
        @click="goToListPage()"
        >Listem</b-button
      >
      <b-button
        v-b-tooltip.hover
        title="Yeni Makale Ekle"
        variant="outline-success"
        @click="createDialog = true"
        >Makale Ekle</b-button
      >
    </div>
    <b-row>
      <b-col cols="4">
        <b-input-group class="mt-3">
          <template #append>
            <b-input-group-text
              ><strong class="text-success"
                ><b-icon icon="search"></b-icon> </strong
            ></b-input-group-text>
          </template>
          <b-form-input
            v-model="search"
            placeholder="Makale başlığına göre arama..."
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <br />
    <div class="text-center">
      <b-table
        responsive
        hover
        :fields="adminUsersFields"
        :items="filterArticles"
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
        <template #cell(detail)="data">
          <b-button
            v-b-tooltip.hover
            title="Makale Detayına Git"
            pill
            variant="info"
            size="sm"
            @click="goToDetailPage(data)"
          >
            <span><b-icon icon="info"></b-icon></span>
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

    <!-- create dialog -->
    <b-modal
      v-model="createDialog"
      ref="modal"
      title="Makale Oluştur"
      centered
      @ok="createDialogOK"
      size="lg"
      hide-header-close
      @hidden="resetCreateDialog"
    >
      <b-row class="text-center">
        <b-col cols="6">
          <b-form-group label="Makale Başlığı">
            <b-form-input v-model="newTitle"></b-form-input> </b-form-group
        ></b-col>
        <b-col cols="6">
          <b-form-group label="Makale Yayın Tarihi">
            <b-form-input
              v-model="newReleaseDate"
            ></b-form-input> </b-form-group
        ></b-col>

        <b-col cols="12">
          <b-form-group label="Makale Özeti ">
            <b-form-textarea
              v-model="newSummary"
            ></b-form-textarea> </b-form-group
        ></b-col>
      </b-row>

      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()"> Kaydet </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Kapat
        </b-button>
      </template>
    </b-modal>

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

<style>
.container {
  margin-block-start: 3%;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button-container > * {
  margin-right: 5px;
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .button-container {
    flex-direction: column;
  }
}
</style>