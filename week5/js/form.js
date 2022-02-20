import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const app = createApp({
	// ...
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
